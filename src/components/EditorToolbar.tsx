import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system";

interface EditorToolbarProps {
  onAddText: () => void;
  onAddSticker: () => void;
  onAIMagic?: () => void; // Optional AI integration
  onOpenFilters: () => void;
  onOpenLayers: () => void;
  styles: Record<string, object>;
  t: (key: string) => string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
  onAddText,
  onAddSticker,
  onAIMagic,
  onOpenFilters,
  onOpenLayers,
  styles,
  t,
}) => {
  return (
    <View style={styles.bottomToolbar}>
      <TouchableOpacity
        style={[styles.toolButton, styles.toolButtonActive]}
        onPress={onAddText}
      >
        <AtomicIcon name="text" size="md" color="primary" />
        <AtomicText style={[styles.toolLabel, styles.toolLabelActive]}>
          Text
        </AtomicText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolButton} onPress={onAddSticker}>
        <AtomicIcon name="happy" size="md" color="textSecondary" />
        <AtomicText style={styles.toolLabel}>{t("editor.sticker")}</AtomicText>
      </TouchableOpacity>
      {onAIMagic && (
        <TouchableOpacity style={styles.aiMagicButton} onPress={onAIMagic}>
          <AtomicIcon name="sparkles" size="lg" customColor="#fff" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.toolButton} onPress={onOpenFilters}>
        <AtomicIcon name="color-filter" size="md" color="textSecondary" />
        <AtomicText style={styles.toolLabel}>{t("editor.filters")}</AtomicText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toolButton} onPress={onOpenLayers}>
        <AtomicIcon name="layers" size="md" color="textSecondary" />
        <AtomicText style={styles.toolLabel}>Layer</AtomicText>
      </TouchableOpacity>
    </View>
  );
};
