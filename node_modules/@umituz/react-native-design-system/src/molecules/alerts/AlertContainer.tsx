/**
 * AlertContainer Component
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from '../../safe-area';
import { useAppDesignTokens } from '../../theme';
import { useAlertStore } from './AlertStore';
import { AlertToast } from './AlertToast';
import { AlertBanner } from './AlertBanner';
import { AlertModal } from './AlertModal';
import { Alert, AlertMode } from './AlertTypes';

export const AlertContainer: React.FC = () => {
    const alerts = useAlertStore((state: { alerts: Alert[] }) => state.alerts);
    const insets = useSafeAreaInsets();
    const tokens = useAppDesignTokens();

    const toasts = alerts.filter((a: Alert) => a.mode === AlertMode.TOAST);
    const banners = alerts.filter((a: Alert) => a.mode === AlertMode.BANNER);
    const modals = alerts.filter((a: Alert) => a.mode === AlertMode.MODAL);

    return (
        <View style={styles.container} pointerEvents="box-none">
            {/* Banners at top */}
            <View style={[styles.bannerContainer, { paddingTop: insets.top }]}>
                {banners.map((alert: Alert) => (
                    <AlertBanner key={alert.id} alert={alert} />
                ))}
            </View>

            {/* Toasts at top or bottom (default top) */}
            <View style={[
                styles.toastContainer,
                {
                    top: insets.top + (banners.length > 0 ? tokens.spacing.xl * 2 : tokens.spacing.lg),
                    paddingHorizontal: tokens.spacing.md,
                }
            ]}>
                {toasts.map((alert: Alert) => (
                    <View key={alert.id} style={{ marginBottom: tokens.spacing.sm, width: '100%' }}>
                        <AlertToast alert={alert} />
                    </View>
                ))}
            </View>

            {/* Modals on top of everything */}
            {modals.map((alert: Alert) => (
                <AlertModal key={alert.id} alert={alert} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 9999,
    },
    bannerContainer: {
        width: '100%',
    },
    toastContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10000,
    },
});
