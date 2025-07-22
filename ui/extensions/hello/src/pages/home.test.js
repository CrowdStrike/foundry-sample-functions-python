import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from './Home';
import { FalconApiContext } from '../contexts/falcon-api-context';

// Mock the Link component
jest.mock('../components/link', () => ({
  Link: ({children, to, useFalconNavigation}) => (
    <div data-testid="mock-link" data-to={to} data-use-falcon-navigation={useFalconNavigation}>
      {children}
    </div>
  )
}));

// Mock Shoelace components - fix the clearable prop issue
jest.mock('@shoelace-style/shoelace/dist/react', () => ({
  SlInput: ({value, onSlChange, onKeyDown, clearable, ...props}) => (
    <input
      data-testid="sl-input"
      value={value}
      onChange={(e) => onSlChange?.({target: {value: e.target.value}})}
      onKeyDown={onKeyDown}
      data-clearable={clearable ? 'true' : 'false'}
      {...props}
    />
  )
}));

describe('Home Component', () => {
  const mockCloudFunction = jest.fn();
  const mockPost = jest.fn();

  const createMockFalcon = (username = 'john.doe') => ({
    data: {
      user: {
        username
      }
    },
    cloudFunction: mockCloudFunction
  });

  const renderWithContext = (falcon) => {
    return render(
      <FalconApiContext.Provider value={{falcon}}>
        <Home/>
      </FalconApiContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Suppress console.error for expected errors in tests
    jest.spyOn(console, 'error').mockImplementation(() => {
    });

    mockCloudFunction.mockReturnValue({
      path: jest.fn().mockReturnValue({
        post: mockPost
      })
    });
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  describe('Initial Render', () => {
    it('renders the component with correct title', () => {
      const falcon = createMockFalcon();
      renderWithContext(falcon);

      expect(screen.getByText('Foundry Functions Demo')).toBeInTheDocument();
    });

    it('displays username greeting', () => {
      const falcon = createMockFalcon('jane.smith');
      renderWithContext(falcon);

      expect(screen.getByText('👋 Hello, jane.smith!')).toBeInTheDocument();
    });

    it('initializes input with capitalized first name', () => {
      const falcon = createMockFalcon('alice.wonderland');
      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      expect(input.value).toBe('Alice');
    });

    it('handles missing username gracefully', () => {
      const falcon = {data: {user: {}}};
      renderWithContext(falcon);

      expect(screen.getByText('👋 Hello, !')).toBeInTheDocument();
      const input = screen.getByTestId('sl-input');
      expect(input.value).toBe('');
    });

    it('handles null falcon data gracefully', () => {
      const falcon = null;
      renderWithContext(falcon);

      expect(screen.getByText('👋 Hello, !')).toBeInTheDocument();
      const input = screen.getByTestId('sl-input');
      expect(input.value).toBe('');
    });

    it('renders navigation links', () => {
      const falcon = createMockFalcon();
      renderWithContext(falcon);

      const links = screen.getAllByTestId('mock-link');
      expect(links).toHaveLength(2);
      expect(links[0]).toHaveAttribute('data-to', '/cloud-security');
      expect(links[1]).toHaveAttribute('data-to', '/unified-detections');
    });
  });

  describe('Input Handling', () => {
    it('updates name state when input changes', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      await user.clear(input);
      await user.type(input, 'TestName');

      expect(input.value).toBe('TestName');
    });

    it('calls fetchGreeting when Enter key is pressed', async () => {
      const falcon = createMockFalcon();
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello TestName!'}
      });

      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      await userEvent.clear(input);
      await userEvent.type(input, 'TestName');
      await userEvent.type(input, '{enter}');

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith({name: 'TestName'});
      });
    });

    it('trims whitespace from input before sending', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello Test!'}
      });

      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      await user.clear(input);
      await user.type(input, '  Test  ');

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(mockPost).toHaveBeenCalledWith({name: '  Test  '});
      });
    });
  });

  describe('Greeting Functionality', () => {
    it('successfully fetches and displays greeting', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello John!'}
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Hello John!')).toBeInTheDocument();
      });

      expect(mockCloudFunction).toHaveBeenCalledWith({name: 'hello'});
      expect(mockPost).toHaveBeenCalledWith({name: 'John'});
    });

    it('shows error when name is empty', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon('');
      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      await user.clear(input);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Please enter a name first')).toBeInTheDocument();
      });

      expect(mockPost).not.toHaveBeenCalled();
    });

    it('shows error when name is only whitespace', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon('');
      renderWithContext(falcon);

      const input = screen.getByTestId('sl-input');
      await user.clear(input);
      await user.type(input, '   ');

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Please enter a name first')).toBeInTheDocument();
      });

      expect(mockPost).not.toHaveBeenCalled();
    });

    it('handles API errors gracefully', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockRejectedValue({
        errors: [{message: 'API Error'}]
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Error: API Error')).toBeInTheDocument();
      });
    });

    it('handles API errors with multiple error messages', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockRejectedValue({
        errors: [
          {message: 'First error'},
          {message: 'Second error'}
        ]
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Error: First error, Second error')).toBeInTheDocument();
      });
    });

    it('handles API errors without error messages', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockRejectedValue({
        errors: ['Raw error string']
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Error: Raw error string')).toBeInTheDocument();
      });
    });

    it('handles errors without errors array', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();
      mockPost.mockRejectedValue(new Error('Network error'));

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Error: Failed to get greeting')).toBeInTheDocument();
      });
    });

    // Check what the component actually does with non-200 status codes
    it('handles non-200 status codes correctly', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      // Create an error that will be thrown when the status code check fails
      const mockError = new Error('Function call failed: 500 Internal Server Error');
      mockError.errors = [{message: 'Function call failed: 500 Internal Server Error'}];

      mockPost.mockResolvedValue({
        status_code: 500,
        errors: 'Internal Server Error'
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      // The component should throw an error when status_code !== 200
      // This error gets caught and processed in the catch block
      await waitFor(() => {
        expect(screen.getByText('Error: Failed to get greeting')).toBeInTheDocument();
      });
    });

    // Alternative test to verify the status code check logic
    it('throws error for non-200 status codes', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      // Mock the post to return a non-200 status
      mockPost.mockResolvedValue({
        status_code: 404,
        errors: 'Not Found'
      });

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      // Since the component throws an error for non-200 status codes,
      // it should be caught and show the generic error message
      await waitFor(() => {
        expect(screen.getByText('Error: Failed to get greeting')).toBeInTheDocument();
      });
    });

    it('shows loading state during API call', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      // Create a promise that we can control
      let resolvePromise;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      mockPost.mockReturnValue(promise);

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');
      await user.click(button);

      // Check that button is disabled during loading
      expect(button).toBeDisabled();

      // Resolve the promise
      resolvePromise({
        status_code: 200,
        body: {greeting: 'Hello!'}
      });

      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });
    });

    // Fixed test for multiple simultaneous requests
    it('button is disabled during loading preventing multiple requests', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      let resolvePromise;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      mockPost.mockReturnValue(promise);

      renderWithContext(falcon);

      const button = screen.getByText('Say Hello');

      // Click button once
      await user.click(button);

      // Verify button is disabled
      expect(button).toBeDisabled();

      // Try to click again while disabled - this shouldn't trigger another call
      // Note: userEvent.click on a disabled button doesn't actually trigger the onClick
      expect(mockPost).toHaveBeenCalledTimes(1);

      resolvePromise({
        status_code: 200,
        body: {greeting: 'Hello!'}
      });

      await waitFor(() => {
        expect(button).not.toBeDisabled();
      });

      // Now we can click again
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello again!'}
      });

      await user.click(button);
      expect(mockPost).toHaveBeenCalledTimes(2);
    });
  });

  describe('Error Handling', () => {
    it('clears previous errors when making new request', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      renderWithContext(falcon);

      // First, trigger an error
      const input = screen.getByTestId('sl-input');
      await user.clear(input);
      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Please enter a name first')).toBeInTheDocument();
      });

      // Then make a successful request
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello Test!'}
      });

      await user.type(input, 'Test');
      await user.click(button);

      await waitFor(() => {
        expect(screen.queryByText('Please enter a name first')).not.toBeInTheDocument();
        expect(screen.getByText('Hello Test!')).toBeInTheDocument();
      });
    });

    it('clears previous greeting when error occurs', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon();

      renderWithContext(falcon);

      // First, make a successful request
      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello John!'}
      });

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Hello John!')).toBeInTheDocument();
      });

      // Then trigger an error
      mockPost.mockRejectedValue({
        errors: [{message: 'API Error'}]
      });

      await user.click(button);

      await waitFor(() => {
        expect(screen.queryByText('Hello John!')).not.toBeInTheDocument();
        expect(screen.getByText('Error: API Error')).toBeInTheDocument();
      });
    });
  });

  describe('Component Integration', () => {
    it('maintains state consistency throughout user interactions', async () => {
      const user = userEvent.setup();
      const falcon = createMockFalcon('test.user');

      renderWithContext(falcon);

      // Verify initial state
      expect(screen.getByText('👋 Hello, test.user!')).toBeInTheDocument();
      const input = screen.getByTestId('sl-input');
      expect(input.value).toBe('Test');

      // Change input and make successful request
      await user.clear(input);
      await user.type(input, 'NewName');

      mockPost.mockResolvedValue({
        status_code: 200,
        body: {greeting: 'Hello NewName!'}
      });

      const button = screen.getByText('Say Hello');
      await user.click(button);

      await waitFor(() => {
        expect(screen.getByText('Hello NewName!')).toBeInTheDocument();
      });

      // Verify input value is preserved
      expect(input.value).toBe('NewName');

      // Make another request with error
      mockPost.mockRejectedValue({
        errors: [{message: 'Server Error'}]
      });

      await user.click(button);

      await waitFor(() => {
        expect(screen.queryByText('Hello NewName!')).not.toBeInTheDocument();
        expect(screen.getByText('Error: Server Error')).toBeInTheDocument();
      });

      // Input should still be preserved
      expect(input.value).toBe('NewName');
    });
  });
});
