/**
 * AtomicPicker Styles
 */
import type { ViewStyle, TextStyle } from 'react-native';
import type { DesignTokens } from '../../../theme';

export type PickerSize = 'sm' | 'md' | 'lg';

export interface PickerContainerStyles {
    base: ViewStyle;
    size: Record<PickerSize, ViewStyle>;
    state: {
        error: ViewStyle;
        disabled: ViewStyle;
    };
}

export interface PickerLabelStyles {
    base: TextStyle;
    size: Record<PickerSize, TextStyle>;
}

export interface PickerValueStyles {
    base: TextStyle;
    size: Record<PickerSize, TextStyle>;
}

export interface PickerPlaceholderStyles {
    base: TextStyle;
    size: Record<PickerSize, TextStyle>;
}

export const getPickerContainerStyles = (tokens: DesignTokens): PickerContainerStyles => ({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: tokens.colors.outline,
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.borders.radius.md,
    },
    size: {
        sm: {
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
            minHeight: 36 * tokens.spacingMultiplier,
        },
        md: {
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            minHeight: 48 * tokens.spacingMultiplier,
        },
        lg: {
            paddingHorizontal: tokens.spacing.lg,
            paddingVertical: tokens.spacing.md,
            minHeight: 56 * tokens.spacingMultiplier,
        },
    },
    state: {
        error: {
            borderColor: tokens.colors.error,
        },
        disabled: {
            opacity: tokens.opacity.disabled,
        },
    },
});

export const getPickerLabelStyles = (tokens: DesignTokens): PickerLabelStyles => ({
    base: {
        color: tokens.colors.textPrimary,
        marginBottom: tokens.spacing.xs,
    },
    size: {
        sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
        md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
        lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
    },
});

export const getPickerValueStyles = (tokens: DesignTokens): PickerValueStyles => ({
    base: {
        color: tokens.colors.textPrimary,
        flex: 1,
    },
    size: {
        sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
        md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
        lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
    },
});

export const getPickerPlaceholderStyles = (tokens: DesignTokens): PickerPlaceholderStyles => ({
    base: {
        color: tokens.colors.textTertiary,
        flex: 1,
    },
    size: {
        sm: { fontSize: tokens.typography.bodySmall.responsiveFontSize },
        md: { fontSize: tokens.typography.bodyMedium.responsiveFontSize },
        lg: { fontSize: tokens.typography.bodyLarge.responsiveFontSize },
    },
});

export const getPickerErrorStyles = (tokens: DesignTokens): TextStyle => ({
    color: tokens.colors.error,
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    marginTop: tokens.spacing.xs,
});

// Modal styles
export const getModalOverlayStyles = (): ViewStyle => ({
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
});

export const getModalContainerStyles = (tokens: DesignTokens, bottomInset: number): ViewStyle => ({
    backgroundColor: tokens.colors.surface,
    borderTopLeftRadius: tokens.borders.radius.lg,
    borderTopRightRadius: tokens.borders.radius.lg,
    maxHeight: '80%',
    paddingBottom: bottomInset,
});

export const getModalHeaderStyles = (tokens: DesignTokens): ViewStyle => ({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.outline,
});

export const getModalTitleStyles = (tokens: DesignTokens): TextStyle => ({
    fontSize: tokens.typography.titleLarge.responsiveFontSize,
    fontWeight: '600',
    color: tokens.colors.onSurface,
});

export const getSearchContainerStyles = (tokens: DesignTokens): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surfaceVariant,
    borderRadius: tokens.borders.radius.md,
    marginHorizontal: tokens.spacing.md,
    marginVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    gap: tokens.spacing.sm,
});

export const getSearchInputStyles = (tokens: DesignTokens): TextStyle => ({
    flex: 1,
    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    color: tokens.colors.onSurface,
    paddingVertical: 0,
});

export const getOptionContainerStyles = (
    tokens: DesignTokens,
    selected: boolean,
    disabled: boolean
): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    gap: tokens.spacing.md,
    backgroundColor: selected ? tokens.colors.surfaceVariant : 'transparent',
    opacity: disabled ? tokens.opacity.disabled : 1,
});

export const getOptionTextStyles = (tokens: DesignTokens, selected: boolean): TextStyle => ({
    fontSize: tokens.typography.bodyLarge.responsiveFontSize,
    color: selected ? tokens.colors.primary : tokens.colors.onSurface,
    fontWeight: selected ? '600' : '400',
});

export const getOptionDescriptionStyles = (tokens: DesignTokens): TextStyle => ({
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    color: tokens.colors.textSecondary,
    marginTop: tokens.spacing.xs,
});

export const getEmptyStateStyles = (tokens: DesignTokens): ViewStyle => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: tokens.spacing.xl,
    gap: tokens.spacing.md,
});

export const getEmptyStateTextStyles = (tokens: DesignTokens): TextStyle => ({
    fontSize: tokens.typography.bodyMedium.responsiveFontSize,
    color: tokens.colors.textSecondary,
    textAlign: 'center',
});

// Chip styles
export const getChipContainerStyles = (tokens: DesignTokens): ViewStyle => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.sm,
});

export const getChipStyles = (tokens: DesignTokens): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.colors.surfaceVariant,
    borderRadius: tokens.borders.radius.full,
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: tokens.spacing.xs,
    gap: tokens.spacing.xs,
});

export const getChipTextStyles = (tokens: DesignTokens): TextStyle => ({
    fontSize: tokens.typography.bodySmall.responsiveFontSize,
    color: tokens.colors.onSurface,
});
