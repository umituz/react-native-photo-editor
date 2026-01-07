import React from 'react';
import { View, TextInput, Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useAppDesignTokens } from '../theme';
import { AtomicIcon } from './AtomicIcon';
import { AtomicText } from './AtomicText';
import { useInputState } from './input/hooks/useInputState';
import { getSizeConfig, getVariantStyle, getTextColor } from './input/styles/inputStylesHelper';
import type { IconName } from './AtomicIcon';

export type AtomicInputVariant = 'outlined' | 'filled' | 'flat';
export type AtomicInputState = 'default' | 'error' | 'success' | 'disabled';
export type AtomicInputSize = 'sm' | 'md' | 'lg';

export interface AtomicInputProps {
  /** Input label */
  label?: string;
  /** Current input value */
  value?: string;
  /** Value change callback */
  onChangeText?: (text: string) => void;
  /** Input variant (outlined, filled, flat) */
  variant?: AtomicInputVariant;
  /** Input state (default, error, success, disabled) */
  state?: AtomicInputState;
  /** Input size (sm, md, lg) */
  size?: AtomicInputSize;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text below input */
  helperText?: string;
  /** Leading icon (Ionicons name) */
  leadingIcon?: IconName;
  /** Trailing icon (Ionicons name) */
  trailingIcon?: IconName;
  /** Callback when trailing icon is pressed */
  onTrailingIconPress?: () => void;
  /** Show password toggle for secure inputs */
  showPasswordToggle?: boolean;
  /** Secure text entry (password field) */
  secureTextEntry?: boolean;
  /** Maximum character length */
  maxLength?: number;
  /** Show character counter */
  showCharacterCount?: boolean;
  /** Keyboard type */
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'number-pad' | 'decimal-pad' | 'web-search' | 'twitter' | 'numeric' | 'visible-password';
  /** Return key type */
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  /** Callback when submit button is pressed */
  onSubmitEditing?: () => void;
  /** Blur on submit */
  blurOnSubmit?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Auto-capitalize */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  /** Auto-correct */
  autoCorrect?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Input text style */
  inputStyle?: StyleProp<TextStyle>;
  /** Test ID for E2E testing */
  testID?: string;
  /** Blur callback */
  onBlur?: () => void;
  /** Focus callback */
  onFocus?: () => void;
  /** Multiline input support */
  multiline?: boolean;
  /** Number of lines for multiline input */
  numberOfLines?: number;
}

/**
 * AtomicInput - Pure React Native Text Input
 *
 * Features:
 * - Pure React Native implementation (no Paper dependency)
 * - Ionicons for password toggle and custom icons
 * - Outlined/filled/flat variants
 * - Error, success, disabled states
 * - Character counter
 * - Responsive sizing
 * - Full accessibility support
 */
export const AtomicInput = React.forwardRef<TextInput, AtomicInputProps>(({
  variant = 'outlined',
  state = 'default',
  size = 'md',
  label,
  value = '',
  onChangeText,
  placeholder,
  helperText,
  leadingIcon,
  trailingIcon,
  onTrailingIconPress,
  showPasswordToggle = false,
  secureTextEntry = false,
  maxLength,
  showCharacterCount = false,
  keyboardType = 'default',
  returnKeyType,
  onSubmitEditing,
  blurOnSubmit,
  autoFocus,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  disabled = false,
  style,
  inputStyle,
  testID,
  onBlur,
  onFocus,
  multiline = false,
  numberOfLines,
}, ref) => {
  const tokens = useAppDesignTokens();

  const {
    localValue,
    isFocused,
    isPasswordVisible,
    characterCount,
    setIsFocused,
    handleTextChange,
    togglePasswordVisibility,
  } = useInputState({
    value,
    onChangeText,
    secureTextEntry,
    showPasswordToggle,
    maxLength,
    showCharacterCount,
  });

  const isDisabled = state === 'disabled' || disabled;
  const hasError = state === 'error';
  const hasSuccess = state === 'success';

  const sizeConfig = getSizeConfig({ size, tokens });
  const variantStyle = getVariantStyle({
    variant,
    isFocused,
    hasError,
    hasSuccess,
    isDisabled,
    tokens,
  });
  const textColor = getTextColor({
    isDisabled,
    hasError,
    hasSuccess,
    tokens,
  });

  const iconColor = isDisabled ? tokens.colors.textDisabled : tokens.colors.textSecondary;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    variantStyle,
    {
      paddingTop: sizeConfig.paddingVertical,
      paddingBottom: sizeConfig.paddingVertical,
      paddingHorizontal: sizeConfig.paddingHorizontal,
      minHeight: sizeConfig.minHeight,
      justifyContent: 'center',
      opacity: isDisabled ? 0.5 : 1,
    },
    style,
  ];

  const textInputStyle: StyleProp<TextStyle> = [
    styles.input,
    {
      fontSize: sizeConfig.fontSize,
      lineHeight: (sizeConfig.fontSize || 16) * 1.2,
      color: textColor,
      paddingVertical: 0,
    },
    leadingIcon ? { paddingLeft: sizeConfig.iconSize + 8 } : undefined,
    (trailingIcon || showPasswordToggle) ? { paddingRight: sizeConfig.iconSize + 8 } : undefined,
    inputStyle,
  ];

  return (
    <View testID={testID}>
      {label && (
        <AtomicText
          type="labelMedium"
          color={hasError ? 'error' : hasSuccess ? 'success' : 'secondary'}
          style={styles.label}
        >
          {label}
        </AtomicText>
      )}

      <View style={containerStyle}>
        {leadingIcon && (
          <View style={styles.leadingIcon}>
            <AtomicIcon
              name={leadingIcon}
              customSize={sizeConfig.iconSize}
              customColor={iconColor}
            />
          </View>
        )}

        <TextInput
          ref={ref}
          value={localValue}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor={tokens.colors.textSecondary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          maxLength={maxLength}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          blurOnSubmit={blurOnSubmit}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={!isDisabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          style={textInputStyle}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          testID={testID ? `${testID}-input` : undefined}
        />

        {(showPasswordToggle && secureTextEntry) && (
          <Pressable
            onPress={() => togglePasswordVisibility()}
            style={styles.trailingIcon}
          >
            <AtomicIcon
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              customSize={sizeConfig.iconSize}
              customColor={iconColor}
            />
          </Pressable>
        )}

        {trailingIcon && !showPasswordToggle && (
          <Pressable
            onPress={onTrailingIconPress}
            style={styles.trailingIcon}
            disabled={!onTrailingIconPress}
          >
            <AtomicIcon
              name={trailingIcon}
              customSize={sizeConfig.iconSize}
              customColor={iconColor}
            />
          </Pressable>
        )}
      </View>

      {(helperText || showCharacterCount) && (
        <View style={styles.helperRow}>
          {helperText && (
            <AtomicText
              style={styles.helperText}
              color={hasError ? 'error' : 'secondary'}
              testID={testID ? `${testID}-helper` : undefined}
            >
              {helperText}
            </AtomicText>
          )}
          {showCharacterCount && maxLength && (
            <AtomicText
              style={[styles.helperText, styles.characterCount]}
              color="secondary"
              testID={testID ? `${testID}-count` : undefined}
            >
              {characterCount}/{maxLength}
            </AtomicText>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  label: {
    marginBottom: 4,
  },
  leadingIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  trailingIcon: {
    position: 'absolute',
    right: 12,
    zIndex: 1,
  },
  helperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperText: {
    flex: 1,
  },
  characterCount: {
    marginLeft: 8,
  },
});

export type { AtomicInputProps as InputProps };
