from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
from falconpy import CustomStorage
import time


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
        json = {
            "data": event_data,
            "timestamp": int(time.time())
        }

        falcon = CustomStorage()

        response = falcon.PutObject(body=json,
                                    collection_name="event_logs",
                                    object_key="event_id"
                                    )

        if response["status_code"] != 201:
            error_message = response.get('error', {}).get('message', 'Unknown error')
            return FoundryResponse(
                code=response["status_code"],
                errors=[FoundryAPIError(
                    code=response["status_code"],
                    message=f"Failed to store event: {error_message}"
                )]
            )

        # Query the collection to retrieve recent events
        one_hour_ago = int(time.time()) - 3600
        query_response = falcon.search(filter=f"timestamp > {one_hour_ago}",
                                       collection_name="event_logs",
                                       limit=5
                                       )

        return FoundryResponse(
            body={
                "stored": True,
                "record_id": response["id"],
                "recent_events": query_response.get("resources", [])
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
