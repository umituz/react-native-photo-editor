/**
 * Presentation - Filter Bottom Sheet component
 * 
 * Advanced filtering UI using @umituz/react-native-bottom-sheet
 */

import React, { forwardRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { BottomSheetModal } from '../BottomSheetModal';
import type { BottomSheetModalRef } from '../../types/BottomSheet';
import { AtomicText, AtomicIcon, AtomicButton } from '../../../../atoms';
import { useAppDesignTokens } from '../../../../theme';
import type { FilterOption, FilterCategory } from '../../types/Filter';
import { FilterUtils } from '../../types/Filter';

export interface FilterBottomSheetProps {
    readonly categories: FilterCategory[];
    readonly selectedIds: string[];
    readonly onFilterPress: (id: string, categoryId: string) => void;
    readonly onDismiss?: () => void;
    readonly title?: string;
    readonly applyLabel?: string;
    readonly defaultId?: string;
}

export const FilterBottomSheet = forwardRef<BottomSheetModalRef, FilterBottomSheetProps>(({
    categories,
    selectedIds,
    onFilterPress,
    onDismiss,
    title,
    applyLabel = 'Apply',
    defaultId = 'all'
}, ref) => {
    const tokens = useAppDesignTokens();

    if (__DEV__) {
        console.log('[FilterBottomSheet] Component mounted/rendered', { 
            title, 
            categoriesCount: categories?.length,
            selectedIdsCount: selectedIds?.length,
            hasRef: !!ref
        });
    }

    const styles = React.useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        category: {
            marginBottom: 24,
        },
        categoryTitle: {
            marginBottom: 12,
            opacity: 0.7,
        },
        optionsGrid: {
            flexDirection: 'column',
            gap: 12,
        },
        option: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: tokens.colors.surfaceVariant,
            borderWidth: 1,
            borderColor: 'transparent',
        },
        optionLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
        },
        footer: {
            marginTop: 16,
            paddingBottom: 8,
        },
        scrollView: {
            flex: 1,
        }
    }), [tokens]);

    const safeSelectedIds = selectedIds ?? [];

    const renderOption = useCallback((option: FilterOption, categoryId: string) => {
        const isSelected = safeSelectedIds.includes(option.id);

        return (
            <TouchableOpacity
                key={option.id}
                style={[
                    styles.option,
                    isSelected && { backgroundColor: tokens.colors.primary + '15' }
                ]}
                onPress={() => onFilterPress(option.id, categoryId)}
            >
                <View style={styles.optionLeft}>
                    {option.icon && (
                        <AtomicIcon
                            name={option.icon as any}
                            size="sm"
                            color={isSelected ? 'primary' : 'secondary'}
                        />
                    )}
                    <AtomicText
                        type="bodyMedium"
                        style={[isSelected && { color: tokens.colors.primary, fontWeight: '600' }]}
                    >
                        {option.label}
                    </AtomicText>
                </View>
                {isSelected && (
                    <AtomicIcon name="checkmark" size="sm" color="primary" />
                )}
            </TouchableOpacity>
        );
    }, [safeSelectedIds, tokens, onFilterPress]);

    const renderCategory = useCallback((category: FilterCategory) => (
        <View key={category.id} style={styles.category}>
            <AtomicText type="labelLarge" style={styles.categoryTitle}>
                {category.title}
            </AtomicText>
            <View style={styles.optionsGrid}>
                {category.options.map(option => renderOption(option, category.id))}
            </View>
        </View>
    ), [renderOption, styles]);


    const hasActiveFilters = FilterUtils.hasActiveFilter(safeSelectedIds, defaultId);

    React.useEffect(() => {
        if (__DEV__) {
            console.log('[FilterBottomSheet] useEffect - Component ready', {
                refCurrent: !!(ref as any)?.current,
                categoriesCount: categories.length
            });
        }
    }, []);

    if (__DEV__) {
        console.log('[FilterBottomSheet] Rendering JSX', { title, hasActiveFilters, selectedIds });
    }

    return (
        <BottomSheetModal
            ref={ref}
            preset="medium"
            onDismiss={() => {
                if (__DEV__) console.log('[FilterBottomSheet] onDismiss callback triggered');
                onDismiss?.();
            }}
            backgroundColor={tokens.colors.surface}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <AtomicText type="headlineSmall">{title || 'Filter'}</AtomicText>
                    <TouchableOpacity onPress={() => (ref as any).current?.dismiss()}>
                        <AtomicIcon name="close" size="md" color="textPrimary" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {categories.map(renderCategory)}
                </ScrollView>

                <View style={styles.footer}>
                    <AtomicButton
                        onPress={() => (ref as any).current?.dismiss()}
                        fullWidth
                    >
                        {applyLabel}
                    </AtomicButton>
                </View>
            </View>
        </BottomSheetModal>
    );
});

FilterBottomSheet.displayName = 'FilterBottomSheet';
