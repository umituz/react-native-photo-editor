/**
 * Tests for useContentSafeAreaPadding hook
 */
import { describe, it, expect } from '@jest/globals';
import { useContentSafeAreaPadding } from '../../hooks/useContentSafeAreaPadding';

describe('useContentSafeAreaPadding', () => {
  it('should be defined', () => {
    expect(useContentSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    expect(typeof useContentSafeAreaPadding).toBe('function');
  });
});