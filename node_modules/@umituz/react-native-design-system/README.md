# @umituz/react-native-design-system

Universal design system for React Native apps following Domain-Driven Design (DDD) architecture with Material Design 3 principles.

## ✨ Features

- 🎨 **Material Design 3** - Modern, accessible UI components
- ⚛️ **Pure React Native** - No external UI library dependencies (lightweight!)
- 🏗️ **Atomic Design** - Organized component hierarchy (Atoms → Molecules → Organisms)
- 🧬 **DDD Architecture** - Clean domain-driven structure
- 🌓 **Theme Support** - Built-in light/dark mode
- 📱 **Responsive** - Adaptive layouts for phones and tablets
- ♿ **Accessible** - WCAG AA compliant components
- 📦 **Zero Config** - Works out of the box
- 🪶 **Lightweight** - Smaller bundle size (no Paper dependency)

## 📦 Installation

```bash
npm install @umituz/react-native-design-system
```

### Peer Dependencies

```bash
npm install react@18.3.1 react-native@0.76.3 react-native-reanimated@~3.10.1 react-native-svg@^15.0.0
```

> **v1.3.0 Breaking Change**: React Native Paper dependency removed! All components now use pure React Native implementation for lighter bundle size and full control over styling.

## 🚀 Usage

```typescript
import {
  AtomicButton,
  AtomicText,
  AtomicInput,
  ScreenLayout,
  useAppDesignTokens,
} from '@umituz/react-native-design-system';

const MyScreen = () => {
  const tokens = useAppDesignTokens();

  return (
    <ScreenLayout>
      <AtomicText type="headingLarge">Welcome</AtomicText>
      <AtomicInput
        label="Email"
        placeholder="Enter your email"
      />
      <AtomicButton
        variant="primary"
        onPress={() => console.log('Pressed')}
      >
        Submit
      </AtomicButton>
    </ScreenLayout>
  );
};
```

## 🧩 Components

### Atoms (Primitive UI Components)
- `AtomicButton` - Pure React Native buttons with variants (primary, secondary, outline, text, danger)
- `AtomicText` - Typography with MD3 type scale (pure RN Text)
- `AtomicInput` - Text inputs with validation states (pure RN TextInput)
- `AtomicTextArea` - Multiline inputs with character counter (pure RN TextInput)
- `AtomicCard` - Container cards with elevation (pure RN View)
- `AtomicIcon` - Ionicons with 1,300+ icons
- `AtomicSwitch` - Toggle switches
- `AtomicBadge` - Status badges
- `AtomicProgress` - Progress indicators
- And 15+ more...

### Molecules (Composite Components)
- `FormField` - Input with label and error
- `ListItem` - Standard list item
- `SearchBar` - Search input with icon
- `EmptyState` - Empty state placeholder
- `ScreenHeader` - Screen title header
- And more...

### Organisms (Complex Patterns)
- `ScreenLayout` - Screen wrapper with safe area (pure RN View)
- `AppHeader` - Application header
- `FormContainer` - Form layout container with keyboard handling (pure RN View + ScrollView)

## 🎨 Design Tokens

```typescript
import { useAppDesignTokens } from '@umituz/react-native-design-system';

const tokens = useAppDesignTokens();

// Colors
tokens.colors.primary
tokens.colors.secondary
tokens.colors.background
tokens.colors.textPrimary

// Spacing
tokens.spacing.xs  // 4
tokens.spacing.sm  // 8
tokens.spacing.md  // 16
tokens.spacing.lg  // 24
tokens.spacing.xl  // 32

// Typography
tokens.typography.headingLarge
tokens.typography.bodyMedium
tokens.typography.caption
```

## 📱 Responsive Utilities

```typescript
import { useResponsive } from '@umituz/react-native-design-system';

const responsive = useResponsive();

// Device detection
responsive.isSmallPhone
responsive.isTablet
responsive.isLandscape

// Responsive values (pre-calculated)
responsive.logoSize
responsive.inputHeight
responsive.horizontalPadding
```

## 🌓 Theme Integration

This package works seamlessly with `@umituz/react-native-design-system-theme`:

```typescript
import { ThemeProvider } from '@umituz/react-native-design-system-theme';
import { ScreenLayout } from '@umituz/react-native-design-system';

const App = () => (
  <ThemeProvider>
    <ScreenLayout>
      {/* Your app */}
    </ScreenLayout>
  </ThemeProvider>
);
```

## 📖 Documentation

Full documentation: [Coming Soon]

## 🤝 Contributing

Contributions welcome! This is the universal design system used across 100+ React Native apps.

## 📄 License

MIT © Umit Uz
