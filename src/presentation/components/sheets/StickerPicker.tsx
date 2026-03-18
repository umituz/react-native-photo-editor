/**
 * Sticker Picker Sheet Component
 * Bottom sheet for selecting stickers
 */

import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";

const DEFAULT_STICKERS = [
  "😀", "😂", "🤣", "😍", "🥰", "😎", "🤯", "🥳", "😤", "💀",
  "🔥", "❤️", "💯", "✨", "🎉", "🤡", "👀", "🙌", "👏", "💪",
  "🤝", "🙈", "🐶", "🐱", "🦊", "🐸", "🌟", "⭐", "🌈", "☀️",
  "🌙", "💫",
];

interface StickerPickerProps {
  onSelectSticker: (sticker: string) => void;
  stickers?: readonly string[];
}

export const StickerPicker = memo<StickerPickerProps>(({
  onSelectSticker,
  stickers = DEFAULT_STICKERS,
}) => {
  const tokens = useAppDesignTokens();

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall" style={{ marginBottom: tokens.spacing.md }}>
        Stickers
      </AtomicText>
      <View style={styles.grid}>
        {stickers.map((sticker) => (
          <TouchableOpacity
            key={sticker}
            style={{
              width: 60,
              height: 60,
              borderRadius: tokens.borders.radius.md,
              backgroundColor: tokens.colors.surfaceVariant,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => onSelectSticker(sticker)}
            accessibilityLabel={`Sticker ${sticker}`}
            accessibilityRole="button"
          >
            <AtomicText style={{ fontSize: 36 }}>{sticker}</AtomicText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

StickerPicker.displayName = "StickerPicker";

const styles = StyleSheet.create({
  container: { padding: 16, gap: 16 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
