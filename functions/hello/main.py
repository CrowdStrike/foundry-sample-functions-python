from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError

func = FoundryFunction.instance()


# Handler hello
@func.handler(method='POST', path='/hello')
def on_post(request: FoundryRequest) -> FoundryResponse:

    #
    # Replace the following example code with your handler code
    #

    # Demonstrates how to validate the request body if your handler requires input payload
    # Replace with your own request and update the request_schema.json to match
    if 'name' not in request.body:
        # This example expects 'name' field in the request body and returns
        # an error response (400 - Bad Request) if not provided by the caller
        return FoundryResponse(
            code=400,
            errors=[FoundryAPIError(code=400, message='missing name from request body')]
        )

    # Demonstrates how to return a success response with JSON body
    # Replace with your response and update the response_schema.json to match
    return FoundryResponse(
        body={'greeting': f'Hello {request.body["name"]}! It is nice to see you.'},
        code=200,
    )


if __name__ == '__main__':
    func.run()
