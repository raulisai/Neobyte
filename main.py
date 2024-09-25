from flask import Flask, render_template, jsonify, send_from_directory, abort
import random
import os

app = Flask(__name__)

recommendations = [
    {"title": "AI in Healthcare", "description": "Discover how AI is revolutionizing medical diagnostics and treatment."},
    {"title": "The Future of Robotics", "description": "Explore the latest advancements in robotic technology and automation."},
    {"title": "Natural Language Processing", "description": "Learn about AI-powered language understanding and generation."},
    {"title": "AI in Finance", "description": "Explore how AI is transforming the financial industry."},
    {"title": "Computer Vision", "description": "Discover the latest advancements in AI-powered image and video analysis."},
    {"title": "AI Ethics", "description": "Explore the ethical considerations surrounding artificial intelligence."}
]

articles = [
    {
        "id": 1,
        "title": "The Rise of AI in Modern Technology",
        "content": "Artificial Intelligence has become an integral part of modern technology, transforming industries and revolutionizing the way we live and work. From smart assistants to self-driving cars, AI is pushing the boundaries of what's possible and opening up new frontiers in innovation.",
        "author": "John Doe",
        "date": "2024-09-20"
    },
    {
        "id": 2,
        "title": "Machine Learning: Transforming Industries",
        "content": "Machine Learning is revolutionizing various industries, from healthcare to finance. By analyzing vast amounts of data and identifying patterns, ML algorithms are helping businesses make more informed decisions, predict trends, and automate complex processes.",
        "author": "Jane Smith",
        "date": "2024-09-22"
    },
    {
        "id": 3,
        "title": "The Ethics of AI: Challenges and Considerations",
        "content": "As AI becomes more prevalent in our daily lives, we must address the ethical challenges it presents. From privacy concerns to algorithmic bias, the development and deployment of AI systems raise important questions about fairness, transparency, and accountability.",
        "author": "Alex Johnson",
        "date": "2024-09-24"
    }
]

@app.route("/")
def index():
    return render_template("index.html", articles=articles[:3])

@app.route("/api/recommendations")
def get_recommendations():
    selected_recommendations = random.sample(recommendations, 3)
    return jsonify(selected_recommendations)

@app.route('/node_modules/<path:filename>')
def serve_node_modules(filename):
    return send_from_directory(os.path.join(app.root_path, 'node_modules'), filename)

@app.route('/articles')
def articles_page():
    return render_template("articles.html", articles=articles)

@app.route('/article/<int:article_id>')
def article_detail(article_id):
    article = next((article for article in articles if article['id'] == article_id), None)
    if article:
        return render_template("article_detail.html", article=article)
    else:
        abort(404)

@app.route('/static/css/tailwind.output.css')
def serve_tailwind_css():
    return send_from_directory(os.path.join(app.root_path, 'static', 'css'), 'tailwind.output.css')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
