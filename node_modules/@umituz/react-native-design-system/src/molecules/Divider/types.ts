/**
 * Divider Domain - Entity Definitions
 *
 * Core types and interfaces for dividers and separators.
 * Simple visual separators for content sections.
 *
 * @domain divider
 * @layer domain/entities
 */

/**
 * Divider orientation
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider style
 */
export type DividerStyle = 'solid' | 'dashed' | 'dotted';

/**
 * Divider spacing
 */
export type DividerSpacing = 'none' | 'small' | 'medium' | 'large';

/**
 * Divider configuration
 */
export interface DividerConfig {
    /** Orientation */
    orientation: DividerOrientation;
    /** Line style */
    style: DividerStyle;
    /** Spacing (margin) */
    spacing: DividerSpacing;
    /** Custom color */
    color?: string;
    /** Custom thickness */
    thickness?: number;
    /** Text label (for text divider) */
    text?: string;
}

/**
 * Spacing configurations (px)
 */
export const SPACING_CONFIGS: Record<DividerSpacing, number> = {
    none: 0,
    small: 8,
    medium: 16,
    large: 24,
};

/**
 * Divider utility class
 */
export class DividerUtils {
    /**
     * Get spacing value
     */
    static getSpacing(spacing: DividerSpacing): number {
        return SPACING_CONFIGS[spacing];
    }

    /**
     * Validate divider config
     */
    static validateConfig(config: Partial<DividerConfig>): DividerConfig {
        return {
            orientation: config.orientation || 'horizontal',
            style: config.style || 'solid',
            spacing: config.spacing || 'medium',
            color: config.color,
            thickness: config.thickness || 1,
            text: config.text,
        };
    }
}

/**
 * Divider constants
 */
export const DIVIDER_CONSTANTS = {
    DEFAULT_ORIENTATION: 'horizontal' as DividerOrientation,
    DEFAULT_STYLE: 'solid' as DividerStyle,
    DEFAULT_SPACING: 'medium' as DividerSpacing,
    DEFAULT_THICKNESS: 1,
} as const;
