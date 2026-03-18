# Migration Guide - Old to New Architecture

## What Changed?

### Before
```
src/
├── hooks/
│   ├── usePhotoEditor.ts       # 173 lines - mixed concerns
│   └── usePhotoEditorUI.ts     # 163 lines - UI + business logic
├── components/
│   ├── DraggableText.tsx       # 182 lines - gesture + UI
│   ├── DraggableSticker.tsx    # 162 lines - DUPLICATE of above
│   └── ...
├── core/
│   └── HistoryManager.ts       # Generic, reusable
└── types.ts                    # Simple type definitions
```

### After
```
src/
├── domain/                     # Pure business logic
│   ├── entities/              # Rich domain models
│   └── services/              # Business operations
├── infrastructure/             # External systems
│   ├── gesture/               # Reusable gestures
│   └── history/
├── application/                # Orchestration
│   ├── stores/                # State management
│   └── hooks/                 # Clean hooks
└── presentation/               # UI only
    └── components/
```

## API Changes

### Hooks

**Old:**
```tsx
import { usePhotoEditor } from "./hooks/usePhotoEditor";
import { usePhotoEditorUI } from "./hooks/usePhotoEditorUI";

const editor = usePhotoEditor([]);
const ui = usePhotoEditorUI();
```

**New:**
```tsx
import { useEditor } from "./application/hooks/useEditor";
import { useEditorUI } from "./application/hooks/useEditorUI";

const editor = useEditor();
const ui = useEditorUI();
```

### Components

**Old:**
```tsx
import DraggableText from "./components/DraggableText";
import DraggableSticker from "./components/DraggableSticker";
```

**New:**
```tsx
import { DraggableLayer } from "./presentation/components/DraggableLayer";
```

### Types

**Old:**
```tsx
import type { Layer, TextLayer, ImageFilters } from "./types";
```

**New:**
```tsx
import type { Layer, TextLayer, FilterValues } from "./domain/entities/Layer";
import { FiltersVO } from "./domain/entities/Filters";
```

## Benefits

1. **180 lines less code** - Removed duplication between DraggableText and DraggableSticker
2. **Clear separation** - Business logic separate from UI
3. **Testable** - Each layer can be tested independently
4. **Maintainable** - Files under 150 lines each
5. **Scalable** - Easy to add new features

## Backward Compatibility

The old API is still exported. Your existing code will continue to work.

To migrate gradually:
1. Start using `useEditor()` in new features
2. Replace `DraggableText` + `DraggableSticker` with `DraggableLayer`
3. Update imports to new paths
4. Remove old imports when ready
