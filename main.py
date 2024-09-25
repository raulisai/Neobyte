from flask import Flask, render_template, jsonify, send_from_directory, abort
import random
import os

app = Flask(__name__)

recommendations = [{
    "id": 1,
    "title": "AI in Healthcare",
    "description": "Discover how AI is revolutionizing medical diagnostics and treatment.",
    "content": "Artificial Intelligence is making significant strides in the healthcare industry. From early disease detection to personalized treatment plans, AI is enhancing the capabilities of healthcare professionals and improving patient outcomes. Machine learning algorithms can analyze vast amounts of medical data, including patient records, research papers, and clinical trials, to assist in diagnosis and treatment decisions. AI-powered imaging analysis is improving the accuracy of radiology and pathology reports. Moreover, AI is being used to develop new drugs and treatments at a faster pace, potentially saving countless lives in the process."
}, {
    "id": 2,
    "title": "The Future of Robotics",
    "description": "Explore the latest advancements in robotic technology and automation.",
    "content": "The field of robotics is rapidly evolving, with new advancements pushing the boundaries of what machines can do. From industrial automation to personal assistance, robots are becoming increasingly sophisticated and integrated into our daily lives. Collaborative robots, or cobots, are revolutionizing manufacturing by working alongside humans, enhancing productivity and safety. In the healthcare sector, surgical robots are enabling minimally invasive procedures with unprecedented precision. Autonomous vehicles and drones are transforming transportation and logistics. As artificial intelligence continues to advance, we can expect robots to become more adaptable, learning from their environments and interactions, and taking on increasingly complex tasks."
}, {
    "id": 3,
    "title": "Natural Language Processing",
    "description": "Learn about AI-powered language understanding and generation.",
    "content": "Natural Language Processing (NLP) is a branch of AI that focuses on the interaction between computers and human language. Recent advancements in NLP have led to more sophisticated language models capable of understanding context, sentiment, and even generating human-like text. These developments have numerous applications, from improving machine translation and chatbots to enabling more natural voice assistants. NLP is also being used to analyze large volumes of text data, extracting insights from social media, customer feedback, and scientific literature. As NLP continues to evolve, we can expect more seamless human-computer interactions and powerful tools for processing and generating language."
}, {
    "id": 4,
    "title": "AI in Finance",
    "description": "Explore how AI is transforming the financial industry.",
    "content": "Artificial Intelligence is revolutionizing the financial sector, offering new ways to assess risk, detect fraud, and make investment decisions. Machine learning algorithms are being used to analyze market trends and predict stock performance with increasing accuracy. AI-powered chatbots and virtual assistants are improving customer service in banking, providing 24/7 support and personalized financial advice. In the realm of cybersecurity, AI systems are becoming crucial in detecting and preventing financial fraud by identifying unusual patterns in real-time. Automated trading systems, powered by AI, are executing trades at speeds and frequencies impossible for human traders. As AI continues to evolve, we can expect even more significant transformations in how financial services are delivered and consumed."
}, {
    "id": 5,
    "title": "Computer Vision",
    "description": "Discover the latest advancements in AI-powered image and video analysis.",
    "content": "Computer Vision, a field of AI that enables computers to derive meaningful information from digital images and videos, is advancing rapidly. These systems are now capable of tasks ranging from facial recognition and object detection to complex scene understanding. In healthcare, computer vision is being used to analyze medical images, assisting in the early detection of diseases. In automotive, it's a key technology for autonomous vehicles, allowing cars to 'see' and interpret their surroundings. Retail is using computer vision for cashier-less stores and inventory management. As the technology continues to improve, we can expect to see its application in more areas, from augmented reality experiences to advanced surveillance systems, reshaping how we interact with and understand visual information."
}, {
    "id": 6,
    "title": "AI Ethics",
    "description": "Explore the ethical considerations surrounding artificial intelligence.",
    "content": "As AI becomes increasingly prevalent in our society, ethical considerations surrounding its development and use are coming to the forefront. Key issues include privacy concerns, as AI systems often require vast amounts of data to function effectively. There are also questions about bias in AI algorithms, which can perpetuate or even exacerbate existing societal inequalities. The potential for AI to automate many jobs raises concerns about economic displacement. Additionally, as AI systems become more advanced, questions about accountability arise - who is responsible when an AI makes a mistake? There are also broader philosophical questions about the nature of intelligence and consciousness as AI systems become more sophisticated. As we continue to develop and deploy AI technologies, it's crucial that we also develop ethical frameworks to guide their use and ensure they benefit society as a whole."
}]

articles = [{
    "id": 1,
    "title": "The Rise of AI in Modern Technology",
    "content": "Artificial Intelligence has become an integral part of modern technology, transforming industries and revolutionizing the way we live and work. From smart assistants to self-driving cars, AI is pushing the boundaries of what's possible and opening up new frontiers in innovation.",
    "image_url": "https://w7.pngwing.com/pngs/150/625/png-transparent-artificial-intelligence-ai-chip-computer-technology-artificial-intelligence-icon-thumbnail.png",
    "author": "John Doe",
    "date": "2024-09-20"
}, {
    "id": 2,
    "title": "Machine Learning: Transforming Industries",
    "content": "Machine Learning is revolutionizing various industries, from healthcare to finance. By analyzing vast amounts of data and identifying patterns, ML algorithms are helping businesses make more informed decisions, predict trends, and automate complex processes.",
    "image_url": "https://w7.pngwing.com/pngs/150/625/png-transparent-artificial-intelligence-ai-chip-computer-technology-artificial-intelligence-icon-thumbnail.png",
    "author": "Jane Smith",
    "date": "2024-09-22"
}, {
    "id": 3,
    "title": "The Ethics of AI: Challenges and Considerations",
    "content": "As AI becomes more prevalent in our daily lives, we must address the ethical challenges it presents. From privacy concerns to algorithmic bias, the development and deployment of AI systems raise important questions about fairness, transparency, and accountability.",
    "image_url": "https://w7.pngwing.com/pngs/150/625/png-transparent-artificial-intelligence-ai-chip-computer-technology-artificial-intelligence-icon-thumbnail.png",
    "author": "Alex Johnson",
    "date": "2024-09-24"
}]


@app.route("/")
def index():
    return render_template("index.html", articles=articles[:3])


@app.route("/api/recommendations")
def get_recommendations():
    selected_recommendations = random.sample(recommendations, 3)
    return jsonify(selected_recommendations)


@app.route('/node_modules/<path:filename>')
def serve_node_modules(filename):
    return send_from_directory(os.path.join(app.root_path, 'node_modules'),
                               filename)


@app.route('/articles')
def articles_page():
    return render_template("articles.html", articles=articles)


@app.route('/article/<int:article_id>')
def article_detail(article_id):
    article = next(
        (article for article in articles if article['id'] == article_id), None)
    if article:
        return render_template("article_detail.html", article=article)
    else:
        abort(404)


@app.route('/recommendation/<int:recommendation_id>')
def recommendation_detail(recommendation_id):
    recommendation = next(
        (rec for rec in recommendations if rec['id'] == recommendation_id), None)
    if recommendation:
        return render_template("recommendation_detail.html", recommendation=recommendation)
    else:
        abort(404)


@app.route('/static/css/tailwind.output.css')
def serve_tailwind_css():
    return send_from_directory(os.path.join(app.root_path, 'static', 'css'),
                               'tailwind.output.css')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
