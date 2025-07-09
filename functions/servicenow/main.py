from logging import Logger
from typing import Dict

from crowdstrike.foundry.function import Function, Request, Response, APIError
from falconpy import APIIntegrations

func = Function.instance()


@func.handler(method="POST", path="/ticket")
def on_post(request: Request, config: Dict[str, object] | None, logger: Logger) -> Response:
    """
    Create an incident ticket in ServiceNow using the Table API.

    Required fields in request body:
    - title: Short description of the incident
    - description: Detailed description of the incident

    Optional fields:
    - impact: Impact level (1-High, 2-Medium, 3-Low)
    - urgency: Urgency level (1-High, 2-Medium, 3-Low)
    - category: Category of the incident
    - subcategory: Subcategory of the incident
    - assignment_group: Group to assign the incident to
    - caller_id: User ID of the caller
    """
    # Validate required fields
    if "title" not in request.body or "description" not in request.body:
        return Response(
            code=400,
            errors=[APIError(code=400, message="Missing required fields: title and description")]
        )

    # Prepare payload for ServiceNow incident creation
    payload = {
        "short_description": request.body["title"],
        "description": request.body["description"],
    }

    # Add optional fields if provided
    optional_fields = {
        "impact": request.body.get("impact", "2"),
        "urgency": request.body.get("urgency", "2"),
        "category": request.body.get("category"),
        "subcategory": request.body.get("subcategory"),
        "assignment_group": request.body.get("assignment_group"),
        "caller_id": request.body.get("caller_id")
    }

    # Only include fields with non-None values
    for field, value in optional_fields.items():
        if value is not None:
            payload[field] = value

    logger.info(f"Creating ServiceNow incident with payload: {payload}")

    try:
        # Use the APIIntegrations client to call ServiceNow Table API to create incident
        api = APIIntegrations()
        response = api.execute_command_proxy(
            definition_id="ServiceNow",
            operation_id="POST__api_now_table_tablename",
            params={
                "path": {"tableName": "incident"}
            },
            request={
                "json": payload,
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )

        # Log the raw response for troubleshooting
        logger.info(f"ServiceNow API response: {response}")

        if response["status_code"] >= 400:
            error_message = response.get("error", {}).get("message", "Unknown error")
            return Response(
                code=response["status_code"],
                errors=[APIError(
                    code=response["status_code"],
                    message=f"ServiceNow integration error: {error_message}"
                )]
            )

        # Extract relevant information from the response
        result = response["body"]["result"]

        # Return formatted response with incident details
        return Response(
            body={
                "incident_id": result["sys_id"],
                "incident_number": result["number"],
                "state": result["state"],
                "priority": result["priority"],
                "created_at": result["sys_created_on"],
                "assigned_to": result["assigned_to"],
                "url": response["headers"]["Location"]
            },
            code=201 if response["status_code"] == 200 else response["status_code"]
        )
    except Exception as e:
        logger.error(f"Error creating ServiceNow incident: {str(e)}", exc_info=True)
        return Response(
            code=500,
            errors=[APIError(code=500, message=f"Error creating incident: {str(e)}")]
        )


if __name__ == "__main__":
    func.run()
