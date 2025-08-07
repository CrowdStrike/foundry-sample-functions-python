"""Test module for the log-event function handler."""

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

    @patch('main.APIHarnessV2')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_success(self, mock_time, mock_uuid, mock_api_harness_class):
        """Test successful POST request with valid event_data in body."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock APIHarnessV2 instance
        mock_api_instance = MagicMock()
        mock_api_harness_class.return_value = mock_api_instance

        # Mock successful PutObject response
        mock_api_instance.command.side_effect = [
            {  # PutObject response
                "status_code": 200,
                "body": {"success": True}
            },
            {  # SearchObjects response
                "status_code": 200,
                "body": {
                    "resources": [{
                        "event_id": "test-event-id-123",
                        "data": {"test": "data"},
                        "timestamp": 1690123456
                    }]
                }
            }
        ]

        request = Request()
        request.body = {
            "event_data": {"test": "data", "message": "test event"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 200)
        self.assertTrue(response.body["stored"])
        self.assertIn("metadata", response.body)
        self.assertEqual(len(response.body["metadata"]), 1)

        # Verify API calls
        self.assertEqual(mock_api_instance.command.call_count, 2)

        # Verify PutObject call
        put_call = mock_api_instance.command.call_args_list[0]
        self.assertEqual(put_call[0][0], "PutObject")
        self.assertEqual(put_call[1]["collection_name"], "event_logs")
        self.assertEqual(put_call[1]["object_key"], "test-event-id-123")
        self.assertEqual(put_call[1]["body"]["event_id"], "test-event-id-123")
        self.assertEqual(put_call[1]["body"]["data"], {"test": "data", "message": "test event"})
        self.assertEqual(put_call[1]["body"]["timestamp"], 1690123456)

        # Verify SearchObjects call
        search_call = mock_api_instance.command.call_args_list[1]
        self.assertEqual(search_call[0][0], "SearchObjects")
        self.assertEqual(search_call[1]["filter"], "event_id:'test-event-id-123'")
        self.assertEqual(search_call[1]["collection_name"], "event_logs")

    def test_on_post_missing_event_data(self):
        """Test POST request with missing event_data returns error."""
        request = Request()

        response = main.on_post(request)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "missing event_data")

    @patch('main.APIHarnessV2')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_put_object_error(self, mock_time, mock_uuid, mock_api_harness_class):
        """Test POST request when PutObject API returns an error."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock APIHarnessV2 instance with error response
        mock_api_instance = MagicMock()
        mock_api_harness_class.return_value = mock_api_instance
        mock_api_instance.command.return_value = {
            "status_code": 500,
            "error": {"message": "Internal server error"}
        }

        request = Request()
        request.body = {
            "event_data": {"test": "data"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Failed to store event: Internal server error", response.errors[0].message)

    @patch('main.APIHarnessV2')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_exception_handling(self, mock_time, mock_uuid, mock_api_harness_class):
        """Test POST request when an exception is raised."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock APIHarnessV2 to raise an exception
        mock_api_harness_class.side_effect = ConnectionError("Connection failed")

        request = Request()
        request.body = {
            "event_data": {"test": "data"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error saving collection: Connection failed", response.errors[0].message)

    @patch.dict('main.os.environ', {'APP_ID': 'test-app-123'})
    @patch('main.APIHarnessV2')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_with_app_id_header(self, mock_time, mock_uuid, mock_api_harness_class):
        """Test POST request with APP_ID environment variable set."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock APIHarnessV2 instance
        mock_api_instance = MagicMock()
        mock_api_harness_class.return_value = mock_api_instance
        mock_api_instance.command.side_effect = [
            {"status_code": 200, "body": {"success": True}},
            {"status_code": 200, "body": {"resources": []}}
        ]

        request = Request()
        request.body = {
            "event_data": {"test": "data"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 200)

        # Verify that headers with APP_ID were passed to both API calls
        for call in mock_api_instance.command.call_args_list:
            self.assertEqual(call[1]["headers"], {"X-CS-APP-ID": "test-app-123"})


if __name__ == "__main__":
    unittest.main()
