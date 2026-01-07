import React from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import {
  AtomicText,
  useAppDesignTokens,
} from "@umituz/react-native-design-system";

const STICKERS = [
  "😀",
  "😂",
  "🤣",
  "😍",
  "🥰",
  "😎",
  "🤯",
  "🥳",
  "😤",
  "💀",
  "🔥",
  "❤️",
  "💯",
  "✨",
  "🎉",
  "🤡",
  "👀",
  "🙌",
  "👏",
  "💪",
  "🤝",
  "🙈",
  "🐶",
  "🐱",
  "🦊",
  "🐸",
  "🌟",
  "⭐",
  "🌈",
  "☀️",
  "🌙",
  "💫",
];

interface StickerPickerProps {
  onSelectSticker: (sticker: string) => void;
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onSelectSticker,
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
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    sticker: {
      width: 56,
      height: 56,
      borderRadius: 12,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
    stickerText: { fontSize: 32 },
  });

  return (
    <View style={styles.container}>
      <AtomicText style={styles.title}>Emoji</AtomicText>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {STICKERS.map((sticker, index) => (
            <TouchableOpacity
              key={index}
              style={styles.sticker}
              onPress={() => onSelectSticker(sticker)}
            >
              <AtomicText style={styles.stickerText}>{sticker}</AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
