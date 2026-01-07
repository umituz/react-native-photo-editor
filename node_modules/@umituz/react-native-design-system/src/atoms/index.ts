/**
 * Atoms - Primitive UI components
 * Building blocks for molecules and organisms
 */

// Button
export {
    AtomicButton,
    type AtomicButtonProps,
    type ButtonVariant,
    type ButtonSize,
} from './AtomicButton';

// Text
export { AtomicText, type AtomicTextProps } from './AtomicText';

// Card
export {
    AtomicCard,
    type AtomicCardProps,
    type AtomicCardVariant,
    type AtomicCardPadding,
} from './AtomicCard';

// Input
export {
    AtomicInput,
    type AtomicInputProps,
    type AtomicInputVariant,
    type AtomicInputState,
    type AtomicInputSize,
} from './AtomicInput';

// Icon
export {
    AtomicIcon,
    type AtomicIconProps,
    type IconSize,
    type IconColor,
    type IconName,
} from './AtomicIcon';

export * from './AtomicIcon.types';

// Avatar
export { AtomicAvatar, type AtomicAvatarProps } from './AtomicAvatar';

// Chip
export { AtomicChip, type AtomicChipProps } from './AtomicChip';

// Progress
export { AtomicProgress, type AtomicProgressProps } from './AtomicProgress';

// Fab
export {
    AtomicFab,
    type AtomicFabProps,
    type FabSize,
    type FabVariant,
    getFabVariants,
} from './AtomicFab';

// Picker
export {
    AtomicPicker,
    type AtomicPickerProps,
    type PickerOption,
    type PickerSize,
} from './AtomicPicker';

// DatePicker
export { AtomicDatePicker, type AtomicDatePickerProps } from './AtomicDatePicker';

// Skeleton
export {
    AtomicSkeleton,
    type AtomicSkeletonProps,
    type SkeletonPattern,
    type SkeletonConfig,
    SKELETON_PATTERNS,
} from './skeleton';

// Badge
export {
    AtomicBadge,
    type AtomicBadgeProps,
    type BadgeVariant,
    type BadgeSize,
} from './AtomicBadge';

// Spinner
export {
    AtomicSpinner,
    AtomicSpinner as LoadingSpinner,
    type AtomicSpinnerProps,
    type SpinnerSize,
    type SpinnerColor,
} from './AtomicSpinner';

// Empty State
export { EmptyState, type EmptyStateProps } from './EmptyState';

// TextArea
export { AtomicTextArea, type AtomicTextAreaProps } from './AtomicTextArea';

// Switch
export { AtomicSwitch, type AtomicSwitchProps } from './AtomicSwitch';

// Touchable
export { AtomicTouchable, type AtomicTouchableProps } from './AtomicTouchable';

// StatusBar
export { AtomicStatusBar, type AtomicStatusBarProps } from './status-bar';

// Keyboard Avoiding
export { AtomicKeyboardAvoidingView, type AtomicKeyboardAvoidingViewProps } from './AtomicKeyboardAvoidingView';
