/**
 * Tests for useStatusBarSafeAreaPadding hook
 */
import { describe, it, expect } from '@jest/globals';
import { useStatusBarSafeAreaPadding } from '../../hooks/useStatusBarSafeAreaPadding';

describe('useStatusBarSafeAreaPadding', () => {
  it('should be defined', () => {
    expect(useStatusBarSafeAreaPadding).toBeDefined();
  });

  it('should return function', () => {
    expect(typeof useStatusBarSafeAreaPadding).toBe('function');
  });
});