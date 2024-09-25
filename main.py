from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)

recommendations = [
    {"title": "AI in Healthcare", "description": "Discover how AI is revolutionizing medical diagnostics and treatment."},
    {"title": "The Future of Robotics", "description": "Explore the latest advancements in robotic technology and automation."},
    {"title": "Natural Language Processing", "description": "Learn about AI-powered language understanding and generation."},
    {"title": "AI in Finance", "description": "Explore how AI is transforming the financial industry."},
    {"title": "Computer Vision", "description": "Discover the latest advancements in AI-powered image and video analysis."},
    {"title": "AI Ethics", "description": "Explore the ethical considerations surrounding artificial intelligence."}
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/recommendations")
def get_recommendations():
    selected_recommendations = random.sample(recommendations, 3)
    return jsonify(selected_recommendations)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
