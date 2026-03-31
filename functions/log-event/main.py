"""Main module for the log-event function handler."""

import os
import time
import uuid

from crowdstrike.foundry.function import Function, Request, Response, APIError
from falconpy import CustomStorage

FUNC = Function.instance()


def _app_headers() -> dict:
    """Build app headers for CustomStorage construction."""
    app_id = os.environ.get("APP_ID")
    if app_id:
        return {"X-CS-APP-ID": app_id}
    return {}


@FUNC.handler(method="POST", path="/log-event")
def on_post(request: Request) -> Response:
    """
    Handle POST requests to /log-event endpoint.

    Args:
        request: The incoming request object containing the request body.

    Returns:
        Response: JSON response with event storage result or error message.
    """
    # Validate request
    if "event_data" not in request.body:
        return Response(
            code=400,
            errors=[APIError(code=400, message="missing event_data")]
        )

    event_data = request.body["event_data"]

    try:
        # Store data in a collection
        # This assumes you've already created a collection named "event_logs"
        event_id = str(uuid.uuid4())
        json_data = {
            "event_id": event_id,
            "data": event_data,
            "timestamp": int(time.time())
        }

        api_client = CustomStorage(ext_headers=_app_headers())
        collection_name = "event_logs"

        response = api_client.PutObject(body=json_data,
                                        collection_name=collection_name,
                                        object_key=event_id)

        if response["status_code"] != 200:
            error_message = response.get("error", {}).get("message", "Unknown error")
            return Response(
                code=response["status_code"],
                errors=[APIError(
                    code=response["status_code"],
                    message=f"Failed to store event: {error_message}"
                )]
            )

        # Query the collection to retrieve the event by id
        query_response = api_client.SearchObjects(filter=f"event_id:'{event_id}'",
                                                  collection_name=collection_name,
                                                  limit=5)

        return Response(
            body={
                "stored": True,
                "metadata": query_response.get("body", {}).get("resources", [])
            },
            code=200
        )
    except (ConnectionError, ValueError, KeyError) as e:
        return Response(
            code=500,
            errors=[APIError(code=500, message=f"Error saving collection: {str(e)}")]
        )


if __name__ == "__main__":
    FUNC.run()
