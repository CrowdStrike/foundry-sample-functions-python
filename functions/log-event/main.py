from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
from falconpy import APIHarnessV2
import time
import os
import uuid

func = FoundryFunction.instance()


@func.handler(method='POST', path='/log-event')
def on_post(request: FoundryRequest) -> FoundryResponse:
    # Validate request
    if 'event_data' not in request.body:
        return FoundryResponse(
            code=400,
            errors=[FoundryAPIError(code=400, message='missing event_data')]
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
            return FoundryResponse(
                code=response["status_code"],
                errors=[FoundryAPIError(
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

        return FoundryResponse(
            body={
                "stored": True,
                "metadata": query_response.get("body").get("resources", [])
            },
            code=200
        )
    except Exception as e:
        return FoundryResponse(
            code=500,
            errors=[FoundryAPIError(code=500, message=f"Error saving collection: {str(e)}")]
        )


if __name__ == '__main__':
    func.run()
