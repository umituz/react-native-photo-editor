import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";
import { Layer, TextLayer } from "../types";

interface LayerManagerProps {
  layers: Layer[];
  activeLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  t: (key: string) => string;
}

export const LayerManager: React.FC<LayerManagerProps> = ({
  layers,
  activeLayerId,
  onSelectLayer,
  onDeleteLayer,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: { padding: 16 },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: tokens.colors.textPrimary,
      marginBottom: 16,
    },
    emptyText: {
      color: tokens.colors.textSecondary,
      textAlign: "center",
      padding: 24,
    },
    layerItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: 12,
      marginBottom: 8,
      borderWidth: 2,
      borderColor: "transparent",
    },
    layerItemActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primaryContainer,
    },
    layerInfo: { flex: 1, marginLeft: 12 },
    layerType: { fontSize: 12, color: tokens.colors.textSecondary },
    layerText: {
      fontSize: 14,
      color: tokens.colors.textPrimary,
      fontWeight: "500",
    },
    deleteButton: { padding: 8 },
  });

  return (
    <View style={styles.container}>
      <AtomicText style={styles.title}>Layers</AtomicText>
      {layers.length === 0 ? (
        <AtomicText style={styles.emptyText}>
          No layers yet. Add text or stickers!
        </AtomicText>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {layers.map((layer) => (
            <TouchableOpacity
              key={layer.id}
              style={[
                styles.layerItem,
                activeLayerId === layer.id && styles.layerItemActive,
              ]}
              onPress={() => onSelectLayer(layer.id)}
            >
              <AtomicIcon
                name={layer.type === "text" ? "text" : "happy"}
                size="md"
                color={activeLayerId === layer.id ? "primary" : "textSecondary"}
              />
              <View style={styles.layerInfo}>
                <AtomicText style={styles.layerType}>
                  {layer.type === "text" ? "Text" : "Sticker"}
                </AtomicText>
                <AtomicText style={styles.layerText} numberOfLines={1}>
                  {layer.type === "text"
                    ? (layer as TextLayer).text || t("editor.untitled")
                    : "Emoji"}
                </AtomicText>
              </View>
              {layers.length > 1 && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDeleteLayer(layer.id)}
                >
                  <AtomicIcon name="trash" size="sm" color="error" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
