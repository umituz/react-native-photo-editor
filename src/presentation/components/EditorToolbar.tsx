/**
 * Editor Toolbar Component
 * Main toolbar with action buttons
 */

import React, { memo } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface ToolButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  isActive?: boolean;
  disabled?: boolean;
  isPrimary?: boolean;
}

const ToolButton = memo<ToolButtonProps>(({ icon, label, onPress, isActive, disabled, isPrimary }) => {
  const tokens = useAppDesignTokens();

  if (isPrimary) {
    return (
      <TouchableOpacity
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: tokens.colors.primary,
          alignItems: "center",
          justifyContent: "center",
          elevation: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        onPress={onPress}
        accessibilityLabel={label}
        accessibilityRole="button"
      >
        <AtomicIcon name={icon as "sparkles"} size="lg" customColor={tokens.colors.onPrimary} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        gap: tokens.spacing.xs,
        opacity: disabled ? 0.5 : 1,
      }}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive, disabled }}
    >
      <AtomicIcon
        name={icon as "edit"}
        size="md"
        color={disabled ? "textSecondary" : isActive ? "primary" : "textSecondary"}
      />
      <AtomicText
        type="labelSmall"
        color={disabled ? "textSecondary" : isActive ? "primary" : "textSecondary"}
      >
        {label}
      </AtomicText>
    </TouchableOpacity>
  );
});

ToolButton.displayName = "ToolButton";

export interface EditorToolbarProps {
  onAddText: () => void;
  onAddSticker?: () => void;
  onOpenFilters?: () => void;
  onOpenAdjustments?: () => void;
  onOpenLayers: () => void;
  onAIMagic?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  t: (key: string) => string;
}

export const EditorToolbar = memo<EditorToolbarProps>(({
  onAddText,
  onAddSticker,
  onOpenFilters,
  onOpenAdjustments,
  onOpenLayers,
  onAIMagic,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  t,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.sm,
        backgroundColor: tokens.colors.surface,
        borderTopWidth: 1,
        borderTopColor: tokens.colors.border,
        gap: tokens.spacing.sm,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: tokens.spacing.md }}>
          {onUndo && (
            <ToolButton
              icon="arrow-back"
              label={t("photo_editor.undo") || "Undo"}
              onPress={onUndo}
              disabled={!canUndo}
            />
          )}

          <ToolButton
            icon="edit"
            label={t("photo_editor.text") || "Text"}
            onPress={onAddText}
          />

          {onAddSticker && (
            <ToolButton
              icon="sparkles"
              label={t("photo_editor.sticker") || "Sticker"}
              onPress={onAddSticker}
            />
          )}

          {onOpenAdjustments && (
            <ToolButton
              icon="flash"
              label={t("photo_editor.adjust") || "Adjust"}
              onPress={onOpenAdjustments}
            />
          )}

          {onOpenFilters && (
            <ToolButton
              icon="brush"
              label={t("photo_editor.filters") || "Filters"}
              onPress={onOpenFilters}
            />
          )}

          <ToolButton
            icon="copy"
            label={t("photo_editor.layers") || "Layers"}
            onPress={onOpenLayers}
          />

          {onRedo && (
            <ToolButton
              icon="chevron-forward"
              label={t("photo_editor.redo") || "Redo"}
              onPress={onRedo}
              disabled={!canRedo}
            />
          )}
        </View>
      </ScrollView>

      {onAIMagic && (
        <View style={{ marginLeft: tokens.spacing.sm }}>
          <ToolButton
            icon="sparkles"
            label="AI"
            onPress={onAIMagic}
            isPrimary
          />
        </View>
      )}
    </View>
  );
});

EditorToolbar.displayName = "EditorToolbar";
