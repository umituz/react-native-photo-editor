/**
 * AlertBanner Component
 *
 * Displays a banner-style alert at the top or bottom of the screen.
 * Full-width notification bar for important messages.
 */

import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useSafeAreaInsets } from '../../safe-area';
import { AtomicText, AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType, AlertPosition } from './AlertTypes';
import { useAlertStore } from './AlertStore';

interface AlertBannerProps {
    alert: Alert;
}

export function AlertBanner({ alert }: AlertBannerProps) {
    const dismissAlert = useAlertStore((state: { dismissAlert: (id: string) => void }) => state.dismissAlert);
    const insets = useSafeAreaInsets();
    const tokens = useAppDesignTokens();

    const handleDismiss = () => {
        if (alert.dismissible) {
            dismissAlert(alert.id);
            alert.onDismiss?.();
        }
    };

    const getBackgroundColor = (type: AlertType): string => {
        switch (type) {
            case AlertType.SUCCESS:
                return tokens.colors.success;
            case AlertType.ERROR:
                return tokens.colors.error;
            case AlertType.WARNING:
                return tokens.colors.warning;
            case AlertType.INFO:
                return tokens.colors.info;
            default:
                return tokens.colors.backgroundSecondary;
        }
    };

    const backgroundColor = getBackgroundColor(alert.type);
    const textColor = tokens.colors.textInverse;
    const isTop = alert.position === AlertPosition.TOP;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor,
                    paddingTop: isTop ? insets.top + tokens.spacing.sm : tokens.spacing.sm,
                    paddingBottom: isTop ? tokens.spacing.sm : insets.bottom + tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                },
            ]}
            testID={alert.testID}
        >
            <View style={styles.content}>
                <View style={styles.row}>
                    {alert.icon && (
                        <View style={[styles.iconContainer, { marginRight: tokens.spacing.sm }]}>
                            <AtomicIcon
                                name={alert.icon}
                                customSize={20}
                                customColor={textColor}
                            />
                        </View>
                    )}

                    <View style={styles.textContainer}>
                        <AtomicText
                            type="bodyMedium"
                            style={[styles.title, { color: textColor }]}
                            numberOfLines={1}
                        >
                            {alert.title}
                        </AtomicText>

                        {alert.message && (
                            <AtomicText
                                type="bodySmall"
                                style={[
                                    styles.message,
                                    { color: textColor, marginTop: tokens.spacing.xs },
                                ]}
                                numberOfLines={2}
                            >
                                {alert.message}
                            </AtomicText>
                        )}
                    </View>

                    {alert.dismissible && (
                        <Pressable
                            onPress={handleDismiss}
                            style={[styles.closeButton, { marginLeft: tokens.spacing.sm }]}
                            hitSlop={8}
                        >
                            <AtomicIcon name="close" customSize={20} customColor={textColor} />
                        </Pressable>
                    )}
                </View>

                {alert.actions && alert.actions.length > 0 && (
                    <View style={[styles.actionsContainer, { marginTop: tokens.spacing.sm }]}>
                        {alert.actions.map((action) => (
                            <Pressable
                                key={action.id}
                                onPress={async () => {
                                    await action.onPress();
                                    if (action.closeOnPress ?? true) {
                                        handleDismiss();
                                    }
                                }}
                                style={[
                                    styles.actionButton,
                                    {
                                        paddingVertical: tokens.spacing.xs,
                                        paddingHorizontal: tokens.spacing.sm,
                                        marginRight: tokens.spacing.xs,
                                    },
                                ]}
                            >
                                <AtomicText
                                    type="bodySmall"
                                    style={[
                                        styles.actionText,
                                        { color: textColor },
                                    ]}
                                >
                                    {action.label}
                                </AtomicText>
                            </Pressable>
                        ))}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        paddingVertical: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: '700',
    },
    message: {
        opacity: 0.9,
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionText: {
        fontWeight: '700',
        textDecorationLine: 'underline',
    },
});
