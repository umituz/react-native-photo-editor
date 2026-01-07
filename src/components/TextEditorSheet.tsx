import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface TextEditorSheetProps {
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  t: (key: string) => string;
}

export const TextEditorSheet: React.FC<TextEditorSheetProps> = ({
  value,
  onChange,
  onSave,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
    input: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: 12,
      padding: 16,
      fontSize: 18,
      color: tokens.colors.textPrimary,
      marginBottom: 16,
      textAlign: "center",
    },
    saveButton: {
      backgroundColor: tokens.colors.primary,
      borderRadius: 999,
      padding: 16,
      alignItems: "center",
    },
    saveButtonText: { color: tokens.colors.onPrimary, fontWeight: "bold" },
  });

  return (
    <View style={styles.container}>
      <AtomicText style={styles.title}>{t("editor.add_text")}</AtomicText>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={t("editor.tap_to_edit")}
        placeholderTextColor={tokens.colors.textSecondary}
        style={styles.input}
        multiline
        autoFocus
      />
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <AtomicText style={styles.saveButtonText}>
          {t("common.save")}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
};
