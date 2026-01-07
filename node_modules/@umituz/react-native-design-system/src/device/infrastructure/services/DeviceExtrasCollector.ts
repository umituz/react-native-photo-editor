/**
 * Device Extras Collector
 *
 * Collects device and application information for user documents.
 * Used with @umituz/react-native-auth's UserDocumentService.
 *
 * @domain device
 * @layer infrastructure/services
 */

import { Dimensions } from 'react-native';
import * as Localization from 'expo-localization';
import { DeviceInfoService } from './DeviceInfoService';
import { ApplicationInfoService } from './ApplicationInfoService';
import { PersistentDeviceIdService } from './PersistentDeviceIdService';

/**
 * Device extras for user documents
 * Compatible with UserDocumentExtras from @umituz/react-native-auth
 * Index signature added for Record<string, unknown> compatibility
 */
export interface DeviceExtras {
  [key: string]: string | number | boolean | undefined;
  deviceId?: string;
  platform?: string;
  deviceModel?: string;
  deviceBrand?: string;
  deviceName?: string;
  deviceType?: number;
  deviceYearClass?: number;
  isDevice?: boolean;
  osName?: string;
  osVersion?: string;
  osBuildId?: string;
  totalMemory?: number;
  appVersion?: string;
  buildNumber?: string;
  locale?: string;
  region?: string;
  timezone?: string;
  screenWidth?: number;
  screenHeight?: number;
  screenScale?: number;
  fontScale?: number;
  isLandscape?: boolean;
}

/**
 * Get device locale code
 */
function getDeviceLocale(): string | undefined {
  try {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      const locale = locales[0];
      return locale.languageTag || undefined;
    }
    return undefined;
  } catch {
    return undefined;
  }
}

/**
 * Collect device extras for user documents
 *
 * @example
 * ```typescript
 * import { collectDeviceExtras } from '@umituz/react-native-design-system';
 * import { initializeAuth } from '@umituz/react-native-auth';
 *
 * await initializeAuth({
 *   userCollection: 'users',
 *   collectExtras: collectDeviceExtras,
 * });
 * ```
 */
export async function collectDeviceExtras(): Promise<DeviceExtras> {
  try {
    const [deviceInfo, appInfo, deviceId] = await Promise.all([
      DeviceInfoService.getDeviceInfo(),
      ApplicationInfoService.getApplicationInfo(),
      PersistentDeviceIdService.getDeviceId(),
    ]);

    const locale = getDeviceLocale();
    const { width, height, scale, fontScale } = Dimensions.get('screen');

    return {
      deviceId,
      platform: deviceInfo.platform,
      deviceModel: deviceInfo.modelName || undefined,
      deviceBrand: deviceInfo.brand || undefined,
      deviceName: deviceInfo.deviceName || undefined,
      deviceType: deviceInfo.deviceType ?? undefined,
      deviceYearClass: deviceInfo.deviceYearClass ?? undefined,
      isDevice: deviceInfo.isDevice,
      osName: deviceInfo.osName || undefined,
      osVersion: deviceInfo.osVersion || undefined,
      osBuildId: deviceInfo.osBuildId || undefined,
      totalMemory: deviceInfo.totalMemory ?? undefined,
      appVersion: appInfo.nativeApplicationVersion || undefined,
      buildNumber: appInfo.nativeBuildVersion || undefined,
      locale,
      region: deviceInfo.region || undefined,
      timezone: deviceInfo.timezone || undefined,
      screenWidth: Math.round(width),
      screenHeight: Math.round(height),
      screenScale: scale,
      fontScale,
      isLandscape: width > height,
    };
  } catch {
    return {};
  }
}
