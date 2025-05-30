from falconfoundry import FoundryFunction, FoundryRequest, FoundryResponse, FoundryAPIError
from falconpy import APIIntegrations
import logging


func = FoundryFunction.instance()

# This configuration for logging will only work when running locally
# See the Add Logging section below for how to log to NG-SIEM
logger = logging.getLogger()
logger.setLevel(logging.INFO)

@func.handler(method='POST', path='/ticket')
def on_post(request: FoundryRequest) -> FoundryResponse:
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
    if 'title' not in request.body or 'description' not in request.body:
        return FoundryResponse(
            code=400,
            errors=[FoundryAPIError(code=400, message='Missing required fields: title and description')]
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

    # Call ServiceNow Table API to create incident
    try:
        body = {
            "resources": [{
                "definition_id": "ServiceNow",
                "operation_id": "POST__api_now_table_tablename",
                "parameters": {
                    "tableName": "incident",
                    "sysparm_display_value": "true",  # Return both display and actual values
                    "sysparm_exclude_reference_link": "true"  # Exclude reference links for cleaner response
                },
                "request": {
                    "json": payload,
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    }
                }
            }]
        }

        # Use the APIIntegrations client to call ServiceNow
        api = APIIntegrations()
        response = api.execute_command(body=body)

        # Log the raw response for troubleshooting
        logger.info(f"ServiceNow API response: {response.status_code} - {response.text}")

        if response.status_code >= 400:
            error_message = response.json().get('error', {}).get('message', 'Unknown error')
            return FoundryResponse(
                code=response.status_code,
                errors=[FoundryAPIError(
                    code=response.status_code,
                    message=f"ServiceNow integration error: {error_message}"
                )]
            )

        # Extract relevant information from the response
        result = response.json().get("result", {})

        # Return formatted response with incident details
        return FoundryResponse(
            body={
                "incident_id": result.get("sys_id"),
                "incident_number": result.get("number"),
                "state": result.get("state", {}).get("display_value"),
                "priority": result.get("priority", {}).get("display_value"),
                "created_at": result.get("sys_created_on"),
                "assigned_to": result.get("assigned_to", {}).get("display_value"),
                "url": f"https://{request.body.get('instance', 'yourinstance')}.service-now.com/nav_to.do?uri=incident.do?sys_id={result.get('sys_id')}"
            },
            code=201 if response.status_code == 200 else response.status_code
        )
    except Exception as e:
        logger.error(f"Error creating ServiceNow incident: {str(e)}", exc_info=True)
        return FoundryResponse(
            code=500,
            errors=[FoundryAPIError(code=500, message=f"Error creating incident: {str(e)}")]
        )

if __name__ == '__main__':
    func.run()
