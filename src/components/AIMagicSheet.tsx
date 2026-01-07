import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  AtomicText,
  AtomicIcon,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

interface AIMagicSheetProps {
  onGenerateCaption: (style: string) => void;
  isLoading?: boolean;
  t: (key: string) => string;
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
  t,
}) => {
  const tokens = useAppDesignTokens();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: { padding: 16 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: tokens.colors.textPrimary,
    },
    subtitle: {
      fontSize: 14,
      color: tokens.colors.textSecondary,
      marginBottom: 16,
    },
    grid: { gap: 12 },
    styleCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "transparent",
    },
    styleCardActive: {
      borderColor: tokens.colors.primary,
      backgroundColor: tokens.colors.primaryContainer,
    },
    styleInfo: { flex: 1, marginLeft: 12 },
    styleLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: tokens.colors.textPrimary,
    },
    styleLabelActive: { color: tokens.colors.primary },
    styleDesc: {
      fontSize: 12,
      color: tokens.colors.textSecondary,
      marginTop: 2,
    },
    generateButton: {
      backgroundColor: tokens.colors.primary,
      borderRadius: 999,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      marginTop: 16,
    },
    generateButtonDisabled: { opacity: 0.5 },
    generateButtonText: {
      color: tokens.colors.onPrimary,
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  const handleGenerate = () => {
    if (selectedStyle) {
      onGenerateCaption(selectedStyle);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AtomicIcon name="sparkles" size="md" color="primary" />
        <AtomicText style={styles.title}>AI Caption Magic</AtomicText>
      </View>
      <AtomicText style={styles.subtitle}>
        Choose a style and let AI create the perfect caption
      </AtomicText>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {AI_STYLES.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={[
                styles.styleCard,
                selectedStyle === style.id && styles.styleCardActive,
              ]}
              onPress={() => setSelectedStyle(style.id)}
            >
              <AtomicText style={{ fontSize: 28 }}>
                {style.label.split(" ")[0]}
              </AtomicText>
              <View style={styles.styleInfo}>
                <AtomicText
                  style={[
                    styles.styleLabel,
                    selectedStyle === style.id && styles.styleLabelActive,
                  ]}
                >
                  {style.label.split(" ").slice(1).join(" ")}
                </AtomicText>
                <AtomicText style={styles.styleDesc}>{style.desc}</AtomicText>
              </View>
              {selectedStyle === style.id && (
                <AtomicIcon name="checkmark-circle" size="md" color="primary" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.generateButton,
          !selectedStyle && styles.generateButtonDisabled,
        ]}
        onPress={handleGenerate}
        disabled={!selectedStyle || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={tokens.colors.onPrimary} />
        ) : (
          <>
            <AtomicIcon
              name="sparkles"
              size="sm"
              customColor={tokens.colors.onPrimary}
            />
            <AtomicText style={styles.generateButtonText}>
              Generate Caption
            </AtomicText>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
