"""Test module for the host-details function handler."""

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

    @patch("main.Hosts")
    def test_on_post_success(self, mock_hosts_class):
        """Test successful POST request with valid host_id in body."""
        # Mock the Hosts instance and its response
        mock_hosts_instance = MagicMock()
        mock_hosts_class.return_value = mock_hosts_instance
        mock_hosts_instance.get_device_details.return_value = {
            "status_code": 200,
            "body": {
                "resources": [{
                    "device_id": "test-host-123",
                    "hostname": "test-host",
                    "platform_name": "Windows"
                }]
            }
        }

        request = Request()
        request.body = {
            "host_id": "test-host-123"
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 200)
        self.assertIn("host_details", response.body)
        self.assertEqual(response.body["host_details"]["device_id"], "test-host-123")
        mock_hosts_instance.get_device_details.assert_called_once_with(ids="test-host-123")

    def test_on_post_missing_host_id(self):
        """Test POST request with missing host_id in body returns error."""
        request = Request()

        response = main.on_post(request)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "missing host_id from request body")

    @patch("main.Hosts")
    def test_on_post_api_error(self, mock_hosts_class):
        """Test POST request when API returns an error."""
        # Mock the Hosts instance to return an error
        mock_hosts_instance = MagicMock()
        mock_hosts_class.return_value = mock_hosts_instance
        mock_hosts_instance.get_device_details.return_value = {
            "status_code": 404,
            "body": {"errors": [{"message": "Host not found"}]}
        }

        request = Request()
        request.body = {
            "host_id": "nonexistent-host"
        }

        response = main.on_post(request)

        self.assertEqual(response.code, 404)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error retrieving host:", response.errors[0].message)
        mock_hosts_instance.get_device_details.assert_called_once_with(ids="nonexistent-host")


if __name__ == "__main__":
    unittest.main()
