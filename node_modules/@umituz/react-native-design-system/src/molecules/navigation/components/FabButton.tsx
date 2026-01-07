import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { useAppDesignTokens } from '../../../theme';

export interface FabButtonProps {
    /** Content to render inside the FAB */
    children: React.ReactNode;
    /** Container style overrides */
    style?: ViewStyle;
}

/**
 * Standard FAB container component.
 * Provides a centered, elevated circular container using design tokens.
 */
export const FabButton: React.FC<FabButtonProps> = ({
    children,
    style,
}) => {
    const tokens = useAppDesignTokens();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: tokens.colors.primary,
                borderColor: tokens.colors.onPrimary,
            },
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
        zIndex: 10,
    },
});
