/**
 * ConfirmationModal - Universal Confirmation Dialog
 *
 * A reusable confirmation modal for destructive and important actions.
 * Follows Material Design 3 dialog patterns and accessibility guidelines.
 *
 * Features:
 * - Multiple variants (default, destructive, warning, success)
 * - Configurable text and icons
 * - Backdrop dismissal
 * - Full keyboard and screen reader support
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * // Destructive confirmation (delete)
 * <ConfirmationModal
 *   visible={showDeleteModal}
 *   variant="destructive"
 *   title="Delete Item?"
 *   message="This action cannot be undone. All data will be permanently deleted."
 *   confirmText="Delete"
 *   cancelText="Cancel"
 *   onConfirm={handleDelete}
 *   onCancel={() => setShowDeleteModal(false)}
 * />
 *
 * // Generic confirmation
 * <ConfirmationModal
 *   visible={showConfirmModal}
 *   variant="default"
 *   title="Confirm Action"
 *   message="Are you sure you want to proceed?"
 *   onConfirm={handleConfirm}
 *   onCancel={() => setShowConfirmModal(false)}
 * />
 * ```
 */

export { ConfirmationModal } from './ConfirmationModalMain';
export { useConfirmationModal } from './confirmation-modal/useConfirmationModal';
export type { ConfirmationModalProps, ConfirmationModalVariant } from './confirmation-modal/types';