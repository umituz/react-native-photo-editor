/**
 * Alert Store
 */

import { createStore } from '@umituz/react-native-storage';
import { Alert } from './AlertTypes';

interface AlertState {
    alerts: Alert[];
}

interface AlertActions {
    addAlert: (alert: Alert) => void;
    dismissAlert: (id: string) => void;
    clearAlerts: () => void;
}

export const useAlertStore = createStore<AlertState, AlertActions>({
    name: 'alert-store',
    initialState: {
        alerts: [],
    },
    persist: false,
    actions: (set, get) => ({
        addAlert: (alert: Alert) => set({ alerts: [...get().alerts, alert] }),
        dismissAlert: (id: string) => set({
            alerts: get().alerts.filter((a: Alert) => a.id !== id)
        }),
        clearAlerts: () => set({ alerts: [] }),
    }),
});
