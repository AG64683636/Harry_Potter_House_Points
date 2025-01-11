from flask import Flask

def create_app():
    """
    Factory function to create and configure the Flask application.

    This function sets up the Flask application instance, registers blueprints,
    and prepares the app for use. It adheres to the Flask application factory
    pattern, which is useful for larger applications or those requiring
    flexible configuration.

    Returns:
        Flask: The configured Flask application instance.
    """
    app = Flask(__name__)

    # Import routes and register them
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
