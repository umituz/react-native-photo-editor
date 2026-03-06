import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { Layer, TextLayer } from "../types";

interface LayerManagerProps {
  layers: Layer[];
  activeLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onDuplicateLayer?: (id: string) => void;
  onMoveLayerUp?: (id: string) => void;
  onMoveLayerDown?: (id: string) => void;
  t: (key: string) => string;
}

export const LayerManager: React.FC<LayerManagerProps> = ({
  layers,
  activeLayerId,
  onSelectLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onMoveLayerUp,
  onMoveLayerDown,
  t,
}) => {
  const tokens = useAppDesignTokens();

  const styles = StyleSheet.create({
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    item: {
      flexDirection: "row",
      alignItems: "center",
      padding: tokens.spacing.sm,
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
    actions: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.xs,
    },
    actionBtn: {
      padding: tokens.spacing.xs,
      borderRadius: tokens.borders.radius.sm,
    },
  });

  const sortedLayers = [...layers].reverse(); // top layer first in list

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Layers</AtomicText>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedLayers.length === 0 ? (
          <AtomicText
            color="textSecondary"
            style={{ textAlign: "center", padding: tokens.spacing.xl }}
          >
            No layers yet
          </AtomicText>
        ) : (
          sortedLayers.map((layer, idx) => {
            const isActive = activeLayerId === layer.id;
            const label =
              layer.type === "text"
                ? (layer as TextLayer).text || t("editor.untitled") || "Untitled"
                : "Sticker";
            const isTop = idx === 0;
            const isBottom = idx === sortedLayers.length - 1;

            return (
              <TouchableOpacity
                key={layer.id}
                style={[styles.item, isActive && styles.active]}
                onPress={() => onSelectLayer(layer.id)}
                accessibilityLabel={`${layer.type} layer: ${label}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <AtomicIcon
                  name={layer.type === "text" ? "edit" : "image"}
                  size="sm"
                  color={isActive ? "primary" : "textSecondary"}
                />
                <View style={styles.info}>
                  <AtomicText type="labelSmall" color="textSecondary">
                    {layer.type.toUpperCase()}
                  </AtomicText>
                  <AtomicText fontWeight="bold" numberOfLines={1}>
                    {label}
                  </AtomicText>
                </View>

                <View style={styles.actions}>
                  {onMoveLayerUp && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => onMoveLayerUp(layer.id)}
                      disabled={isTop}
                      accessibilityLabel="Move layer up"
                      accessibilityRole="button"
                    >
                      <AtomicIcon
                        name="chevron-forward"
                        size="sm"
                        color={isTop ? "textSecondary" : "textPrimary"}
                      />
                    </TouchableOpacity>
                  )}

                  {onMoveLayerDown && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => onMoveLayerDown(layer.id)}
                      disabled={isBottom}
                      accessibilityLabel="Move layer down"
                      accessibilityRole="button"
                    >
                      <AtomicIcon
                        name="chevron-back"
                        size="sm"
                        color={isBottom ? "textSecondary" : "textPrimary"}
                      />
                    </TouchableOpacity>
                  )}

                  {onDuplicateLayer && (
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => onDuplicateLayer(layer.id)}
                      accessibilityLabel={`Duplicate ${label}`}
                      accessibilityRole="button"
                    >
                      <AtomicIcon name="copy" size="sm" color="textSecondary" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => onDeleteLayer(layer.id)}
                    accessibilityLabel={`Delete ${label}`}
                    accessibilityRole="button"
                  >
                    <AtomicIcon name="trash-outline" size="sm" color="error" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};
