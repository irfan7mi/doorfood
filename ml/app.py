from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, errors
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://doorfood-app-user-client.vercel.app"]}})

# MongoDB connection
try:
    mongo_uri = os.environ.get("MONGO_URI", "mongodb+srv://mi2268242:q0zQ2HuspFPfohf0@doorfood.gxuxa.mongodb.net/?retryWrites=true&w=majority&appName=doorfood")  # Replace with your fallback URI
    if not mongo_uri:
        raise ValueError("MONGO_URI environment variable not set.")
    
    client = MongoClient(mongo_uri)
    db = client['test']
    order_collection = db['orders']
    food_collection = db['foods']
except errors.PyMongoError as e:
    print(f"Error connecting to MongoDB: {e}")
    client = None

@app.route('/', methods=['GET'])
def home():
    return jsonify({"success": True, "message": 'Welcome to DooRFooD API!'}), 200

@app.route('/recommend', methods=['POST'])
def recommend():
    if not client:
        return jsonify({"success": False, "message": "Database connection failed"}), 500

    user_data = request.get_json()
    user_id = user_data.get("userId")
    
    if not user_id:
        return jsonify({"success": False, "message": "userId is required"}), 400

    try:
        # Fetch all orders
        all_orders = list(order_collection.find())
        if not all_orders:
            return jsonify({"success": False, "message": "No orders found"}), 404

        # Fetch user-specific orders
        user_orders = [order for order in all_orders if str(order["userId"]) == user_id]
        if not user_orders:
            return jsonify({"success": False, "message": "No orders found for this user"}), 404

        # Create datasets for filtering
        all_dataset = []
        user_dataset = []

        for order in all_orders:
            for item in order["items"]:
                all_dataset.append({
                    "food_id": str(item["_id"]),
                    "food_name": item["name"],
                    "quantity": item["quantity"]
                })

        for order in user_orders:
            for item in order["items"]:
                user_dataset.append({
                    "food_id": str(item["_id"]),
                    "food_name": item["name"],
                    "quantity": item["quantity"]
                })

        # Convert datasets to DataFrames
        all_df = pd.DataFrame(all_dataset)
        user_df = pd.DataFrame(user_dataset)

        if all_df.empty or user_df.empty:
            return jsonify({"success": False, "message": "Insufficient data for recommendations"}), 400

        # ===== Content-Based Filtering =====
        vectorizer = TfidfVectorizer(max_df=0.7, stop_words='english', min_df=1, ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform(all_df["food_name"])
        similarity_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)

        food_id_to_index = {food_id: idx for idx, food_id in enumerate(all_df["food_id"])}
        user_food_indices = [food_id_to_index[food_id] for food_id in user_df["food_id"] if food_id in food_id_to_index]

        user_similarity_scores = similarity_matrix[user_food_indices].mean(axis=0) if user_food_indices else []

        # ===== Collaborative Filtering =====
        food_popularity = all_df.groupby("food_id")["quantity"].sum().sort_values(ascending=False)
        popular_food_ids = food_popularity.index.tolist()

        # ===== Hybrid Scoring =====
        hybrid_scores = {}
        for idx, food_id in enumerate(all_df["food_id"]):
            content_score = user_similarity_scores[idx] if len(user_similarity_scores) > 0 else 0
            popularity_score = food_popularity.get(food_id, 0)
            hybrid_scores[food_id] = 0.7 * content_score + 0.3 * popularity_score

        # Get top recommendations
        top_recommendations = all_df.iloc[np.argsort(list(hybrid_scores.values()))[::-1]]
        unique_recommendations = top_recommendations.drop_duplicates(subset=["food_id"])["food_id"]

        return jsonify({"success": True, "recommendations": unique_recommendations.tolist()}), 200

    except Exception as e:
        print(f"Error during recommendation: {e}")
        return jsonify({"success": False, "message": "An error occurred"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
