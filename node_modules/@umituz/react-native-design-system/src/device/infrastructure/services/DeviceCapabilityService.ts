/**
 * Device Capability Service
 *
 * Single Responsibility: Check device capabilities and features
 * Follows SOLID principles - only handles capability checks
 */

import { Platform } from 'react-native';
import { DeviceType } from '../../domain/entities/Device';
import { DeviceInfoService } from './DeviceInfoService';

/**
 * Service for checking device capabilities
 */
export class DeviceCapabilityService {
  /**
   * Check if device supports specific features
   */
  static async getDeviceCapabilities(): Promise<{
    isDevice: boolean;
    isTablet: boolean;
    hasNotch: boolean;
    totalMemoryGB: number | null;
  }> {
    const info = await DeviceInfoService.getDeviceInfo();

    return {
      isDevice: info.isDevice,
      isTablet: info.deviceType === DeviceType.TABLET,
      hasNotch: await this.hasNotch(),
      totalMemoryGB: info.totalMemory
        ? info.totalMemory / (1024 * 1024 * 1024)
        : null,
    };
  }

  /**
   * Check if device has notch/dynamic island
   */
  static async hasNotch(): Promise<boolean> {
    try {
      if (Platform.OS !== 'ios') {
        return false;
      }

      const info = await DeviceInfoService.getDeviceInfo();
      const modelName = info.modelName?.toLowerCase() ?? '';

      // iPhone X and newer (with notch or dynamic island)
      return (
        modelName.includes('iphone x') ||
        modelName.includes('iphone 1') || // 11, 12, 13, 14, 15
        modelName.includes('pro')
      );
    } catch {
      return false;
    }
  }
}

