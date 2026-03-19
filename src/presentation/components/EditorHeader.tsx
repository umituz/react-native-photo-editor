/**
 * Editor Header Component
 * Header with close, title, and save buttons
 */

import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface EditorHeaderProps {
  title: string;
  saveLabel: string;
  onClose: () => void;
  onSave: () => void;
}

export function EditorHeader({ title, saveLabel, onClose, onSave }: EditorHeaderProps) {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.border,
      }}
    >
      <TouchableOpacity onPress={onClose} accessibilityLabel="Close editor" accessibilityRole="button">
        <AtomicIcon name="close" size="md" color="textPrimary" />
      </TouchableOpacity>

      <AtomicText type="headlineSmall" style={{ flex: 1, textAlign: "center" as const }}>
        {title}
      </AtomicText>

      <TouchableOpacity onPress={onSave} accessibilityLabel="Save" accessibilityRole="button">
        <AtomicText fontWeight="bold" color="primary">
          {saveLabel}
        </AtomicText>
      </TouchableOpacity>
    </View>
  );
}
