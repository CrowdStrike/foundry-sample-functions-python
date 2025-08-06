"""Main module for the host-details function handler."""

from crowdstrike.foundry.function import Function, Request, Response, APIError
# Import service collection you'd like to use
from falconpy import Hosts

FUNC = Function.instance()


@FUNC.handler(method="POST", path="/host-details")
def on_post(request: Request) -> Response:
    """
    Handle POST requests to /host-details endpoint.

    Args:
        request: The incoming request object containing the request body.

    Returns:
        Response: JSON response with host details or error message.
    """
    # Validate request
    if "host_id" not in request.body:
        return Response(
            code=400,
            errors=[APIError(code=400, message="missing host_id from request body")]
        )

    host_id = request.body["host_id"]

    # Initialize the Hosts class with context-aware authentication
    falcon = Hosts()

    # Query device details
    response = falcon.get_device_details(ids=host_id)

    if response["status_code"] != 200:
        return Response(
            code=response["status_code"],
            errors=[APIError(code=response["status_code"],
                             message=f"Error retrieving host: {response['body']}")],
        )

    # Return host information
    return Response(
        body={"host_details": response["body"]["resources"][0]},
        code=200,
    )


if __name__ == "__main__":
    FUNC.run()
