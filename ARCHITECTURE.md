# Architecture - Photo Editor DDD Design

## Overview

This photo editor is built using **Domain-Driven Design (DDD)** principles, ensuring maintainability, testability, and scalability. Every file is kept under 150 lines for clarity.

## Layer Structure

```
src/
├── domain/                    # Business logic (pure TypeScript)
│   ├── entities/
│   │   ├── Layer.ts          # Layer entities (TextLayer, StickerLayer)
│   │   ├── Transform.ts      # Transform value object
│   │   └── Filters.ts        # Filters value object
│   └── services/
│       ├── LayerService.ts   # Layer business logic
│       └── HistoryService.ts # Undo/redo service
│
├── infrastructure/            # External concerns
│   ├── gesture/
│   │   ├── useTransformGesture.ts  # Reusable gesture hook
│   │   └── types.ts          # Gesture types
│   └── history/
│       └── HistoryManager.ts # Legacy wrapper
│
├── application/               # Application logic
│   ├── stores/
│   │   └── EditorStore.ts    # Zustand state store
│   └── hooks/
│       ├── useEditor.ts      # Main editor hook
│       └── useEditorUI.ts    # UI-specific hook
│
└── presentation/              # UI components
    └── components/
        ├── DraggableLayer.tsx    # Unified draggable (replaces Text + Sticker)
        ├── EditorCanvas.tsx
        ├── EditorToolbar.tsx
        ├── FontControls.tsx
        ├── ui/
        │   ├── ColorPicker.tsx
        │   └── Slider.tsx
        └── sheets/
            ├── TextEditorSheet.tsx
            ├── FilterSheet.tsx
            ├── AdjustmentsSheet.tsx
            ├── LayerManager.tsx
            ├── StickerPicker.tsx
            └── AIMagicSheet.tsx
```

## Key Improvements

### 1. Eliminated Code Duplication (~180 lines)
- **Before**: `DraggableText.tsx` (182 lines) and `DraggableSticker.tsx` (162 lines) - duplicate gesture logic
- **After**: `DraggableLayer.tsx` (110 lines) + `useTransformGesture.ts` (130 lines) - reusable gesture hook

### 2. Domain Entities
- Rich domain models with business logic
- Type-safe layer operations
- Value objects for Transform and Filters

### 3. Separated Concerns
- **Domain**: Pure business logic, no framework dependencies
- **Infrastructure**: React Native, gesture handlers
- **Application**: State management, orchestration
- **Presentation**: UI components only

### 4. State Management
- Zustand store for global editor state
- History service for undo/redo
- Clean separation between domain and UI state

## Usage

```tsx
import { PhotoEditor } from "@umituz/react-native-photo-editor";

<PhotoEditor
  imageUri={imageUri}
  onSave={(uri, layers, filters) => console.log({ uri, layers, filters })}
  onClose={() => navigation.goBack()}
  t={(key) => i18n.t(key)}
/>
```

## Testing

Each layer can be tested independently:
- Domain: Pure functions, easy to unit test
- Infrastructure: Gesture hooks with test utils
- Application: Store with test environment
- Presentation: React component testing

## Migration from Old Architecture

The old files have been preserved for backward compatibility:
- Old hooks: `src/hooks/`
- Old components: `src/components/`

New code should use:
- `useEditor()` instead of `usePhotoEditor()`
- `useEditorUI()` instead of `usePhotoEditorUI()`
- Components from `src/presentation/components/`
