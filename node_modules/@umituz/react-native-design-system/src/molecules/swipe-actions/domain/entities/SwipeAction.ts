/**
 * Swipe Actions Domain - Entity Layer
 *
 * Core swipe action types and configurations.
 * Defines pre-built action types, colors, icons, and utilities.
 *
 * @domain swipe-actions
 * @layer domain/entities
 */

import type { IconName } from '../../../../index';

/**
 * Pre-built swipe action types
 */
export type SwipeActionType =
  | 'delete'
  | 'archive'
  | 'edit'
  | 'share'
  | 'favorite'
  | 'more'
  | 'custom';

/**
 * Swipe action configuration
 */
export interface SwipeActionConfig {
  /** Action type */
  type: SwipeActionType;
  /** Action label (optional, defaults from type) */
  label?: string;
  /** Icon name (optional, defaults from type) */
  icon?: IconName;
  /** Custom color (optional, defaults from type) */
  color?: string;
  /** Action handler */
  onPress: () => void | Promise<void>;
  /** Enable haptic feedback (default: true) */
  enableHaptics?: boolean;
}

/**
 * Swipe direction
 */
export type SwipeDirection = 'left' | 'right';

/**
 * Swipeable item configuration
 */
export interface SwipeableConfig {
  /** Actions revealed when swiping right (left side) */
  leftActions?: SwipeActionConfig[];
  /** Actions revealed when swiping left (right side) */
  rightActions?: SwipeActionConfig[];
  /** Swipe threshold in points (default: 80) */
  threshold?: number;
  /** Disable overshoot animation (default: true) */
  disableOvershoot?: boolean;
  /** Friction value (default: 2) */
  friction?: number;
}

/**
 * Pre-built action type configurations
 */
export const ACTION_PRESETS: Record<Exclude<SwipeActionType, 'custom'>, {
  label: string;
  icon: IconName;
  colorKey: 'error' | 'success' | 'primary' | 'secondary' | 'warning' | 'textSecondary';
  hapticsIntensity: 'Light' | 'Medium' | 'Heavy';
}> = {
  delete: {
    label: 'Delete',
    icon: 'Trash2',
    colorKey: 'error',
    hapticsIntensity: 'Heavy',
  },
  archive: {
    label: 'Archive',
    icon: 'Archive',
    colorKey: 'success',
    hapticsIntensity: 'Medium',
  },
  edit: {
    label: 'Edit',
    icon: 'Pencil',
    colorKey: 'primary',
    hapticsIntensity: 'Light',
  },
  share: {
    label: 'Share',
    icon: 'Share2',
    colorKey: 'secondary',
    hapticsIntensity: 'Light',
  },
  favorite: {
    label: 'Favorite',
    icon: 'Heart',
    colorKey: 'warning',
    hapticsIntensity: 'Light',
  },
  more: {
    label: 'More',
    icon: 'MoveHorizontal',
    colorKey: 'textSecondary',
    hapticsIntensity: 'Light',
  },
};

/**
 * Default swipe configuration
 */
export const DEFAULT_SWIPE_CONFIG: Required<Omit<SwipeableConfig, 'leftActions' | 'rightActions'>> = {
  threshold: 80,
  disableOvershoot: true,
  friction: 2,
};

/**
 * Swipe action utility functions
 */
export class SwipeActionUtils {
  /**
   * Gets preset configuration for action type
   */
  static getPreset(type: SwipeActionType) {
    if (type === 'custom') {
      return null;
    }
    return ACTION_PRESETS[type];
  }

  /**
   * Validates swipe action configuration
   */
  static validateAction(action: SwipeActionConfig): boolean {
    // Must have onPress handler
    if (!action.onPress || typeof action.onPress !== 'function') {
      return false;
    }

    // Custom actions must have label, icon, and color
    if (action.type === 'custom') {
      return !!(action.label && action.icon && action.color);
    }

    return true;
  }

  /**
   * Gets action display label
   */
  static getLabel(action: SwipeActionConfig): string {
    if (action.label) {
      return action.label;
    }

    const preset = this.getPreset(action.type);
    return preset?.label || 'Action';
  }

  /**
   * Gets action icon name
   */
  static getIcon(action: SwipeActionConfig): IconName {
    if (action.icon) {
      return action.icon;
    }

    const preset = this.getPreset(action.type);
    return preset?.icon || 'MoveHorizontal';
  }

  /**
   * Gets action color key for theme
   */
  static getColorKey(action: SwipeActionConfig): string | null {
    if (action.color) {
      return null; // Use custom color
    }

    const preset = this.getPreset(action.type);
    return preset?.colorKey || null;
  }

  /**
   * Gets haptics intensity for action
   */
  static getHapticsIntensity(action: SwipeActionConfig): 'Light' | 'Medium' | 'Heavy' {
    const preset = this.getPreset(action.type);
    return preset?.hapticsIntensity || 'Light';
  }
}
