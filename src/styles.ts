import { StyleSheet } from "react-native";
import { DesignTokens } from "@umituz/react-native-design-system/theme";
import { EdgeInsets } from "react-native-safe-area-context";

export const createEditorStyles = (tokens: DesignTokens, insets: EdgeInsets) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: tokens.colors.background },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.md,
      paddingTop: insets.top + tokens.spacing.sm,
      paddingBottom: tokens.spacing.sm,
      gap: tokens.spacing.md,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
    },
    scrollContent: {
      paddingHorizontal: tokens.spacing.md,
      paddingBottom: 120,
      gap: tokens.spacing.lg,
    },
    canvas: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: tokens.borders.radius.lg,
      overflow: "hidden",
      backgroundColor: tokens.colors.surfaceVariant,
    },
    canvasImage: { width: "100%", height: "100%" },
    controlsPanel: {
      padding: tokens.spacing.md,
      backgroundColor: tokens.colors.surfaceVariant,
      borderRadius: tokens.borders.radius.md,
      gap: tokens.spacing.md,
    },
    sliderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    sliderLabel: {
      flexDirection: "row",
      alignItems: "center",
      gap: tokens.spacing.xs,
    },
    fontRow: {
      flexDirection: "row",
      gap: tokens.spacing.sm,
      flexWrap: "wrap",
    },
    fontChip: {
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.sm,
      backgroundColor: tokens.colors.surface,
      borderRadius: tokens.borders.radius.sm,
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    fontChipActive: {
      backgroundColor: tokens.colors.primary,
      borderColor: tokens.colors.primary,
    },
    bottomToolbar: {
      position: "absolute",
      bottom: insets.bottom + tokens.spacing.md,
      left: tokens.spacing.md,
      right: tokens.spacing.md,
      backgroundColor: tokens.colors.surface,
      borderRadius: 999,
      padding: tokens.spacing.xs,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      borderWidth: 1,
      borderColor: tokens.colors.border,
    },
    toolButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: tokens.spacing.sm,
      borderRadius: 999,
    },
    toolButtonActive: {
      backgroundColor: tokens.colors.primary + "20",
    },
    aiMagicButton: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: tokens.colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },
  });
