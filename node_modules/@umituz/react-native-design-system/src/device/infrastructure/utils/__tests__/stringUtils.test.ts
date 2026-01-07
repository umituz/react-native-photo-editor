/**
 * String Utils Tests
 */

import { cleanModelName, extractIdPart, generateRandomId, getPlatformPrefix } from '../stringUtils';

describe('String Utils', () => {
  describe('cleanModelName', () => {
    it('should remove special characters from model name', () => {
      const result = cleanModelName('iPhone 14 Pro Max');
      expect(result).toBe('iPhone14ProMax');
    });

    it('should handle null/undefined input', () => {
      expect(cleanModelName(null)).toBe('Device');
      expect(cleanModelName(undefined)).toBe('Device');
    });

    it('should handle empty string', () => {
      const result = cleanModelName('');
      expect(result).toBe('Device');
    });

    it('should handle model with only special characters', () => {
      const result = cleanModelName('!@#$%^&*()');
      expect(result).toBe('Device');
    });

    it('should preserve alphanumeric characters', () => {
      const result = cleanModelName('SM-G998B');
      expect(result).toBe('SMG998B');
    });
  });

  describe('extractIdPart', () => {
    it('should extract last N characters from device ID', () => {
      const deviceId = '12345678-1234-1234-1234-123456789012';
      const result = extractIdPart(deviceId, 6);
      expect(result).toBe('789012');
    });

    it('should use default length of 6 when not specified', () => {
      const deviceId = '12345678-1234-1234-1234-123456789012';
      const result = extractIdPart(deviceId);
      expect(result).toBe('789012');
    });

    it('should handle null device ID by generating random ID', () => {
      const result = extractIdPart(null, 6);
      expect(result).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('should handle empty device ID by generating random ID', () => {
      const result = extractIdPart('', 6);
      expect(result).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('should handle device ID shorter than requested length', () => {
      const deviceId = 'ABC';
      const result = extractIdPart(deviceId, 6);
      expect(result).toBe('ABC');
    });

    it('should convert to uppercase', () => {
      const deviceId = 'abcdef';
      const result = extractIdPart(deviceId, 3);
      expect(result).toBe('DEF');
    });
  });

  describe('generateRandomId', () => {
    it('should generate random ID with default length', () => {
      const result = generateRandomId();
      expect(result).toMatch(/^[A-Z0-9]{6}$/);
    });

    it('should generate random ID with specified length', () => {
      const result = generateRandomId(10);
      expect(result).toMatch(/^[A-Z0-9]{10}$/);
    });

    it('should generate different IDs on multiple calls', () => {
      const id1 = generateRandomId(6);
      const id2 = generateRandomId(6);
      expect(id1).not.toBe(id2);
    });

    it('should handle length of 1', () => {
      const result = generateRandomId(1);
      expect(result).toMatch(/^[A-Z0-9]{1}$/);
    });
  });

  describe('getPlatformPrefix', () => {
    it('should return iOS for ios platform', () => {
      const result = getPlatformPrefix('ios');
      expect(result).toBe('iOS');
    });

    it('should return Android for android platform', () => {
      const result = getPlatformPrefix('android');
      expect(result).toBe('Android');
    });

    it('should return Device for unknown platform', () => {
      const result = getPlatformPrefix('windows');
      expect(result).toBe('Device');
    });

    it('should return Device for empty string', () => {
      const result = getPlatformPrefix('');
      expect(result).toBe('Device');
    });

    it('should be case sensitive', () => {
      expect(getPlatformPrefix('IOS')).toBe('Device');
      expect(getPlatformPrefix('ANDROID')).toBe('Device');
    });
  });
});