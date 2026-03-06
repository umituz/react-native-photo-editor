import React, { useMemo } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { AtomicText } from "@umituz/react-native-design-system/atoms";
import { useAppDesignTokens } from "@umituz/react-native-design-system/theme";
import { DEFAULT_STICKERS } from "../constants";

interface StickerPickerProps {
  onSelectSticker: (sticker: string) => void;
  stickers?: readonly string[];
}

export const StickerPicker: React.FC<StickerPickerProps> = ({
  onSelectSticker,
  stickers = DEFAULT_STICKERS,
}) => {
  const tokens = useAppDesignTokens();

  const styles = useMemo(() => StyleSheet.create({
    container: { padding: tokens.spacing.md, gap: tokens.spacing.md },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: tokens.spacing.sm },
    sticker: {
      width: 50,
      height: 50,
      borderRadius: tokens.borders.radius.sm,
      backgroundColor: tokens.colors.surfaceVariant,
      alignItems: "center",
      justifyContent: "center",
    },
  }), [tokens]);

  return (
    <View style={styles.container}>
      <AtomicText type="headlineSmall">Stickers</AtomicText>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {stickers.map((s, i) => (
            <TouchableOpacity key={`${s}-${i}`} style={styles.sticker} onPress={() => onSelectSticker(s)}>
              <AtomicText style={{ fontSize: 32 }}>{s}</AtomicText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(StickerPicker);
