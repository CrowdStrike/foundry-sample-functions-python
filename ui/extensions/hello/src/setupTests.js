import '@testing-library/jest-dom';

// Mock Shoelace web components
global.customElements = {
  define: jest.fn(),
  get: jest.fn(),
  whenDefined: jest.fn().mockResolvedValue(),
};

// Mock window.customElements for Shoelace components
Object.defineProperty(window, 'customElements', {
  value: global.customElements,
  writable: true,
});
