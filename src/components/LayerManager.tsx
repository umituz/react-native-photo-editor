import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, useAppDesignTokens } from "@umituz/react-native-design-system";
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
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      marginBottom: tokens.spacing.xs,
      borderWidth: 2,
      borderColor: "transparent",
    },
    active: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primary + "10",
    },
    info: { flex: 1, marginLeft: tokens.spacing.sm },
  });

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Layers</AtomicText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {layers.length === 0 ? (
          <AtomicText color="textSecondary" style={{ textAlign: "center", padding: tokens.spacing.xl }}>
            No layers yet
          </AtomicText>
        ) : (
          layers.map((layer) => (
            <TouchableOpacity
              key={layer.id}
              style={[styles.item, activeLayerId === layer.id && styles.active]}
              onPress={() => onSelectLayer(layer.id)}
            >
              <AtomicIcon
                name={layer.type === "text" ? "text" : "happy"}
                size="md"
                color={activeLayerId === layer.id ? "primary" : "textSecondary"}
              />
              <View style={styles.info}>
                <AtomicText type="labelSmall" color="textSecondary">
                  {layer.type.toUpperCase()}
                </AtomicText>
                <AtomicText fontWeight="bold" numberOfLines={1}>
                  {layer.type === "text" ? (layer as TextLayer).text || t("editor.untitled") : "Sticker"}
                </AtomicText>
              </View>
              <TouchableOpacity onPress={() => onDeleteLayer(layer.id)} style={{ padding: tokens.spacing.xs }}>
                <AtomicIcon name="trash" size="sm" color="error" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};
