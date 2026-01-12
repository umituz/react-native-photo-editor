import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicIcon, useAppDesignTokens, AtomicButton } from "@umituz/react-native-design-system";

interface AIMagicSheetProps {
  onGenerateCaption: (style: string) => void;
  isLoading?: boolean;
}

const AI_STYLES = [
  { id: "viral", label: "✨ Viral", desc: "Catchy & shareable" },
  { id: "funny", label: "😂 Funny", desc: "Humor that connects" },
  { id: "savage", label: "🔥 Savage", desc: "Bold & edgy" },
  { id: "wholesome", label: "💕 Wholesome", desc: "Warm & positive" },
  { id: "sarcastic", label: "😏 Sarcastic", desc: "Witty & ironic" },
  { id: "relatable", label: "🎯 Relatable", desc: "Everyone gets it" },
];

export const AIMagicSheet: React.FC<AIMagicSheetProps> = ({
  onGenerateCaption,
  isLoading = false,
}) => {
  const tokens = useAppDesignTokens();
  const [selected, setSelected] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AtomicIcon name="sparkles" size="md" color="primary" />
        <AtomicText type="headlineSmall">AI Caption Magic</AtomicText>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {AI_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[styles.card, selected === style.id && styles.cardActive]}
              onPress={() => setSelected(style.id)}
            >
              <AtomicText style={{ fontSize: 24 }}>{style.label.split(" ")[0]}</AtomicText>
              <View style={styles.info}>
                <AtomicText fontWeight="bold" color={selected === style.id ? "primary" : "textPrimary"}>
                  {style.label.split(" ").slice(1).join(" ")}
                </AtomicText>
                <AtomicText type="labelSmall" color="textSecondary">{style.desc}</AtomicText>
              </View>
              {selected === style.id && <AtomicIcon name="checkmark-circle" size="md" color="primary" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AtomicButton
        variant="primary"
        disabled={!selected || isLoading}
        onPress={() => selected && onGenerateCaption(selected)}
        loading={isLoading}
        icon="sparkles"
      >
        Generate Caption
      </AtomicButton>
    </View>
  );
};
