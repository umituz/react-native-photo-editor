/**
 * Text Editor Sheet Component
 * Bottom sheet for editing text layers
 */

import React, { memo } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ColorPicker } from "../ui/ColorPicker";
import type { TextAlign } from "../../../domain/types";

interface TextEditorSheetProps {
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  t: (key: string) => string;
  color?: string;
  onColorChange?: (color: string) => void;
  textAlign?: TextAlign;
  onTextAlignChange?: (align: TextAlign) => void;
  isBold?: boolean;
  onBoldChange?: (bold: boolean) => void;
  isItalic?: boolean;
  onItalicChange?: (italic: boolean) => void;
}

const ALIGN_OPTIONS: { value: TextAlign; icon: string }[] = [
  { value: "left", icon: "«" },
  { value: "center", icon: "≡" },
  { value: "right", icon: "»" },
];

const StyleButton = memo<{ label: string; isActive: boolean; onPress: () => void; children: React.ReactNode }>(
  ({ label, isActive, onPress, children }) => {
    const tokens = useAppDesignTokens();

    return (
      <TouchableOpacity
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.borders.radius.sm,
          borderWidth: 1.5,
          borderColor: isActive ? tokens.colors.primary : tokens.colors.border,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: isActive ? tokens.colors.primary + "20" : tokens.colors.surfaceVariant,
        }}
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityState={{ selected: isActive }}
      >
        {children}
      </TouchableOpacity>
    );
  }
);

StyleButton.displayName = "StyleButton";

export const TextEditorSheet = memo<TextEditorSheetProps>(({
  value,
  onChange,
  onSave,
  t,
  color = "#FFFFFF",
  onColorChange,
  textAlign = "center",
  onTextAlignChange,
  isBold = false,
  onBoldChange,
  isItalic = false,
  onItalicChange,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">{t("photo_editor.add_text") || "Edit Text"}</AtomicText>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={t("photo_editor.tap_to_edit") || "Enter text…"}
        placeholderTextColor={tokens.colors.textSecondary}
        style={styles.input}
        multiline
        autoFocus
      />

      <View style={styles.row}>
        {onBoldChange && (
          <StyleButton label="Bold" isActive={isBold} onPress={() => onBoldChange(!isBold)}>
            <AtomicText fontWeight="bold" color={isBold ? "primary" : "textSecondary"}>
              B
            </AtomicText>
          </StyleButton>
        )}

        {onItalicChange && (
          <StyleButton label="Italic" isActive={isItalic} onPress={() => onItalicChange(!isItalic)}>
            <AtomicText color={isItalic ? "primary" : "textSecondary"} style={{ fontStyle: "italic" }}>
              I
            </AtomicText>
          </StyleButton>
        )}

        {onTextAlignChange && (
          <View style={[styles.row, { marginLeft: tokens.spacing.sm }]}>
            {ALIGN_OPTIONS.map(({ value: align, icon }) => (
              <StyleButton
                key={align}
                label={`Align ${align}`}
                isActive={textAlign === align}
                onPress={() => onTextAlignChange(align)}
              >
                <AtomicText color={textAlign === align ? "primary" : "textSecondary"}>{icon}</AtomicText>
              </StyleButton>
            ))}
          </View>
        )}
      </View>

      {onColorChange && (
        <ColorPicker
          label="Text Color"
          selectedColor={color}
          onSelectColor={onColorChange}
        />
      )}

      <AtomicButton variant="primary" onPress={onSave}>
        {t("common.save") || "Save"}
      </AtomicButton>
    </View>
  );
});

TextEditorSheet.displayName = "TextEditorSheet";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 16,
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    minHeight: 90,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
