from app.routes.users import users_bp
from app.routes.stats import stats_bp

app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(stats_bp, url_prefix="/stats")
