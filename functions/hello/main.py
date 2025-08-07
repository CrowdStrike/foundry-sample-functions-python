"""Main module for the hello function handler."""

from crowdstrike.foundry.function import Function, Request, Response, APIError

FUNC = Function.instance()


@FUNC.handler(method="POST", path="/hello")
def on_post(request: Request) -> Response:
    """
    Handle POST requests to /hello endpoint.

    Args:
        request: The incoming request object containing the request body.

    Returns:
        Response: JSON response with greeting or error message.
    """
    #
    # Replace the following example code with your handler code
    #

    # Demonstrates how to validate the request body if your handler requires input payload
    # Replace with your own request and update the request_schema.json to match
    if "name" not in request.body:
        # This example expects "name" field in the request body and returns
        # an error response (400 - Bad Request) if not provided by the caller
        return Response(
            code=400,
            errors=[APIError(code=400, message="missing name from request body")]
        )

    # Demonstrates how to return a success response with JSON body
    # Replace with your response and update the response_schema.json to match
    return Response(
        body={"greeting": f"Hello {request.body['name']}! It is nice to see you."},
        code=200,
    )


if __name__ == "__main__":
    FUNC.run()
