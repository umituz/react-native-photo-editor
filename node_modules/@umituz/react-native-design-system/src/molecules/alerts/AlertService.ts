/**
 * Alert Service
 */

import { generateUUID } from '@umituz/react-native-uuid';
import { Alert, AlertType, AlertMode, AlertOptions, AlertPosition } from './AlertTypes';

export class AlertService {
    /**
     * Creates a base Alert object with defaults
     */
    static createAlert(
        type: AlertType,
        defaultMode: AlertMode,
        title: string,
        message?: string,
        options?: AlertOptions
    ): Alert {
        const id = generateUUID();
        const mode = options?.mode || defaultMode;

        // Default position based on mode
        const defaultPosition = mode === AlertMode.BANNER ? AlertPosition.TOP : AlertPosition.TOP;

        return {
            id,
            type,
            mode,
            title,
            message,
            position: options?.position || defaultPosition,
            icon: options?.icon,
            actions: options?.actions || [],
            dismissible: options?.dismissible ?? true,
            duration: options?.duration,
            onDismiss: options?.onDismiss,
            testID: options?.testID,
            createdAt: Date.now(),
        };
    }

    static createSuccessAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.SUCCESS, AlertMode.TOAST, title, message, options);
    }

    static createErrorAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.ERROR, AlertMode.TOAST, title, message, options);
    }

    static createWarningAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.WARNING, AlertMode.TOAST, title, message, options);
    }

    static createInfoAlert(title: string, message?: string, options?: AlertOptions): Alert {
        return this.createAlert(AlertType.INFO, AlertMode.TOAST, title, message, options);
    }
}
