"""Test module for the hello function handler."""

import importlib
import unittest
from unittest.mock import patch

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

    def test_on_post_success(self):
        """Test successful POST request with valid name in body."""
        request = Request()
        request.body = {
            "name": "Test User"
        }

        response = main.on_post(request)
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body["greeting"], "Hello Test User! It is nice to see you.")

    def test_on_post_missing_name(self):
        """Test POST request with missing name in body returns error."""
        request = Request()

        response = main.on_post(request)
        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, "missing name from request body")


if __name__ == "__main__":
    unittest.main()
