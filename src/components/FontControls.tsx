import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { AtomicText, AtomicIcon } from "@umituz/react-native-design-system";

interface FontControlsProps {
  fontSize: number;
  selectedFont: string;
  fonts: readonly string[];
  onFontSizeChange: (size: number) => void;
  onFontSelect: (font: string) => void;
  styles: Record<string, object>;
}

export const FontControls: React.FC<FontControlsProps> = ({
  fontSize,
  selectedFont,
  fonts,
  onFontSizeChange,
  onFontSelect,
  styles,
}) => {
  return (
    <View style={styles.controlsPanel}>
      <View style={styles.sliderRow}>
        <View style={styles.sliderLabel}>
          <AtomicIcon name="text" size="sm" color="textSecondary" />
          <AtomicText style={styles.sliderLabelText}>Text Size</AtomicText>
        </View>
        <AtomicText style={styles.sliderValue}>{fontSize}px</AtomicText>
      </View>
      <View style={styles.sliderTrack}>
        <View
          style={[
            styles.sliderFill,
            { width: `${((fontSize - 12) / 84) * 100}%` },
          ]}
        />
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 16 }}>
        <TouchableOpacity
          onPress={() => onFontSizeChange(fontSize - 4)}
          style={styles.fontChip}
        >
          <AtomicText style={styles.fontChipText}>-</AtomicText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onFontSizeChange(fontSize + 4)}
          style={styles.fontChip}
        >
          <AtomicText style={styles.fontChipText}>+</AtomicText>
        </TouchableOpacity>
      </View>

      <AtomicText style={styles.fontLabel}>Font Style</AtomicText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.fontRow}
      >
        {fonts.map((font) => (
          <TouchableOpacity
            key={font}
            style={[
              styles.fontChip,
              selectedFont === font && styles.fontChipActive,
            ]}
            onPress={() => onFontSelect(font)}
          >
            <AtomicText
              style={[
                styles.fontChipText,
                selectedFont === font && styles.fontChipTextActive,
              ]}
            >
              {font}
            </AtomicText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(FontControls);
