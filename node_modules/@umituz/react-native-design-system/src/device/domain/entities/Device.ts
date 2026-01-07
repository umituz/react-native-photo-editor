/**
 * Device Domain - Core Entities
 *
 * This file defines core types and interfaces for device information.
 * All types are self-contained - no external dependencies for types.
 *
 * @domain device
 * @layer domain/entities
 */

/**
 * Device type enumeration (matches expo-device values)
 */
export enum DeviceType {
  UNKNOWN = 0,
  PHONE = 1,
  TABLET = 2,
  DESKTOP = 3,
  TV = 4,
}

/**
 * Device information interface
 */
export interface DeviceInfo {
  // Device identification
  brand: string | null;
  manufacturer: string | null;
  modelName: string | null;
  modelId: string | null;
  deviceName: string | null;
  deviceYearClass: number | null;

  // Device type
  deviceType: DeviceType | null;
  isDevice: boolean;

  // OS information
  osName: string | null;
  osVersion: string | null;
  osBuildId: string | null;
  platformApiLevel: number | null;

  // Memory
  totalMemory: number | null;

  // Platform
  platform: 'ios' | 'android' | 'web';

  // Localization
  timezone: string | null;
  region: string | null;
}

/**
 * Application information interface
 */
export interface ApplicationInfo {
  // App identification
  applicationName: string;
  applicationId: string;
  nativeApplicationVersion: string | null;
  nativeBuildVersion: string | null;

  // Installation
  installTime: Date | null;
  lastUpdateTime: Date | null;

  // Platform-specific
  androidId: string | null; // Android only
  iosIdForVendor: string | null; // iOS only
}

/**
 * Combined device and app info
 */
export interface SystemInfo {
  device: DeviceInfo;
  application: ApplicationInfo;
  timestamp: number;
  userId?: string;
}

/**
 * Device constants
 */
export const DEVICE_CONSTANTS = {
  DEVICE_TYPE: {
    UNKNOWN: 0,
    PHONE: 1,
    TABLET: 2,
    DESKTOP: 3,
    TV: 4,
  },
  PLATFORM: {
    IOS: 'ios',
    ANDROID: 'android',
    WEB: 'web',
  },
} as const;

/**
 * Device utilities
 */
export class DeviceUtils {
  /**
   * Check if running on physical device (not simulator/emulator)
   */
  static isPhysicalDevice(isDevice: boolean): boolean {
    return isDevice;
  }

  /**
   * Get device display name
   */
  static getDeviceDisplayName(info: DeviceInfo): string {
    if (info.deviceName) {
      return info.deviceName;
    }

    if (info.modelName) {
      return info.modelName;
    }

    if (info.brand && info.manufacturer) {
      return `${info.brand} ${info.manufacturer}`;
    }

    return 'Unknown Device';
  }

  /**
   * Get OS display string
   */
  static getOSDisplayString(info: DeviceInfo): string {
    if (info.osName && info.osVersion) {
      return `${info.osName} ${info.osVersion}`;
    }

    if (info.osName) {
      return info.osName;
    }

    return 'Unknown OS';
  }

  /**
   * Get app version string
   */
  static getAppVersionString(info: ApplicationInfo): string {
    if (info.nativeApplicationVersion && info.nativeBuildVersion) {
      return `${info.nativeApplicationVersion} (${info.nativeBuildVersion})`;
    }

    if (info.nativeApplicationVersion) {
      return info.nativeApplicationVersion;
    }

    return 'Unknown Version';
  }

  /**
   * Check if device meets minimum requirements
   */
  static meetsMinimumRequirements(info: DeviceInfo, minMemoryGB: number = 1): {
    meets: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];

    if (!info.isDevice) {
      reasons.push('Running on simulator/emulator');
    }

    if (info.totalMemory) {
      const memoryGB = info.totalMemory / (1024 * 1024 * 1024);
      if (memoryGB < minMemoryGB) {
        reasons.push(`Insufficient memory: ${memoryGB.toFixed(2)}GB (minimum: ${minMemoryGB}GB)`);
      }
    }

    if (info.deviceYearClass && info.deviceYearClass < 2018) {
      reasons.push(`Device too old: ${info.deviceYearClass} (minimum: 2018)`);
    }

    return {
      meets: reasons.length === 0,
      reasons,
    };
  }

  /**
   * Get device tier (low/mid/high) based on specs
   */
  static getDeviceTier(info: DeviceInfo): 'low' | 'mid' | 'high' {
    if (info.deviceYearClass) {
      if (info.deviceYearClass >= 2022) return 'high';
      if (info.deviceYearClass >= 2019) return 'mid';
      return 'low';
    }

    if (info.totalMemory) {
      const memoryGB = info.totalMemory / (1024 * 1024 * 1024);
      if (memoryGB >= 6) return 'high';
      if (memoryGB >= 3) return 'mid';
      return 'low';
    }

    return 'mid';
  }
}
