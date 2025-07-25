import unittest
from unittest.mock import patch, MagicMock

from crowdstrike.foundry.function import Request


def mock_handler(*args, **kwargs):
    def identity(func):
        return func

    return identity


class FnTestCase(unittest.TestCase):
    def setUp(self):
        patcher = patch("crowdstrike.foundry.function.Function.handler", new=mock_handler)
        self.addCleanup(patcher.stop)
        self.handler_patch = patcher.start()

        import importlib
        import main
        importlib.reload(main)

    @patch("main.Hosts")
    def test_on_post_success(self, mock_hosts_class):
        from main import on_post

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

        response = on_post(request)

        self.assertEqual(response.code, 200)
        self.assertIn("host_details", response.body)
        self.assertEqual(response.body["host_details"]["device_id"], "test-host-123")
        mock_hosts_instance.get_device_details.assert_called_once_with(ids="test-host-123")

    def test_on_post_missing_host_id(self):
        from main import on_post
        request = Request()

        response = on_post(request)

        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "missing host_id from request body")

    @patch("main.Hosts")
    def test_on_post_api_error(self, mock_hosts_class):
        from main import on_post

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

        response = on_post(request)

        self.assertEqual(response.code, 404)
        self.assertEqual(len(response.errors), 1)
        self.assertIn("Error retrieving host:", response.errors[0].message)
        mock_hosts_instance.get_device_details.assert_called_once_with(ids="nonexistent-host")


if __name__ == "__main__":
    unittest.main()
