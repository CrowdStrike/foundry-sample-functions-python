"""Test module for the host-info function handler."""

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

    @patch("main.validate_host_id")
    @patch("main.format_error_response")
    def test_on_post_success(self, mock_format_error, mock_validate_host_id):
        """Test successful POST request with valid host_id in body."""
        # Mock validation to return True for valid host ID
        mock_validate_host_id.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "host_id": "valid-host-123"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["host"], "valid-host-123")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_host_id.call_count, 2)
        mock_validate_host_id.assert_called_with("valid-host-123")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Host ID: valid-host-123")
        mock_logger.info.assert_any_call("Is valid? True")

        # Verify format_error_response was not called
        mock_format_error.assert_not_called()

    @patch("main.validate_host_id")
    @patch("main.format_error_response")
    def test_on_post_invalid_host_id(self, mock_format_error, mock_validate_host_id):
        """Test POST request with invalid host_id returns error."""
        # Mock validation to return False for invalid host ID
        mock_validate_host_id.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid host ID format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "host_id": "invalid-host"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response (default code is likely 400)
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid host ID format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_host_id.call_count, 2)
        mock_validate_host_id.assert_called_with("invalid-host")

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid host ID format")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Host ID: invalid-host")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_host_id")
    @patch("main.format_error_response")
    def test_on_post_missing_host_id(self, mock_format_error, mock_validate_host_id):
        """Test POST request with missing host_id returns error."""
        # Mock validation to return False for None host ID
        mock_validate_host_id.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid host ID format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {}  # No host_id provided

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid host ID format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_host_id.call_count, 2)
        mock_validate_host_id.assert_called_with(None)

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid host ID format")

        # Verify logger was called with None
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Host ID: None")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_host_id")
    @patch("main.format_error_response")
    def test_on_post_empty_host_id(self, mock_format_error, mock_validate_host_id):
        """Test POST request with empty host_id returns error."""
        # Mock validation to return False for empty string
        mock_validate_host_id.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid host ID format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "host_id": ""
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid host ID format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_host_id.call_count, 2)
        mock_validate_host_id.assert_called_with("")

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid host ID format")

        # Verify logger was called with empty string
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Host ID: ")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_host_id")
    @patch("main.format_error_response")
    def test_on_post_with_config(self, _mock_format_error, mock_validate_host_id):
        """Test POST request with config parameter."""
        # Mock validation to return True
        mock_validate_host_id.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        # Test with config parameter
        config = {"some_setting": "value"}

        request = Request()
        request.body = {
            "host_id": "test-host-456"
        }

        response = main.on_post(request, _config=config, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["host"], "test-host-456")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_host_id.call_count, 2)
        mock_validate_host_id.assert_called_with("test-host-456")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)


if __name__ == "__main__":
    unittest.main()
