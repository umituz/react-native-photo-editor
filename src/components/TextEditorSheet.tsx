import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { AtomicText, useAppDesignTokens, AtomicButton } from "@umituz/react-native-design-system";

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
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    input: {
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      padding: tokens.spacing.md,
      fontSize: 18,
      color: tokens.colors.textPrimary,
      textAlign: "center",
      minHeight: 120,
    },
  });

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">{t("editor.add_text")}</AtomicText>
      
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={t("editor.tap_to_edit")}
        placeholderTextColor={tokens.colors.textSecondary}
        style={styles.input}
        multiline
        autoFocus
      />

      <AtomicButton variant="primary" onPress={onSave}>
        {t("common.save")}
      </AtomicButton>
    </View>
  );
};

export default React.memo(TextEditorSheet);
