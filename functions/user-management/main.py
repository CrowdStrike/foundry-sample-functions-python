"""Main module for the user-management function handler."""

from logging import Logger
from typing import Dict

from crowdstrike.foundry.function import Function, Request, Response

from utils import validate_email, format_error_response

FUNC = Function.instance()


@FUNC.handler(method="POST", path="/create-user")
def on_post(request: Request, _config: Dict[str, object] | None, logger: Logger) -> Response:
    """
    Handle POST requests to /create-user endpoint.

    Args:
        request: The incoming request object containing the request body.
        _config: Configuration dictionary (unused).
        logger: Logger instance for logging.

    Returns:
        Response: JSON response with user info or error message.
    """
    email = request.body.get("email")

    logger.info(f"Email: {email}")
    logger.info(f"Is valid? {validate_email(email)}")

    if not validate_email(email):
        return Response(errors=format_error_response("Invalid email format"))

    return Response(
        code=200,
        body={
            "email": email
        }
    )


if __name__ == "__main__":
    FUNC.run()
