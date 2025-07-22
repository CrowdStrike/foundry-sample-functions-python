// Mock implementation of @crowdstrike/foundry-js
class MockFalconApi {
  constructor() {
    this.data = {
      user: {
        uuid: 'test-user-123',
        username: 'test.user@company.com'
      }
    };
  }

  async connect() {
    return Promise.resolve();
  }

  collection(options) {
    return {
      read: jest.fn(),
      write: jest.fn(),
      delete: jest.fn(),
      search: jest.fn(),
      list: jest.fn()
    };
  }
}

const FalconApi = MockFalconApi;
export default FalconApi;

// Also provide named export if needed
export { MockFalconApi as FalconApi };
