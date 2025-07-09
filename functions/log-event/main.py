import os
import time
import uuid

from crowdstrike.foundry.function import Function, Request, Response, APIError
from falconpy import APIHarnessV2

func = Function.instance()


@func.handler(method='POST', path='/log-event')
def on_post(request: Request) -> Response:
    # Validate request
    if 'event_data' not in request.body:
        return Response(
            code=400,
            errors=[APIError(code=400, message='missing event_data')]
        )

    event_data = request.body['event_data']

    try:
        # Store data in a collection
        # This assumes you've already created a collection named "event_logs"
        event_id = str(uuid.uuid4())
        json = {
            "event_id": event_id,
            "data": event_data,
            "timestamp": int(time.time())
        }

        # Allow setting APP_ID as an env variable for local testing
        headers = {}
        if os.environ.get("APP_ID"):
            headers = {
                "X-CS-APP-ID": os.environ.get("APP_ID")
            }

        api_client = APIHarnessV2()
        collection_name = "event_logs"

        response = api_client.command("PutObject",
            body=json,
            collection_name=collection_name,
            object_key=event_id,
            headers=headers
        )

        if response["status_code"] != 200:
            error_message = response.get('error', {}).get('message', 'Unknown error')
            return Response(
                code=response["status_code"],
                errors=[APIError(
                    code=response["status_code"],
                    message=f"Failed to store event: {error_message}"
                )]
            )

        # Query the collection to retrieve the event by id
        query_response = api_client.command("SearchObjects",
            filter=f"event_id:'{event_id}'",
            collection_name=collection_name,
            limit=5,
            headers=headers
        )

        return Response(
            body={
                "stored": True,
                "metadata": query_response.get("body").get("resources", [])
            },
            code=200
        )
    except Exception as e:
        return Response(
            code=500,
            errors=[APIError(code=500, message=f"Error saving collection: {str(e)}")]
        )


if __name__ == '__main__':
    func.run()
