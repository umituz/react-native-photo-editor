/**
 * Tests for SafeAreaProvider component
 */
import { describe, it, expect } from '@jest/globals';
import { SafeAreaProvider, useSafeAreaConfig } from '../../components/SafeAreaProvider';

describe('SafeAreaProvider', () => {
  it('should be defined', () => {
    expect(SafeAreaProvider).toBeDefined();
  });

  it('should have useSafeAreaConfig export', () => {
    expect(useSafeAreaConfig).toBeDefined();
  });
});