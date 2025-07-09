import json
import re
from typing import Dict, Any, Optional

from crowdstrike.foundry.function import APIError


def validate_host_id(host_id: str) -> bool:
    """Validate that a host ID is in the correct format."""
    if not host_id or not isinstance(host_id, str):
        return False
    return len(host_id) == 32 and all(c in "0123456789abcdef" for c in host_id.lower())


def validate_email(email: str) -> bool:
    """Validate email format."""
    pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    return bool(re.match(pattern, email))


def format_error_response(message: str, code: int = 400) -> list[Any]:
    """Create a standardized error response."""
    return [APIError(code=code, message=message)]


def safe_json_parse(data: str) -> Optional[Dict[str, Any]]:
    """Safely parse JSON data."""
    try:
        return json.loads(data)
    except (json.JSONDecodeError, TypeError):
        return None
