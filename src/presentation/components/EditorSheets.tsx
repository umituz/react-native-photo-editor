/**
 * Editor Sheets Component
 * All bottom sheets for the editor
 */

import React from "react";
import { BottomSheetModal } from "@umituz/react-native-design-system/molecules";
import { TextEditorSheet } from "./sheets/TextEditorSheet";
import { StickerPicker } from "./sheets/StickerPicker";
import { FilterSheet } from "./sheets/FilterSheet";
import { AdjustmentsSheet } from "./sheets/AdjustmentsSheet";
import { LayerManager } from "./sheets/LayerManager";
import { AIMagicSheet } from "./sheets/AIMagicSheet";
import type { FilterOption } from "./sheets/FilterSheet";
import type { FilterSettings } from "../../domain/value-objects/FilterSettings.vo";
import type { EditorUIState } from "../../application/hooks/useEditorUI";

interface EditorSheetsProps {
  ui: EditorUIState;
  filters: FilterSettings;
  t: (key: string) => string;
  onAICaption?: (style: string) => Promise<string> | void;
}

export function EditorSheets({ ui, filters, t, onAICaption }: EditorSheetsProps) {
  return (
    <>
      <BottomSheetModal ref={ui.textEditorSheetRef} snapPoints={["55%"]}>
        <TextEditorSheet
          value={ui.editingText}
          onChange={ui.setEditingText}
          onSave={ui.handleSaveText}
          t={t}
          color={ui.editingColor}
          onColorChange={ui.setEditingColor}
          textAlign={ui.editingAlign}
          onTextAlignChange={ui.setEditingAlign}
          isBold={ui.editingBold}
          onBoldChange={ui.setEditingBold}
          isItalic={ui.editingItalic}
          onItalicChange={ui.setEditingItalic}
        />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.stickerSheetRef} snapPoints={["50%"]}>
        <StickerPicker onSelectSticker={ui.handleSelectSticker} />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.filterSheetRef} snapPoints={["40%"]}>
        <FilterSheet
          selectedFilter={ui.selectedFilter}
          onSelectFilter={(option: FilterOption) => {
            ui.setSelectedFilter(option.id);
            ui.updateFilters(option.filters);
            ui.filterSheetRef.current?.dismiss();
          }}
        />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.adjustmentsSheetRef} snapPoints={["55%"]}>
        <AdjustmentsSheet filters={filters} onFiltersChange={ui.updateFilters} />
      </BottomSheetModal>

      <BottomSheetModal ref={ui.layerSheetRef} snapPoints={["55%"]}>
        <LayerManager
          layers={ui.layers}
          activeLayerId={ui.activeLayerId}
          onSelectLayer={ui.selectLayer}
          onDeleteLayer={ui.deleteLayer}
          onDuplicateLayer={ui.duplicateLayer}
          onMoveLayerUp={ui.moveLayerUp}
          onMoveLayerDown={ui.moveLayerDown}
          t={t}
        />
      </BottomSheetModal>

      {onAICaption && (
        <BottomSheetModal ref={ui.aiSheetRef} snapPoints={["60%"]}>
          <AIMagicSheet onGenerateCaption={onAICaption} />
        </BottomSheetModal>
      )}
    </>
  );
}

