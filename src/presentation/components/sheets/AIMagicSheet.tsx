/**
 * AI Magic Sheet Component
 * Bottom sheet for AI-powered features
 */

import React, { memo, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText, AtomicButton } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

const AI_STYLES = [
  { id: "viral", label: "✨ Viral", desc: "Catchy & shareable" },
  { id: "funny", label: "😂 Funny", desc: "Humor that connects" },
  { id: "savage", label: "🔥 Savage", desc: "Bold & edgy" },
  { id: "wholesome", label: "💕 Wholesome", desc: "Warm & positive" },
  { id: "sarcastic", label: "😏 Sarcastic", desc: "Witty & ironic" },
  { id: "relatable", label: "🎯 Relatable", desc: "Everyone gets it" },
];

interface AIMagicSheetProps {
  onGenerateCaption: (style: string) => Promise<string> | void;
}

export const AIMagicSheet = memo<AIMagicSheetProps>(({ onGenerateCaption }) => {
  const tokens = useAppDesignTokens();
  const [selectedStyle, setSelectedStyle] = useState<string>("viral");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      await onGenerateCaption(selectedStyle);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">AI Magic ✨</AtomicText>
      <AtomicText type="bodyMedium" color="textSecondary">
        Let AI create the perfect caption for your photo
      </AtomicText>

      <View style={styles.grid}>
        {AI_STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleCard,
              {
                backgroundColor: tokens.colors.surfaceVariant,
                borderWidth: selectedStyle === style.id ? 2 : 1,
                borderColor: selectedStyle === style.id ? tokens.colors.primary : tokens.colors.border,
              },
            ]}
            onPress={() => setSelectedStyle(style.id)}
            accessibilityLabel={style.label}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedStyle === style.id }}
          >
            <AtomicText type="labelLarge" fontWeight="bold">
              {style.label}
            </AtomicText>
            <AtomicText type="labelSmall" color="textSecondary">
              {style.desc}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </View>

      <AtomicButton
        variant="primary"
        onPress={handleGenerate}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Caption"}
      </AtomicButton>
    </View>
  );
});

AIMagicSheet.displayName = "AIMagicSheet";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  styleCard: {
    flex: 1,
    minWidth: "45%",
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
});
