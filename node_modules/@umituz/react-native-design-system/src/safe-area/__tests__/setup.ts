/**
 * Jest setup file
 */

// Define __DEV__ for tests
(global as any).__DEV__ = true;

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({
    top: 44,
    bottom: 34,
    left: 0,
    right: 0,
  }),
}));

// Mock SafeAreaProvider to avoid JSX issues
jest.mock('../components/SafeAreaProvider', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaConfig: () => ({
    minHeaderPadding: 0,
    minContentPadding: 0,
    minStatusBarPadding: 0,
    additionalPadding: 0,
    iosStatusBarUsesSafeArea: true,
  }),
}), { virtual: true });

// Mock Platform
jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
    select: (obj: Record<string, any>) => obj.ios,
  },
}));

// Mock performance API for performance tests
global.performance = {
  ...global.performance,
  now: jest.fn(() => Date.now()),
};

// Simple test to make test suite valid
describe('setup', () => {
  it('should define __DEV__', () => {
    expect((global as any).__DEV__).toBe(true);
  });
});