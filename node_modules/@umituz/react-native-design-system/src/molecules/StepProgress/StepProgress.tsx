import React, { useMemo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useAppDesignTokens } from '../../theme/hooks/useAppDesignTokens';

export interface StepProgressProps {
    currentStep: number;
    totalSteps: number;
    style?: ViewStyle;
}

export const StepProgress: React.FC<StepProgressProps> = ({
    currentStep,
    totalSteps,
    style,
}) => {
    const tokens = useAppDesignTokens();

    const styles = useMemo(
        () =>
            StyleSheet.create({
                container: {
                    flexDirection: "row",
                    gap: 8,
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                },
                step: {
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: tokens.colors.border,
                },
                activeStep: {
                    backgroundColor: tokens.colors.primary,
                },
            }),
        [tokens],
    );

    return (
        <View style={[styles.container, style]}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[styles.step, index < currentStep && styles.activeStep]}
                />
            ))}
        </View>
    );
};
