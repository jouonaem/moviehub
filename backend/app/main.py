from flask import Flask, jsonify
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

from app.routes.movies import movies_bp
from app.routes.stats import stats_bp
from app.routes.users import users_bp

app = Flask(__name__)

# Enable CORS for frontend communication
CORS(app, resources={r"/*": {"origins": "*"}})

# Swagger UI configuration
SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "MovieHub API"
    }
)

app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
app.register_blueprint(movies_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(users_bp)

@app.route('/')
def index():
    return jsonify({"message": "Bienvenue sur MovieHub API"})

@app.route('/static/swagger.json')
def swagger_json():
    import json
    import os
    swagger_path = os.path.join(os.path.dirname(__file__), '..', 'swagger.json')
    with open(swagger_path, 'r', encoding='utf-8') as f:
        return jsonify(json.load(f))   

