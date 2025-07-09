from logging import Logger
from typing import Dict

from crowdstrike.foundry.function import Function, Request, Response

from utils import validate_email, format_error_response

func = Function.instance()


@func.handler(method="POST", path="/create-user")
def on_post(request: Request, config: Dict[str, object] | None, logger: Logger) -> Response:
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
    func.run()
