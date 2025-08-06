"""Main module for the host-info function handler."""

from logging import Logger
from typing import Dict, Optional, Union

from crowdstrike.foundry.function import Function, Request, Response

from utils import validate_host_id, format_error_response

FUNC = Function.instance()


@FUNC.handler(method="POST", path="/host-info")
def on_post(request: Request, _config: Optional[Dict[str, object]], logger: Logger) -> Response:
    """
    Handle POST requests to /host-info endpoint.

    Args:
        request: The incoming request object containing the request body.
        _config: Configuration dictionary (unused).
        logger: Logger instance for logging.

    Returns:
        Response: JSON response with host info or error message.
    """
    host_id = request.body.get("host_id")

    logger.info(f"Host ID: {host_id}")
    logger.info(f"Is valid? {validate_host_id(host_id)}")

    if not validate_host_id(host_id):
        return Response(errors=format_error_response("Invalid host ID format"))

    return Response(
        code=200,
        body={
            "host": host_id
        }
    )


if __name__ == "__main__":
    FUNC.run()
