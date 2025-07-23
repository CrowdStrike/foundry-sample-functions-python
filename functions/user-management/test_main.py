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

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_success(self, mock_format_error, mock_validate_email):
        from main import on_post

        # Mock validation to return True for valid email
        mock_validate_email.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {
            "email": "user@example.com"
        }

        response = on_post(request, config=None, logger=mock_logger)

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
        from main import on_post

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

        response = on_post(request, config=None, logger=mock_logger)

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
        from main import on_post

        # Mock validation to return False for None email
        mock_validate_email.return_value = False

        # Mock error response formatting
        mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

        # Create mock logger
        mock_logger = MagicMock()

        request = Request()
        request.body = {}  # No email provided

        response = on_post(request, config=None, logger=mock_logger)

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
        from main import on_post

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

        response = on_post(request, config=None, logger=mock_logger)

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
        from main import on_post

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

                response = on_post(request, config=None, logger=mock_logger)

                self.assertEqual(response.code, 200)
                self.assertEqual(response.body["email"], email)

                # Verify validation was called twice (once for logging, once for condition)
                self.assertEqual(mock_validate_email.call_count, 2)
                mock_validate_email.assert_called_with(email)

                # Verify format_error_response was not called
                mock_format_error.assert_not_called()

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_invalid_email_variations(self, mock_format_error, mock_validate_email):
        from main import on_post

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
                mock_format_error.reset_mock()

                # Mock validation to return False
                mock_validate_email.return_value = False
                mock_format_error.return_value = [{"code": 400, "message": "Invalid email format"}]

                # Create mock logger
                mock_logger = MagicMock()

                request = Request()
                request.body = {
                    "email": email
                }

                response = on_post(request, config=None, logger=mock_logger)

                # Should return error response
                self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

                # Verify validation was called twice (once for logging, once for condition)
                self.assertEqual(mock_validate_email.call_count, 2)
                mock_validate_email.assert_called_with(email)

                # Verify error formatting was called
                mock_format_error.assert_called_once_with("Invalid email format")

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_with_config(self, mock_format_error, mock_validate_email):
        from main import on_post

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

        response = on_post(request, config=config, logger=mock_logger)

        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["email"], "newuser@company.com")

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with("newuser@company.com")

        # Verify logger was called
        self.assertEqual(mock_logger.info.call_count, 2)

    @patch("main.validate_email")
    @patch("main.format_error_response")
    def test_on_post_case_sensitivity(self, mock_format_error, mock_validate_email):
        from main import on_post

        # Mock validation to return True
        mock_validate_email.return_value = True

        # Create mock logger
        mock_logger = MagicMock()

        # Test with mixed case email
        request = Request()
        request.body = {
            "email": "User.Name@EXAMPLE.COM"
        }

        response = on_post(request, config=None, logger=mock_logger)

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
        from main import on_post

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

        response = on_post(request, config=None, logger=mock_logger)

        # Should return error response (assuming validation handles whitespace)
        self.assertEqual(response.errors, [{"code": 400, "message": "Invalid email format"}])

        # Verify validation was called twice (once for logging, once for condition)
        self.assertEqual(mock_validate_email.call_count, 2)
        mock_validate_email.assert_called_with(" user@example.com ")


if __name__ == "__main__":
    unittest.main()
