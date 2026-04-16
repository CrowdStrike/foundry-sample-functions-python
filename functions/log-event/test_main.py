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

    @patch('main.CustomStorage')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_success(self, mock_time, mock_uuid, mock_custom_storage_class):
        """Test successful POST request with valid event_data in body."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock CustomStorage instance
        mock_api_instance = MagicMock()
        mock_custom_storage_class.return_value = mock_api_instance

        # Mock successful PutObject response
        mock_api_instance.PutObject.return_value = {
            "status_code": 200,
            "body": {"success": True}
        }

        # Mock successful SearchObjects response
        mock_api_instance.SearchObjects.return_value = {
            "status_code": 200,
            "body": {
                "resources": [{
                    "event_id": "test-event-id-123",
                    "data": {"test": "data"},
                    "timestamp": 1690123456
                }]
            }
        }

        request = Request()
        request.body = {
            "event_data": {"test": "data", "message": "test event"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 200)
        self.assertTrue(response.body["stored"])
        self.assertIn("metadata", response.body)
        self.assertEqual(len(response.body["metadata"]), 1)

        # Verify PutObject call
        mock_api_instance.PutObject.assert_called_once()
        put_call = mock_api_instance.PutObject.call_args
        self.assertEqual(put_call[1]["collection_name"], "event_logs")
        self.assertEqual(put_call[1]["object_key"], "test-event-id-123")
        self.assertEqual(put_call[1]["body"]["event_id"], "test-event-id-123")
        self.assertEqual(put_call[1]["body"]["data"], {"test": "data", "message": "test event"})
        self.assertEqual(put_call[1]["body"]["timestamp"], 1690123456)

        # Verify SearchObjects call
        mock_api_instance.SearchObjects.assert_called_once()
        search_call = mock_api_instance.SearchObjects.call_args
        self.assertEqual(search_call[1]["filter"], "event_id:'test-event-id-123'")
        self.assertEqual(search_call[1]["collection_name"], "event_logs")

    def test_on_post_missing_event_data(self):
        """Test POST request with missing event_data returns error."""
        request = Request()

        response = main.on_post(request)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "missing event_data")

    @patch('main.CustomStorage')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_put_object_error(self, mock_time, mock_uuid, mock_custom_storage_class):
        """Test POST request when PutObject API returns an error."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock CustomStorage instance with error response
        mock_api_instance = MagicMock()
        mock_custom_storage_class.return_value = mock_api_instance
        mock_api_instance.PutObject.return_value = {
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

    @patch('main.CustomStorage')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_exception_handling(self, mock_time, mock_uuid, mock_custom_storage_class):
        """Test POST request when an exception is raised."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock CustomStorage to raise an exception
        mock_custom_storage_class.side_effect = ConnectionError("Connection failed")

        request = Request()
        request.body = {
            "event_data": {"test": "data"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 500)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error saving collection: Connection failed", response.errors[0].message)

    @patch.dict('main.os.environ', {'APP_ID': 'test-app-123'})
    @patch('main.CustomStorage')
    @patch('main.uuid.uuid4')
    @patch('main.time.time')
    def test_on_post_with_app_id_header(self, mock_time, mock_uuid, mock_custom_storage_class):
        """Test POST request with APP_ID environment variable set."""
        # Mock dependencies
        mock_uuid.return_value = MagicMock()
        mock_uuid.return_value.__str__ = MagicMock(return_value="test-event-id-123")
        mock_time.return_value = 1690123456

        # Mock CustomStorage instance
        mock_api_instance = MagicMock()
        mock_custom_storage_class.return_value = mock_api_instance
        mock_api_instance.PutObject.return_value = {
            "status_code": 200,
            "body": {"success": True}
        }
        mock_api_instance.SearchObjects.return_value = {
            "status_code": 200,
            "body": {"resources": []}
        }

        request = Request()
        request.body = {
            "event_data": {"test": "data"}
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 200)

        # Verify that CustomStorage was constructed with ext_headers containing APP_ID
        mock_custom_storage_class.assert_called_once_with(
            ext_headers={"X-CS-APP-ID": "test-app-123"}
        )


if __name__ == "__main__":
    unittest.main()
