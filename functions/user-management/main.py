from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
# The following two lines are necessary to import utils
import sys
sys.path.append('../')
from utils import validate_email, format_error_response
from logging import Logger
from typing import Dict


func = FoundryFunction.instance()

# Handler on_post
@func.handler(method='POST', path='/create-user')
def on_post(request: FoundryRequest, config: Dict[str, object] | None, logger: Logger) -> FoundryResponse:
    email = request.body.get('email')

    logger.info(f"Email: {email}")
    logger.info(f"Is valid? {validate_email(email)}")

    if not validate_email(email):
        return FoundryResponse(errors=format_error_response("Invalid email format"))

    return FoundryResponse(
        code=200,
        body={
            "email":email
        }
    )


if __name__ == '__main__':
    func.run()
