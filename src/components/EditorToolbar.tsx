import React from "react";
import { View, TouchableOpacity } from "react-native";
import { 
  AtomicText, 
  AtomicIcon, 
  useAppDesignTokens 
} from "@umituz/react-native-design-system";

interface EditorToolbarProps {
  onAddText: () => void;
  onAddSticker?: () => void;
  onAIMagic?: () => void;
  onOpenFilters?: () => void;
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
  const tokens = useAppDesignTokens();

  const ToolButton = ({ 
    icon, 
    label, 
    onPress, 
    isActive 
  }: { 
    icon: string; 
    label: string; 
    onPress: () => void; 
    isActive?: boolean;
  }) => (
    <TouchableOpacity
      style={[styles.toolButton, isActive && styles.toolButtonActive]}
      onPress={onPress}
    >
      <AtomicIcon 
        name={icon} 
        size="md" 
        color={isActive ? "primary" : "textSecondary"} 
      />
      <AtomicText 
        type="labelSmall" 
        color={isActive ? "primary" : "textSecondary"}
      >
        {label}
      </AtomicText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.bottomToolbar}>
      <ToolButton icon="text" label="Text" onPress={onAddText} />
      
      {onAddSticker && (
        <ToolButton icon="happy" label={t("editor.sticker")} onPress={onAddSticker} />
      )}
      
      {onAIMagic && (
        <TouchableOpacity style={styles.aiMagicButton} onPress={onAIMagic}>
          <AtomicIcon name="sparkles" size="lg" customColor={tokens.colors.onPrimary} />
        </TouchableOpacity>
      )}

      {onOpenFilters && (
        <ToolButton icon="color-filter" label={t("editor.filters")} onPress={onOpenFilters} />
      )}
      
      <ToolButton icon="layers" label="Layers" onPress={onOpenLayers} />
    </View>
  );
};
