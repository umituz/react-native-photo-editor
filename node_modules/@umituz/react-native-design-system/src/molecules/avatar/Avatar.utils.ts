/**
 * Avatar Domain - Entity Definitions
 *
 * Core types and interfaces for user avatars.
 * Supports images, initials, icons with Turkish character support.
 */

/**
 * Avatar size preset
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Avatar shape
 */
export type AvatarShape = 'circle' | 'square' | 'rounded';

/**
 * Avatar type
 */
export type AvatarType = 'image' | 'initials' | 'icon';

/**
 * Avatar configuration
 */
export interface AvatarConfig {
  /** Avatar type */
  type: AvatarType;
  /** Size preset */
  size: AvatarSize;
  /** Shape */
  shape: AvatarShape;
  /** Image URI */
  uri?: string;
  /** User name for initials */
  name?: string;
  /** Icon name (if type is icon) */
  icon?: string;
  /** Custom background color */
  backgroundColor?: string;
  /** Show status indicator */
  showStatus?: boolean;
  /** Status (online/offline) */
  status?: 'online' | 'offline' | 'away' | 'busy';
}

/**
 * Size configuration
 */
export interface SizeConfig {
  size: number;
  fontSize: number;
  iconSize: number;
  statusSize: number;
  borderWidth: number;
}

/**
 * Avatar group configuration
 */
export interface AvatarGroupConfig {
  maxVisible: number;
  spacing: number;
  size: AvatarSize;
  shape: AvatarShape;
}

/**
 * Size configurations (px)
 */
export const SIZE_CONFIGS: Record<AvatarSize, SizeConfig> = {
  xs: {
    size: 24,
    fontSize: 10,
    iconSize: 12,
    statusSize: 6,
    borderWidth: 1,
  },
  sm: {
    size: 32,
    fontSize: 12,
    iconSize: 16,
    statusSize: 8,
    borderWidth: 1.5,
  },
  md: {
    size: 40,
    fontSize: 14,
    iconSize: 20,
    statusSize: 10,
    borderWidth: 2,
  },
  lg: {
    size: 56,
    fontSize: 18,
    iconSize: 28,
    statusSize: 12,
    borderWidth: 2,
  },
  xl: {
    size: 80,
    fontSize: 24,
    iconSize: 40,
    statusSize: 16,
    borderWidth: 2.5,
  },
  xxl: {
    size: 120,
    fontSize: 36,
    iconSize: 60,
    statusSize: 20,
    borderWidth: 3,
  },
};

/**
 * Avatar background colors
 * Vibrant, accessible colors with good contrast
 */
export const AVATAR_COLORS = [
  '#EF4444', // Red
  '#F59E0B', // Orange
  '#10B981', // Green
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#14B8A6', // Teal
  '#F97316', // Orange-Red
  '#06B6D4', // Cyan
  '#84CC16', // Lime
] as const;

/**
 * Status indicator colors
 */
export const STATUS_COLORS = {
  online: '#10B981', // Green
  offline: '#9CA3AF', // Gray
  away: '#F59E0B', // Orange
  busy: '#EF4444', // Red
} as const;

/**
 * Border radius configurations
 */
export const SHAPE_CONFIGS = {
  circle: 9999, // Full circle
  square: 0, // No radius
  rounded: 8, // Rounded corners
} as const;

/**
 * Avatar utility class
 */
export class AvatarUtils {
  /**
   * Generate initials from name
   * Supports Turkish characters (Ümit Uz → ÜU)
   */
  static generateInitials(name: string): string {
    const trimmed = name.trim();
    if (!trimmed) return '?';

    const words = trimmed.split(/\s+/);

    if (words.length >= 2) {
      // Full name: First letter of first + first letter of last
      const firstWord = words[0] ?? '';
      const lastWord = words[words.length - 1] ?? '';
      const first = firstWord[0] ?? '';
      const last = lastWord[0] ?? '';
      return (first + last).toLocaleUpperCase('tr-TR') || '?';
    } else {
      // Single word: First 2 letters
      return trimmed.slice(0, 2).toLocaleUpperCase('tr-TR');
    }
  }

  /**
   * Generate initials from email
   * umit@example.com → UE
   */
  static generateInitialsFromEmail(email: string): string {
    const trimmed = email.trim();
    if (!trimmed) return '?';

    const [username] = trimmed.split('@');
    if (!username) return '?';

    return username.slice(0, 2).toLocaleUpperCase('tr-TR');
  }

  /**
   * Hash string to number (for consistent color assignment)
   */
  static hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  /**
   * Get consistent color for name
   * Same name always returns same color
   */
  static getColorForName(name: string): string {
    if (!name) return AVATAR_COLORS[0];

    const hash = this.hashString(name);
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }

  /**
   * Get size config
   */
  static getSizeConfig(size: AvatarSize): SizeConfig {
    return SIZE_CONFIGS[size];
  }

  /**
   * Get border radius for shape
   */
  static getBorderRadius(shape: AvatarShape, size: number): number {
    if (shape === 'circle') {
      return size / 2;
    }
    return SHAPE_CONFIGS[shape];
  }

  /**
   * Get status color
   */
  static getStatusColor(status: 'online' | 'offline' | 'away' | 'busy'): string {
    return STATUS_COLORS[status];
  }

  /**
   * Validate avatar config
   */
  static validateConfig(config: Partial<AvatarConfig>): AvatarConfig {
    return {
      type: config.type || 'initials',
      size: config.size || 'md',
      shape: config.shape || 'circle',
      uri: config.uri,
      name: config.name,
      icon: config.icon,
      backgroundColor: config.backgroundColor,
      showStatus: config.showStatus ?? false,
      status: config.status,
    };
  }

  /**
   * Check if avatar has image
   */
  static hasImage(config: AvatarConfig): boolean {
    return config.type === 'image' && !!config.uri;
  }

  /**
   * Check if avatar has initials
   */
  static hasInitials(config: AvatarConfig): boolean {
    return config.type === 'initials' && !!config.name;
  }

  /**
   * Check if avatar has icon
   */
  static hasIcon(config: AvatarConfig): boolean {
    return config.type === 'icon' && !!config.icon;
  }
}

/**
 * Avatar constants
 */
export const AVATAR_CONSTANTS = {
  DEFAULT_SIZE: 'md' as AvatarSize,
  DEFAULT_SHAPE: 'circle' as AvatarShape,
  DEFAULT_TYPE: 'initials' as AvatarType,
  DEFAULT_ICON: 'user',
  MAX_GROUP_VISIBLE: 3,
  GROUP_SPACING: -8, // Negative for overlap
  FALLBACK_INITIALS: '?',
} as const;

