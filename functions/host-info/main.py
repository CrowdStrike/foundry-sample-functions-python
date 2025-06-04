from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
from utils import validate_host_id, format_error_response
from logging import Logger
from typing import Dict


func = FoundryFunction.instance()

# Handler on_post
@func.handler(method='POST', path='/host-info')
def on_post(request: FoundryRequest, config: Dict[str, object] | None, logger: Logger) -> FoundryResponse:
    host_id = request.body.get('host_id')

    logger.info(f"Host ID: {host_id}")
    logger.info(f"Is valid? {validate_host_id(host_id)}")

    if not validate_host_id(host_id):
        return FoundryResponse(errors=format_error_response("Invalid host ID format"))

    return FoundryResponse(
        code=200,
        body={
            "host":host_id
        }
    )


if __name__ == '__main__':
    func.run()
