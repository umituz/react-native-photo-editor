/**
 * List - Responsive List Wrapper (Molecule)
 *
 * FlatList wrapper with responsive item sizing and built-in pull-to-refresh
 * Uses design system responsive utilities
 */

import React from 'react';
import { FlatList, RefreshControl, type FlatListProps, type ListRenderItem } from 'react-native';
import { useAppDesignTokens } from '../../theme';

export interface ListProps<T> extends Omit<FlatListProps<T>, 'renderItem'> {
  /** Data array */
  data: readonly T[] | null | undefined;

  /** Render function for each item */
  renderItem: ListRenderItem<T>;

  /** Pull-to-refresh handler */
  onRefresh?: () => void;

  /** Refreshing state */
  refreshing?: boolean;

  /** Key extractor (required for proper list performance) */
  keyExtractor: (item: T, index: number) => string;

  /** Content container padding (uses responsive tokens) */
  contentPadding?: boolean;
}

/**
 * Responsive list component with pull-to-refresh
 *
 * @example
 * ```tsx
 * <List
 *   data={items}
 *   renderItem={({ item }) => <ItemCard item={item} />}
 *   keyExtractor={(item) => item.id}
 *   onRefresh={handleRefresh}
 *   refreshing={isRefreshing}
 *   contentPadding
 * />
 * ```
 */
export const List = <T,>({
  data,
  renderItem,
  onRefresh,
  refreshing = false,
  keyExtractor,
  contentPadding = false,
  ...rest
}: ListProps<T>) => {
  const tokens = useAppDesignTokens();

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={tokens.colors.primary}
            colors={[tokens.colors.primary]}
          />
        ) : undefined
      }
      contentContainerStyle={
        contentPadding
          ? {
              paddingHorizontal: tokens.spacing.screenPadding,
              paddingBottom: tokens.spacing.lg,
            }
          : undefined
      }
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
};
