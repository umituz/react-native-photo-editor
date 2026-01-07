/**
 * Tests for useSafeAreaInsets hook
 */
import { describe, it, expect } from '@jest/globals';
import { useSafeAreaInsets } from '../../hooks/useSafeAreaInsets';

describe('useSafeAreaInsets', () => {
  it('should be defined', () => {
    expect(useSafeAreaInsets).toBeDefined();
  });

  it('should return function', () => {
    expect(typeof useSafeAreaInsets).toBe('function');
  });
});