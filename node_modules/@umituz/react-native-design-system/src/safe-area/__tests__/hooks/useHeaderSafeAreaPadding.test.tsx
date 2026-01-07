/**
 * Tests for useHeaderSafeAreaPadding hook
 */
import { describe, it, expect } from '@jest/globals';
import { useHeaderSafeAreaPadding } from '../../hooks/useHeaderSafeAreaPadding';

describe('useHeaderSafeAreaPadding', () => {
  it('should be defined', () => {
    expect(useHeaderSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    expect(typeof useHeaderSafeAreaPadding).toBe('function');
  });
});