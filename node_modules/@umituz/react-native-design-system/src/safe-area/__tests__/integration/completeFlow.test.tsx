/**
 * Integration tests for complete flow
 */
import { describe, it, expect } from '@jest/globals';
import { useSafeAreaInsets } from '../../hooks/useSafeAreaInsets';
import { useStatusBarSafeAreaPadding } from '../../hooks/useStatusBarSafeAreaPadding';
import { useHeaderSafeAreaPadding } from '../../hooks/useHeaderSafeAreaPadding';
import { useContentSafeAreaPadding } from '../../hooks/useContentSafeAreaPadding';

describe('Integration Tests', () => {
  it('should import useSafeAreaInsets', () => {
    expect(useSafeAreaInsets).toBeDefined();
  });

  it('should import useStatusBarSafeAreaPadding', () => {
    expect(useStatusBarSafeAreaPadding).toBeDefined();
  });

  it('should import useHeaderSafeAreaPadding', () => {
    expect(useHeaderSafeAreaPadding).toBeDefined();
  });

  it('should import useContentSafeAreaPadding', () => {
    expect(useContentSafeAreaPadding).toBeDefined();
  });
});