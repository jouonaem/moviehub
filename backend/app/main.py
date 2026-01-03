from flask import Flask, jsonify
from flask_cors import CORS

from app.routes.movies import movies_bp
from app.routes.stats import stats_bp
from app.routes.users import users_bp

app = Flask(__name__)

# Enable CORS for frontend communication
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(movies_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(users_bp)

@app.route('/')
def index():
    return jsonify({"message": "Bienvenue sur MovieHub API"})   

