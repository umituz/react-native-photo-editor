---
name: setup-react-native-photo-editor
description: Sets up photo editing capabilities for React Native apps with filters, adjustments, cropping, and transformations. Triggers on: Setup photo editor, image editing, photo filters, image cropping, usePhotoEditor, photo manipulation.
---

# Setup React Native Photo Editor

Comprehensive setup for `@umituz/react-native-photo-editor` - Photo editing with filters, adjustments, and cropping.

## Overview

This skill handles photo editing integration:
- Package installation
- Photo editor component
- Image filters
- Adjustments (brightness, contrast, saturation)
- Cropping and transforming
- Export functionality

## Quick Start

Say: **"Setup photo editor in my app"**

## Step 1: Install

```bash
npm install @umituz/react-native-photo-editor@latest
npm install @umituz/react-native-design-system
```

## Step 2: Use Photo Editor

```typescript
import { PhotoEditor } from '@umituz/react-native-photo-editor';

export function EditPhotoScreen({ route }) {
  const { imageUri } = route.params;

  const handleSave = async (editedUri: string) => {
    await saveToGallery(editedUri);
  };

  return (
    <PhotoEditor
      imageUri={imageUri}
      onSave={handleSave}
      enableFilters={true}
      enableAdjustments={true}
      enableCrop={true}
      enableTransform={true}
    />
  );
}
```

## Features

- **Filters** - Preset filters (vintage, noir, vivid, etc.)
- **Adjustments** - Brightness, contrast, saturation, warmth
- **Crop** - Aspect ratios, free-form crop
- **Transform** - Rotate, flip, straighten
- **Export** - Save to gallery or custom location

## Verification

- ✅ Package installed
- ✅ Photo editor renders
- ✅ Filters apply correctly
- ✅ Adjustments work
- ✅ Export saves image

---

**Compatible with:** @umituz/react-native-photo-editor@latest
**Platforms:** React Native (Expo & Bare)
