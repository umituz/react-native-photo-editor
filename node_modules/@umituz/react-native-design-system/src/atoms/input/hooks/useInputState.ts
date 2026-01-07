import { useState, useCallback } from 'react';

interface UseInputStateProps {
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
}

interface UseInputStateReturn {
  localValue: string;
  isFocused: boolean;
  isPasswordVisible: boolean;
  characterCount: number;
  isAtMaxLength: boolean;
  setIsFocused: (focused: boolean) => void;
  handleTextChange: (text: string) => void;
  togglePasswordVisibility: () => void;
}

export const useInputState = ({
  value = '',
  onChangeText,
  secureTextEntry = false,
  showPasswordToggle = false,
  maxLength,
  showCharacterCount = false,
}: UseInputStateProps = {}): UseInputStateReturn => {
  void showPasswordToggle;
  void showCharacterCount;
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleTextChange = useCallback((text: string) => {
    setLocalValue(text);
    onChangeText?.(text);
  }, [onChangeText]);

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  const characterCount = localValue.length;
  const isAtMaxLength = maxLength ? characterCount >= maxLength : false;

  return {
    localValue,
    isFocused,
    isPasswordVisible,
    characterCount,
    isAtMaxLength,
    setIsFocused,
    handleTextChange,
    togglePasswordVisibility,
  };
};
