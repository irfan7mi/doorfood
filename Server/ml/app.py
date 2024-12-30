from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# MongoDB connection
client = MongoClient('mongodb://localhost:27017')
db = client['doorfood']
order_collection = db['orders']
food_collection = db['foods']

@app.route('/create-dataset', methods=['GET'])
def create_dataset():
    # Fetch orders from MongoDB
    orders = list(order_collection.find())

    if not orders:
        return jsonify({"success": False, "message": "No orders found"}), 404

    # Create a dataset for content-based filtering
    dataset = []
    for order in orders:
        user_id = str(order["userId"])
        for item in order["items"]:
            dataset.append({
                "user_id": user_id,
                "food_id": str(item["_id"]),
                "food_name": item["name"],
                "quantity": item["quantity"]
            })

    # Convert dataset to a Pandas DataFrame
    df = pd.DataFrame(dataset)
    print(df.head())  # View the dataset in tabular format
    return df.to_json(orient="records"), 200

if __name__ == "__main__":
    app.run(port=5000, debug=True)
