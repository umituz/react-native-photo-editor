import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { ColorPicker } from "./ColorPicker";
import type { TextAlign } from "../types";

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

export const TextEditorSheet: React.FC<TextEditorSheetProps> = ({
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

  const styles = StyleSheet.create({
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    input: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      padding: tokens.spacing.md,
      fontSize: 18,
      color: tokens.colors.textPrimary,
      textAlign: "center",
      minHeight: 90,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.sm,
    },
    styleBtn: {
      width: 44,
      height: 44,
      borderRadius: tokens.borders.radius.sm,
      borderWidth: 1.5,
      borderColor: tokens.colors.border,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: tokens.colors.surfaceVariant,
    },
    styleBtnActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primary + "20",
    },
  });

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">{t("editor.add_text") || "Edit Text"}</AtomicText>

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={t("editor.tap_to_edit") || "Enter text…"}
        placeholderTextColor={tokens.colors.textSecondary}
        style={styles.input}
        multiline
        autoFocus
      />

      {/* Style row: Bold, Italic, Alignment */}
      <View style={styles.row}>
        {onBoldChange && (
          <TouchableOpacity
            style={[styles.styleBtn, isBold && styles.styleBtnActive]}
            onPress={() => onBoldChange(!isBold)}
            accessibilityLabel="Bold"
            accessibilityRole="button"
            accessibilityState={{ selected: isBold }}
          >
            <AtomicText fontWeight="bold" color={isBold ? "primary" : "textSecondary"}>
              B
            </AtomicText>
          </TouchableOpacity>
        )}

        {onItalicChange && (
          <TouchableOpacity
            style={[styles.styleBtn, isItalic && styles.styleBtnActive]}
            onPress={() => onItalicChange(!isItalic)}
            accessibilityLabel="Italic"
            accessibilityRole="button"
            accessibilityState={{ selected: isItalic }}
          >
            <AtomicText
              color={isItalic ? "primary" : "textSecondary"}
              style={{ fontStyle: "italic" }}
            >
              I
            </AtomicText>
          </TouchableOpacity>
        )}

        {onTextAlignChange && (
          <View style={[styles.row, { marginLeft: tokens.spacing.sm }]}>
            {ALIGN_OPTIONS.map(({ value: align, icon }) => (
              <TouchableOpacity
                key={align}
                style={[styles.styleBtn, textAlign === align && styles.styleBtnActive]}
                onPress={() => onTextAlignChange(align)}
                accessibilityLabel={`Align ${align}`}
                accessibilityRole="button"
                accessibilityState={{ selected: textAlign === align }}
              >
                <AtomicText color={textAlign === align ? "primary" : "textSecondary"}>
                  {icon}
                </AtomicText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Color picker */}
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
};

export default React.memo(TextEditorSheet);
