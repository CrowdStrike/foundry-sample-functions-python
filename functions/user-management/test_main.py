"""Test module for the user-management function handler."""

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

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_success(self, mock_format_error, mock_validate_email):
        """Test successful POST request with valid email in body."""
        # Mock validation to return True for valid email
        mock_validate_email.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "email": "user@example.com"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["email"], "user@example.com")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("user@example.com")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Email: user@example.com")
        mock_logger.info.assert_any_call("Is valid? True")

        # Verify format_error_response was not called
        mock_format_error.assert_not_called()

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_invalid_email(self, mock_format_error, mock_validate_email):
        """Test POST request with invalid email returns error."""
        # Mock validation to return False for invalid email
        mock_validate_email.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "email": "invalid-email"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("invalid-email")

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid email format")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Email: invalid-email")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_missing_email(self, mock_format_error, mock_validate_email):
        """Test POST request with missing email returns error."""
        # Mock validation to return False for None email
        mock_validate_email.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {}  # No email provided

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with(None)

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid email format")

        # Verify logger was called with None
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Email: None")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_empty_email(self, mock_format_error, mock_validate_email):
        """Test POST request with empty email returns error."""
        # Mock validation to return False for empty string
        mock_validate_email.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "email": ""
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("")

        # Verify error formatting was called
        mock_format_error.assert_called_once_with("Invalid email format")

        # Verify logger was called with empty string
        self.assertEqual(mock_logger.info.call_count, 2)
        mock_logger.info.assert_any_call("Email: ")
        mock_logger.info.assert_any_call("Is valid? False")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_valid_email_variations(self, mock_format_error, mock_validate_email):
        """Test POST request with various valid email formats."""
        # Test various valid email formats
        valid_emails = [
            "test@example.com",
            "user.name@domain.co.uk",
            "admin+tag@company.org",
            "123@numbers.net"
        ]

        for email in valid_emails:
            with self.subTest(email=email):
                # Reset mocks for each iteration
                mock_validate_email.reset_mock()
                mock_format_error.reset_mock()

                # Mock validation to return True
                mock_validate_email.return_value = True

                # Create mock logger
                mock_logger = MagicMock()

                request = Request()
                request.body = {
                    "email": email
                }

                response = main.on_post(request, _config=None, logger=mock_logger)

                self.assertEqual(response.code, 200)
                self.assertEqual(response.body["email"], email)

                # Verify validation was called twice (once for logging, once for condition)
                self.assertEqual(mock_validate_email.call_count, 2)
                mock_validate_email.assert_called_with(email)

                # Verify format_error_response was not called
                mock_format_error.assert_not_called()

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_invalid_email_variations(self, _mock_format_error, mock_validate_email):
        """Test POST request with various invalid email formats."""
        # Test various invalid email formats
        invalid_emails = [
            "not-an-email",
            "@domain.com",
            "user@",
            "user..name@domain.com",
            "user@domain",
            "user name@domain.com"
        ]

        for email in invalid_emails:
            with self.subTest(email=email):
                # Reset mocks for each iteration
                mock_validate_email.reset_mock()
                _mock_format_error.reset_mock()

                # Mock validation to return False
                mock_validate_email.return_value = False
                _mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

                # Create mock logger
                mock_logger = MagicMock()

                request = Request()
                request.body = {
                    "email": email
                }

                response = main.on_post(request, _config=None, logger=mock_logger)

                # Should return error response
                self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

                # Verify validation was called twice (once for logging, once for condition)
                self.assertEqual(mock_validate_email.call_count, 2)
                mock_validate_email.assert_called_with(email)

                # Verify error formatting was called
                _mock_format_error.assert_called_once_with("Invalid email format")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_with_config(self, _mock_format_error, mock_validate_email):
        """Test POST request with config parameter."""
        # Mock validation to return True
        mock_validate_email.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        # Test with config parameter
        config = {"user_domain": "company.com", "max_users": 1000}

        request = Request()
        request.body = {
            "email": "newuser@company.com"
        }

        response = main.on_post(request, _config=config, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["email"], "newuser@company.com")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("newuser@company.com")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_case_sensitivity(self, _mock_format_error, mock_validate_email):
        """Test POST request with mixed case email."""
        # Mock validation to return True
        mock_validate_email.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        # Test with mixed case email
        request = Request()
        request.body = {
            "email": "User.Name@EXAMPLE.COM"
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["email"], "User.Name@EXAMPLE.COM")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("User.Name@EXAMPLE.COM")

        # Verify logger was called with the exact email
        mock_logger.info.assert_any_call("Email: User.Name@EXAMPLE.COM")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_whitespace_handling(self, mock_format_error, mock_validate_email):
        """Test POST request with email containing whitespace."""
        # Mock validation to return False for email with whitespace
        mock_validate_email.return_value = False
        mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

        # Create mock logger
        mock_logger = MagicMock()

        # Test with email containing whitespace
        request = Request()
        request.body = {
            "email": " user@example.com "
        }

        response = main.on_post(request, _config=None, logger=mock_logger)

        # Should return error response (assuming validation handles whitespace)
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with(" user@example.com ")


if __name__ == "__main__":
    unittest.main()
