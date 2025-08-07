"""Test module for the ServiceNow function handler."""

import importlib
import unittest
from unittest.mock import patch, MagicMock

from crowdstrike.foundry.function import Request

import main


def mock_handler(*_args, **_kwargs):
    """Mock handler decorator for testing."""

    def identity(func):
        return func

    return identity


class FnTestCase(unittest.TestCase):
    """Test case class for function handler tests."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        patcher = patch("crowdstrike.foundry.function.Function.handler", new=mock_handler)
        self.addCleanup(patcher.stop)
        self.handler_patch = patcher.start()

        importlib.reload(main)

    @patch("main.APIIntegrations")
    def test_on_post_success_minimal_fields(self, mock_api_integrations_class):
        """Test successful POST request with minimal required fields."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock successful ServiceNow response
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 200,
            "body": {
                "result": {
                    "sys_id": "abc123def456",
                    "number": "INC0001234",
                    "state": "1",
                    "priority": "3",
                    "sys_created_on": "2025-07-23 13:30:00",
                    "assigned_to": ""
                }
            },
            "headers": {
                "Location": "https://instance.service-now.com/api/now/table/incident/abc123def456"
            }
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "This is a test incident description"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 201)
        self.assertEqual(response.body["incident_id"], "abc123def456")
        self.assertEqual(response.body["incident_number"], "INC0001234")
        self.assertEqual(response.body["state"], "1")
        self.assertEqual(response.body["priority"], "3")
        self.assertEqual(response.body["created_at"], "2025-07-23 13:30:00")
        self.assertEqual(response.body["assigned_to"], "")
        self.assertEqual(response.body["url"], "https://instance.service-now.com/api/now/table/incident/abc123def456")

        # Verify API call was made correctly
        mock_api_instance.execute_command_proxy.assert_called_once_with(
            definition_id="ServiceNow",
            operation_id="POST__api_now_table_tablename",
            params={
                "path": {"tableName": "incident"}
            },
            request={
                "json": {
                    "short_description": "Test incident",
                    "description": "This is a test incident description",
                    "impact": "2",
                    "urgency": "2"
                },
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }
        )

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)

    @patch("main.APIIntegrations")
    def test_on_post_success_all_fields(self, mock_api_integrations_class):
        """Test successful POST request with all optional fields."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock successful ServiceNow response
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 200,
            "body": {
                "result": {
                    "sys_id": "xyz789abc123",
                    "number": "INC0001235",
                    "state": "2",
                    "priority": "1",
                    "sys_created_on": "2025-07-23 14:00:00",
                    "assigned_to": "john.doe"
                }
            },
            "headers": {
                "Location": "https://instance.service-now.com/api/now/table/incident/xyz789abc123"
            }
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Critical security incident",
            "description": "Detailed description of security incident",
            "impact": "1",
            "urgency": "1",
            "category": "Security",
            "subcategory": "Malware",
            "assignment_group": "Security Team",
            "caller_id": "jane.smith"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 201)
        self.assertEqual(response.body["incident_id"], "xyz789abc123")

        # Verify API call included all optional fields
        call_args = mock_api_instance.execute_command_proxy.call_args
        payload = call_args[1]["request"]["json"]
        self.assertEqual(payload["impact"], "1")
        self.assertEqual(payload["urgency"], "1")
        self.assertEqual(payload["category"], "Security")
        self.assertEqual(payload["subcategory"], "Malware")
        self.assertEqual(payload["assignment_group"], "Security Team")
        self.assertEqual(payload["caller_id"], "jane.smith")

    def test_on_post_missing_title(self):
        """Test POST request with missing title field returns error."""
        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "description": "Missing title field"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "Missing required fields: title and description")

    def test_on_post_missing_description(self):
        """Test POST request with missing description field returns error."""
        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Missing description field"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "Missing required fields: title and description")

    def test_on_post_missing_both_required_fields(self):
        """Test POST request with both required fields missing returns error."""
        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {}

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "Missing required fields: title and description")

    @patch("main.APIIntegrations")
    def test_on_post_servicenow_api_error(self, mock_api_integrations_class):
        """Test POST request when ServiceNow API returns an error."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock ServiceNow API error response
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 400,
            "error": {
                "message": "Invalid field value"
            }
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "Test description"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("ServiceNow integration error: Invalid field value", response.errors[0].message)

    @patch("main.APIIntegrations")
    def test_on_post_servicenow_api_error_no_message(self, mock_api_integrations_class):
        """Test POST request when ServiceNow API returns error without message."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock ServiceNow API error response without error message
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 500
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "Test description"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("ServiceNow integration error: Unknown error", response.errors[0].message)

    @patch("main.APIIntegrations")
    def test_on_post_value_error_handling(self, mock_api_integrations_class):
        """Test POST request when ValueError is raised during response processing."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock response that will cause ValueError when accessing result fields
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 200,
            "body": {
                "result": {}  # Missing expected fields
            },
            "headers": {}
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "Test description"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error creating incident:", response.errors[0].message)

        # Verify error was logged
        mock_logger.error.assert_called()

    @patch("main.APIIntegrations")
    def test_on_post_general_exception_handling(self, mock_api_integrations_class):
        """Test POST request when general exception is raised."""
        # Mock APIIntegrations to raise an exception
        mock_api_integrations_class.side_effect = ConnectionError("Connection failed")

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "Test description"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error creating incident: Connection failed", response.errors[0].message)

        # Verify error was logged
        mock_logger.error.assert_called()

    @patch("main.APIIntegrations")
    def test_on_post_optional_fields_filtering(self, mock_api_integrations_class):
        """Test POST request with optional fields filtering (None values excluded)."""
        # Mock APIIntegrations instance
        mock_api_instance = MagicMock()
        mock_api_integrations_class.return_value = mock_api_instance

        # Mock successful ServiceNow response
        mock_api_instance.execute_command_proxy.return_value = {
            "status_code": 200,
            "body": {
                "result": {
                    "sys_id": "test123",
                    "number": "INC0001236",
                    "state": "1",
                    "priority": "2",
                    "sys_created_on": "2025-07-23 15:00:00",
                    "assigned_to": ""
                }
            },
            "headers": {
                "Location": "https://test.service-now.com/incident/test123"
            }
        }

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "title": "Test incident",
            "description": "Test description",
            "impact": "3",
            "category": "Hardware",
            "subcategory": None,  # This should be filtered out
            "assignment_group": "",  # This should be included (empty string is not None)
            "caller_id": None  # This should be filtered out
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 201)

        # Verify API call payload excludes None values but includes empty strings
        call_args = mock_api_instance.execute_command_proxy.call_args
        payload = call_args[1]["request"]["json"]
        self.assertEqual(payload["impact"], "3")
        self.assertEqual(payload["category"], "Hardware")
        self.assertEqual(payload["assignment_group"], "")
        self.assertNotIn("subcategory", payload)
        self.assertNotIn("caller_id", payload)


if __name__ == "__main__":
    unittest.main()
