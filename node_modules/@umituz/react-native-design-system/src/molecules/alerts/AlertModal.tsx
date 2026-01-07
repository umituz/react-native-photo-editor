/**
 * AlertModal Component
 */

import React from 'react';
import { StyleSheet, View, Modal, Pressable } from 'react-native';
import { AtomicText, AtomicButton } from '../../atoms';
import { useAppDesignTokens } from '../../theme';
import { Alert, AlertType } from './AlertTypes';
import { useAlertStore } from './AlertStore';

interface AlertModalProps {
    alert: Alert;
}

export const AlertModal: React.FC<AlertModalProps> = ({ alert }) => {
    const dismissAlert = useAlertStore((state: { dismissAlert: (id: string) => void }) => state.dismissAlert);
    const tokens = useAppDesignTokens();

    const handleClose = () => {
        dismissAlert(alert.id);
        alert.onDismiss?.();
    };

    const getHeaderColor = () => {
        switch (alert.type) {
            case AlertType.SUCCESS: return tokens.colors.success;
            case AlertType.ERROR: return tokens.colors.error;
            case AlertType.WARNING: return tokens.colors.warning;
            case AlertType.INFO: return tokens.colors.info;
            default: return tokens.colors.primary;
        }
    };

    return (
        <Modal
            visible
            transparent
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <Pressable
                    style={styles.backdrop}
                    onPress={alert.dismissible ? handleClose : undefined}
                />
                <View style={[
                    styles.modal,
                    {
                        backgroundColor: tokens.colors.backgroundPrimary,
                        borderRadius: tokens.borders.radius.lg,
                        borderWidth: 1,
                        borderColor: tokens.colors.border,
                    }
                ]}>
                    <View style={[styles.header, { backgroundColor: getHeaderColor() }]}>
                        <AtomicText type="titleLarge" style={{ color: tokens.colors.textInverse }}>
                            {alert.title}
                        </AtomicText>
                    </View>

                    <View style={[styles.content, { padding: tokens.spacing.lg }]}>
                        {alert.message && (
                            <AtomicText type="bodyMedium" style={{ color: tokens.colors.textPrimary, textAlign: 'center' }}>
                                {alert.message}
                            </AtomicText>
                        )}

                        <View style={[styles.actions, { marginTop: tokens.spacing.lg, gap: tokens.spacing.sm }]}>
                            {alert.actions.map((action) => (
                                <AtomicButton
                                    key={action.id}
                                    title={action.label}
                                    variant={action.style === 'destructive' ? 'danger' : action.style === 'secondary' ? 'secondary' : 'primary'}
                                    onPress={async () => {
                                        await action.onPress();
                                        if (action.closeOnPress ?? true) {
                                            handleClose();
                                        }
                                    }}
                                    fullWidth
                                />
                            ))}
                            {alert.actions.length === 0 && (
                                <AtomicButton
                                    title="Close"
                                    onPress={handleClose}
                                    fullWidth
                                />
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modal: {
        width: '100%',
        maxWidth: 400,
        overflow: 'hidden',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    actions: {
        width: '100%',
    },
});
