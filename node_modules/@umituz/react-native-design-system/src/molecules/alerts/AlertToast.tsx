/**
 * AlertToast Component
 *
 * Displays a toast-style alert.
 * Floats on top of content.
 */

import React from 'react';
import { StyleSheet, View, Pressable, StyleProp, ViewStyle } from 'react-native';
import { AtomicText, AtomicIcon } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType } from './AlertTypes';
import { useAlertStore } from './AlertStore';

interface AlertToastProps {
    alert: Alert;
}

export function AlertToast({ alert }: AlertToastProps) {
    const dismissAlert = useAlertStore((state: { dismissAlert: (id: string) => void }) => state.dismissAlert);
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

    const getActionButtonStyle = (style: 'primary' | 'secondary' | 'destructive' | undefined): StyleProp<ViewStyle> => {
        switch (style) {
            case 'primary':
                return { backgroundColor: tokens.colors.backgroundPrimary };
            case 'secondary':
                return {
                    backgroundColor: undefined,
                    borderWidth: 1,
                    borderColor: tokens.colors.textInverse,
                };
            case 'destructive':
                return { backgroundColor: tokens.colors.error };
            default:
                return { backgroundColor: tokens.colors.backgroundSecondary };
        }
    };

    const getActionTextColor = (style: 'primary' | 'secondary' | 'destructive' | undefined): string => {
        switch (style) {
            case 'primary':
                return tokens.colors.textPrimary;
            case 'secondary':
                return tokens.colors.textInverse;
            case 'destructive':
                return tokens.colors.textInverse;
            default:
                return tokens.colors.textPrimary;
        }
    };

    const backgroundColor = getBackgroundColor(alert.type);
    const textColor = tokens.colors.textInverse;

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor,
                    padding: tokens.spacing.md,
                    borderRadius: tokens.borders.radius.md,
                },
            ]}
            testID={alert.testID}
        >
            <Pressable onPress={handleDismiss} style={styles.content}>
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
                            numberOfLines={2}
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
                                numberOfLines={3}
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
                                        borderRadius: tokens.borders.radius.sm,
                                    },
                                    getActionButtonStyle(action.style),
                                ]}
                            >
                                <AtomicText
                                    type="bodySmall"
                                    style={[
                                        styles.actionText,
                                        { color: getActionTextColor(action.style) },
                                    ]}
                                >
                                    {action.label}
                                </AtomicText>
                            </Pressable>
                        ))}
                    </View>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    content: {
        flex: 1,
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
    },
});
