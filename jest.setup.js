// React Native Testing Library v13+ automatically extends expect when imported
// Matchers are set up via the library's index module
import '@testing-library/react-native';

// Clear all mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
