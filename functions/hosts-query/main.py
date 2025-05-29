from logging import Logger
from typing import Dict
from falconpy import Hosts
from falconfoundry import (
    FoundryFunction,
    FoundryRequest,
    FoundryResponse,
    FoundryAPIError
)


func = FoundryFunction.instance()


@func.handler(method='POST', path='/hosts-query')
def on_hosts_query(request: FoundryRequest, config: Dict[str, object] | None, logger: Logger) -> FoundryResponse:

    logger.info("POST handler for /hosts-query is invoked")

    # get the requested Host IDs from the request body
    host_ids = request.body.get("ids")
    if not host_ids:
        logger.error("ids argument is missing from request parameters")
        return FoundryResponse(
            code=400,
            errors=[FoundryAPIError(code=400, message='Required host ids are not provided')]
        )

    # Initialize FalconPy client for Hosts API and enable debugging
    hosts = Hosts(debug=True)

    # Call Hosts API to fetch the details of the requested hosts
    api_result = hosts.get_device_details(ids=host_ids)
    if api_result['status_code'] != 200:
        # FalconPy SDK returned an error
        response = FoundryResponse(
            code=api_result['status_code'],
            errors=[
                FoundryAPIError(code=api_result['status_code'], message="FalconPy API call failed")
            ]
        )
    else:
        # FalconPy API class was successful, return the requested data
        response = FoundryResponse(
            body={
                'hosts': api_result['body']['resources']
            },
            code=200
        )

    return response


if __name__ == '__main__':
    func.run()
