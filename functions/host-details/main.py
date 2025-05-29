from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
# Import service collection you'd like to use
from falconpy import Hosts


func = FoundryFunction.instance()


@func.handler(method='POST', path='/host-details')
def on_post(request: FoundryRequest) -> FoundryResponse:
    # Validate request
    if 'host_id' not in request.body:
        return FoundryResponse(
            code=400,
            errors=[FoundryAPIError(code=400, message='missing host_id from request body')]
        )

    host_id = request.body['host_id']

    # Initialize the Hosts class with context-aware authentication
    falcon = Hosts()

    # Query device details
    response = falcon.get_device_details(ids=host_id)

    if response["status_code"] != 200:
        return FoundryResponse(
            code=response["status_code"],
            errors=[FoundryAPIError(code=response["status_code"],
                                    message=f"Error retrieving host: {response['body']}")],
        )

    # Return host information
    return FoundryResponse(
        body={"host_details": response["body"]["resources"][0]},
        code=200,
    )
