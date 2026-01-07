# @umituz/react-native-haptics

Haptic feedback (vibration) for React Native using expo-haptics with impact, notification, and selection feedback patterns.

## Installation

```bash
npm install @umituz/react-native-haptics
```

## Peer Dependencies

- `react` >= 18.2.0
- `react-native` >= 0.74.0
- `expo-haptics` *

## Features

- ✅ Impact feedback (light, medium, heavy)
- ✅ Notification feedback (success, warning, error)
- ✅ Selection feedback (pickers, sliders)
- ✅ Custom haptic patterns
- ✅ Convenience methods for common interactions
- ✅ Silent failure (no crashes if unsupported)
- ✅ Platform-agnostic (iOS + Android)

## Usage

### Basic Haptics

```typescript
import { useHaptics } from '@umituz/react-native-haptics';

const haptics = useHaptics();

// Button press
<TouchableOpacity onPress={() => haptics.buttonPress()}>
  <Text>Click Me</Text>
</TouchableOpacity>

// Success feedback
const handleSave = async () => {
  await saveData();
  haptics.success();
};

// Error feedback
haptics.error();
```

### Selection Change (Sliders, Pickers)

```typescript
import { useHaptics } from '@umituz/react-native-haptics';

const haptics = useHaptics();

<Slider
  value={value}
  onValueChange={(val) => {
    setValue(val);
    haptics.selectionChange();
  }}
/>
```

### Custom Patterns

```typescript
import { useHaptics } from '@umituz/react-native-haptics';

const haptics = useHaptics();

// Impact with specific style
haptics.impact('heavy');

// Notification with specific type
haptics.notification('warning');

// Custom pattern
haptics.pattern('long_press');
```

### Direct Service Usage (Rare)

```typescript
import { HapticService } from '@umituz/react-native-haptics';

// Use when you can't use hooks (outside components)
await HapticService.buttonPress();
await HapticService.success();
```

## Common Patterns

- `buttonPress()` - Light impact
- `success()` - Success notification
- `error()` - Error notification
- `warning()` - Warning notification
- `delete()` - Medium impact
- `refresh()` - Medium impact
- `selectionChange()` - Selection feedback
- `longPress()` - Heavy impact

## API

### Hooks

- `useHaptics()`: Main hook for haptic feedback

### Services

- `HapticService`: Direct service access for haptic operations

### Utilities

- `HapticUtils`: Utility functions for haptic pattern management

## License

MIT

