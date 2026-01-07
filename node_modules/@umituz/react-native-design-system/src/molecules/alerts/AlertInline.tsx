/**
 * AlertInline Component
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AtomicText } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType } from './AlertTypes';

interface AlertInlineProps {
    alert: Alert;
}

export const AlertInline: React.FC<AlertInlineProps> = ({ alert }) => {
    const tokens = useAppDesignTokens();

    const getBorderColor = () => {
        switch (alert.type) {
            case AlertType.SUCCESS: return tokens.colors.success;
            case AlertType.ERROR: return tokens.colors.error;
            case AlertType.WARNING: return tokens.colors.warning;
            case AlertType.INFO: return tokens.colors.info;
            default: return tokens.colors.border;
        }
    };

    const getBackgroundColor = () => {
        switch (alert.type) {
            case AlertType.SUCCESS: return tokens.colors.success + '15';
            case AlertType.ERROR: return tokens.colors.error + '15';
            case AlertType.WARNING: return tokens.colors.warning + '15';
            case AlertType.INFO: return tokens.colors.info + '15';
            default: return tokens.colors.backgroundSecondary;
        }
    };

    return (
        <View style={[
            styles.container,
            {
                borderColor: getBorderColor(),
                backgroundColor: getBackgroundColor(),
                borderRadius: tokens.borders.radius.sm,
                padding: tokens.spacing.md,
                marginVertical: tokens.spacing.sm,
            }
        ]}>
            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textPrimary, fontWeight: '700' }}>
                {alert.title}
            </AtomicText>
            {alert.message && (
                <AtomicText type="bodySmall" style={{ color: tokens.colors.textSecondary, marginTop: tokens.spacing.xs }}>
                    {alert.message}
                </AtomicText>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        width: '100%',
    },
});
