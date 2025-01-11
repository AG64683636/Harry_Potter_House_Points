from harry_potter_app import create_app

# Create the Flask application instance
app = create_app()

if __name__ == "__main__":
    """
    Entry point for running the Flask application.

    This block checks if the script is being executed directly (as opposed to
    being imported as a module). If so, it runs the Flask application with
    debugging enabled.

    The `debug=True` option:
    - Enables the Flask debugger, which provides detailed error messages.
    - Automatically reloads the server when code changes are detected.
    """
    app.run(debug=True)
