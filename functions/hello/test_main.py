import unittest
from unittest.mock import patch

from crowdstrike.foundry.function import Request

def mock_handler(*args, **kwargs):
    def identity(func):
        return func
    return identity

class FnTestCase(unittest.TestCase):
    def setUp(self):
        patcher = patch('crowdstrike.foundry.function.Function.handler', new=mock_handler)
        self.addCleanup(patcher.stop)
        self.handler_patch = patcher.start()

        import importlib
        import main
        importlib.reload(main)

    def test_on_post_success(self):
        from main import on_post
        request = Request()
        request.body = {
            "name": "Test User"
        }

        response = on_post(request)
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body['greeting'], 'Hello Test User! It is nice to see you.')

    def test_on_post_missing_name(self):
        from main import on_post
        request = Request()

        response = on_post(request)
        self.assertEqual(response.code, 400)
        self.assertEqual(len(response.errors), 1)
        self.assertEqual(response.errors[0].message, 'missing name from request body')

if __name__ == '__main__':
    unittest.main()
