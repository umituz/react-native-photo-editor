/**
 * Alerts Molecule - Public API
 */

export * from './AlertTypes';
export { useAlertStore } from './AlertStore';
export { AlertService } from './AlertService';
export { AlertBanner } from './AlertBanner';
export { AlertToast } from './AlertToast';
export { AlertInline } from './AlertInline';
export { AlertModal } from './AlertModal';
export { AlertContainer } from './AlertContainer';
export { AlertProvider } from './AlertProvider';
export { useAlert } from './useAlert';

import { AlertService } from './AlertService';
import { useAlertStore } from './AlertStore';
import { AlertOptions } from './AlertTypes';

/**
 * Convenience alert service for use outside of components
 */
export const alertService = {
    error: (title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createErrorAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    },
    success: (title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createSuccessAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    },
    warning: (title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createWarningAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    },
    info: (title: string, message?: string, options?: AlertOptions) => {
        const alert = AlertService.createInfoAlert(title, message, options);
        useAlertStore.getState().addAlert(alert);
        return alert.id;
    },
    dismiss: (id: string) => {
        useAlertStore.getState().dismissAlert(id);
    },
};
