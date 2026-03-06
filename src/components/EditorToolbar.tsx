import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

interface EditorToolbarProps {
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
  styles: {
    bottomToolbar: object;
    toolButton: object;
    toolButtonActive: object;
    aiMagicButton: object;
    [key: string]: object;
  };
}

const ToolButton = ({
  icon,
  label,
  onPress,
  isActive,
  disabled,
  parentStyles,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  isActive?: boolean;
  disabled?: boolean;
  parentStyles: EditorToolbarProps["styles"];
}) => (
  <TouchableOpacity
    style={[parentStyles.toolButton, isActive && parentStyles.toolButtonActive]}
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

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
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
  styles: parentStyles,
  t,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={parentStyles.bottomToolbar}>
      {onUndo && (
        <ToolButton
          icon="arrow-back"
          label={t("photo_editor.undo") || "Undo"}
          onPress={onUndo}
          disabled={!canUndo}
          parentStyles={parentStyles}
        />
      )}

      <ToolButton
        icon="edit"
        label={t("photo_editor.text") || "Text"}
        onPress={onAddText}
        parentStyles={parentStyles}
      />

      {onAddSticker && (
        <ToolButton
          icon="sparkles"
          label={t("photo_editor.sticker") || "Sticker"}
          onPress={onAddSticker}
          parentStyles={parentStyles}
        />
      )}

      {onAIMagic && (
        <TouchableOpacity
          style={parentStyles.aiMagicButton}
          onPress={onAIMagic}
          accessibilityLabel="AI Magic"
          accessibilityRole="button"
        >
          <AtomicIcon name="sparkles" size="lg" customColor={tokens.colors.onPrimary} />
        </TouchableOpacity>
      )}

      {onOpenAdjustments && (
        <ToolButton
          icon="flash"
          label={t("photo_editor.adjust") || "Adjust"}
          onPress={onOpenAdjustments}
          parentStyles={parentStyles}
        />
      )}

      {onOpenFilters && (
        <ToolButton
          icon="brush"
          label={t("photo_editor.filters") || "Filters"}
          onPress={onOpenFilters}
          parentStyles={parentStyles}
        />
      )}

      <ToolButton
        icon="copy"
        label={t("photo_editor.layers") || "Layers"}
        onPress={onOpenLayers}
        parentStyles={parentStyles}
      />

      {onRedo && (
        <ToolButton
          icon="chevron-forward"
          label={t("photo_editor.redo") || "Redo"}
          onPress={onRedo}
          disabled={!canRedo}
          parentStyles={parentStyles}
        />
      )}
    </View>
  );
};
