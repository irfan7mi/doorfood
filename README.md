DoorfooD Project
DoorfooD is a food ordering and recommendation system built with Flask, MongoDB, and machine learning techniques. It provides users with personalized food recommendations based on their past orders using a hybrid recommendation system that combines content-based filtering and collaborative filtering.

This README will guide you through the content, setup, and installation for the DoorfooD project.

Overview
The DoorfooD project provides an API that allows users to get personalized food recommendations based on their previous orders. The backend is built using Flask, with MongoDB for data storage, and the recommendation engine uses machine learning to suggest relevant food items.

Key Features
Hybrid Recommendation System: Combines content-based filtering (based on food similarity) and collaborative filtering (based on food popularity).

MongoDB Integration: Stores user orders and food data for analysis.

Machine Learning: Uses TF-IDF vectorization and cosine similarity to compute food similarities.

API Endpoints:

/recommend: Provides personalized food recommendations based on user’s previous orders.

Project Structure
Backend (Flask Application)
app.py: Main Flask application file, handling API routes and logic.

recommend(): Endpoint to generate food recommendations using hybrid filtering.

MongoDB Integration: Fetches order and food data from MongoDB to provide personalized recommendations.

Installation
Server Setup
Clone the repository:

git clone https://github.com/irfan7mi/doorfood.git

Navigate into the project directory: cd doorfood

Install dependencies:

Ensure you have Python 3.x installed.

Install the required packages using pip:

pip install -r requirements.txt

Set up MongoDB URI:

Ensure that your .env file contains the following environment variables:

MONGO_URI: Your MongoDB connection string.

PORT: Port for the Flask server to run.

Run the server:

Start the Flask application:

python app.py

The backend will be available at http://localhost:5000.

Client Setup
Currently, the project does not have a separate client-side application. However, you can integrate this API with any frontend framework (React, Angular, etc.) to display the recommendations.

API Documentation
Endpoints
/recommend (POST)
Description: This endpoint provides personalized food recommendations for a user based on their past orders.

Request Body:

json
Copy
Edit
{
  "userId": "string"
}
Response:

json
Copy
Edit
{
  "success": true,
  "recommendations": [
    "food_id_1",
    "food_id_2",
    ...
  ]
}
Error Response:

json
Copy
Edit
{
  "success": false,
  "message": "error_message"
}
/ (GET)
Description: A simple health check endpoint to ensure the API is running.

Response:

json
Copy
Edit
{
  "success": true,
  "message": "Welcome to DoorfooD API!"
}
Technologies Used
Flask: Python web framework to handle the backend API.

MongoDB: NoSQL database for storing orders and food data.

Scikit-learn: Used for TF-IDF vectorization and cosine similarity for food recommendations.

Pandas: Data manipulation and analysis library.

Numpy: For numerical operations in recommendations.

How to Contribute
Fork the repository.

Clone your fork locally.

Create a new branch (git checkout -b feature-name).

Make your changes and commit them (git commit -m 'Add new feature').

Push to your fork (git push origin feature-name).

Submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Flask for building the web API.

MongoDB for efficient data storage.

Scikit-learn for machine learning libraries.

