/**
 * Enhanced ScreenLayout Example
 * 
 * This demonstrates the recommended usage of ScreenLayout with SafeAreaProvider
 */

import React from 'react';
import { View, Text } from 'react-native';
import {
    SafeAreaProvider,
    ScreenLayout,
    ScreenHeader,
    AtomicButton,
    AtomicText
} from '../../index';

// 1. Wrap your app root with SafeAreaProvider
export function App() {
    return (
        <SafeAreaProvider>
            <View />
        </SafeAreaProvider>
    );
}

// 2. Use ScreenLayout in your screens
export function HomeScreen() {
    return (
        <ScreenLayout
            // Safe area edges - default is ['top']
            edges={['top']}
            // Enable scrolling - default is true
            scrollable={true}
            // Optional header
            header={
                <ScreenHeader
                    title="Home"
                />
            }
            // Optional footer
            footer={
                <View style={{ padding: 16 }}>
                    <AtomicButton onPress={() => console.log('Action')}>
                        Action Button
                    </AtomicButton>
                </View>
            }
        >
            <AtomicText type="headlineLarge">Welcome to Home</AtomicText>
            <AtomicText type="bodyMedium">
                This screen uses ScreenLayout with default safe area configuration.
            </AtomicText>
        </ScreenLayout>
    );
}

// 3. Modal screen example with different safe area edges
export function ModalScreen() {
    return (
        <ScreenLayout
            // Full safe area for modals
            edges={['top', 'bottom']}
            scrollable={false}
        >
            <AtomicText type="headlineMedium">Modal Content</AtomicText>
        </ScreenLayout>
    );
}

// 4. Screen with custom scroll behavior
export function CustomScrollScreen() {
    return (
        <ScreenLayout scrollable={false}>
            {/* Your custom scroll component */}
            <View />
        </ScreenLayout>
    );
}

// 5. Using safe area hooks directly
import { useContentSafeAreaPadding, useSafeAreaInsets } from '../../index';

export function CustomComponent() {
    const insets = useSafeAreaInsets();
    const { paddingBottom } = useContentSafeAreaPadding();

    return (
        <View style={{ paddingTop: insets.top, paddingBottom }}>
            <Text>Custom Safe Area Usage</Text>
        </View>
    );
}
