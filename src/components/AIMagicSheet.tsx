import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { DEFAULT_AI_STYLES } from "../constants";

interface AIMagicSheetProps {
  /**
   * Called with the selected style ID. Should return a generated caption string.
   * If undefined, the AI button is disabled.
   */
  onGenerateCaption?: (style: string) => Promise<string> | void;
  isLoading?: boolean;
}

export const AIMagicSheet: React.FC<AIMagicSheetProps> = ({
  onGenerateCaption,
  isLoading = false,
}) => {
  const tokens = useAppDesignTokens();
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    header: { flexDirection: "row", alignItems: "center", gap: tokens.spacing.sm },
    grid: { gap: tokens.spacing.sm },
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      borderWidth: 2,
      borderColor: "transparent",
    },
    cardActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primary + "10",
    },
    info: { flex: 1, marginLeft: tokens.spacing.sm },
  });

  const handleGenerate = async () => {
    if (!selected || !onGenerateCaption) return;
    setLoading(true);
    try {
      await onGenerateCaption(selected);
    } finally {
      setLoading(false);
    }
  };

  const isGenerating = isLoading || loading;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AtomicIcon name="sparkles" size="md" color="primary" />
        <AtomicText type="headlineSmall">AI Caption Magic</AtomicText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {DEFAULT_AI_STYLES.map((style) => {
            const isActive = selected === style.id;
            const [emoji, ...words] = style.label.split(" ");
            return (
              <TouchableOpacity
                key={style.id}
                style={[styles.card, isActive && styles.cardActive]}
                onPress={() => setSelected(style.id)}
                accessibilityLabel={style.label}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <AtomicText style={{ fontSize: 24 }}>{emoji}</AtomicText>
                <View style={styles.info}>
                  <AtomicText
                    fontWeight="bold"
                    color={isActive ? "primary" : "textPrimary"}
                  >
                    {words.join(" ")}
                  </AtomicText>
                  <AtomicText type="labelSmall" color="textSecondary">
                    {style.desc}
                  </AtomicText>
                </View>
                {isActive && (
                  <AtomicIcon name="checkmark-circle" size="md" color="primary" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <AtomicButton
        variant="primary"
        disabled={!selected || !onGenerateCaption || isGenerating}
        onPress={handleGenerate}
        loading={isGenerating}
        icon="sparkles"
      >
        Generate Caption
      </AtomicButton>
    </View>
  );
};
