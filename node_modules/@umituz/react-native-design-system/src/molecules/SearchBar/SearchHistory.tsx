import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { AtomicText } from '../../atoms/AtomicText';
import { AtomicIcon } from '../../atoms/AtomicIcon';
import { useAppDesignTokens } from '../../theme';
import type { SearchHistoryProps } from './types';

export const SearchHistory: React.FC<SearchHistoryProps> = ({
    history,
    onSelectItem,
    onRemoveItem,
    onClearAll,
    maxItems = 10,
    style,
    title = 'Recent Searches',
    clearLabel = 'Clear All',
}) => {
    const tokens = useAppDesignTokens();

    if (!history || history.length === 0) {
        return null;
    }

    const displayedHistory = history.slice(0, maxItems);

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <AtomicText
                    type="labelLarge"
                    style={{ color: tokens.colors.textSecondary }}
                >
                    {title}
                </AtomicText>
                <TouchableOpacity
                    onPress={onClearAll}
                    style={styles.clearButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <AtomicText
                        type="labelMedium"
                        style={{ color: tokens.colors.primary }}
                    >
                        {clearLabel}
                    </AtomicText>
                </TouchableOpacity>
            </View>

            {displayedHistory.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    onPress={() => onSelectItem(item.query)}
                    style={styles.item}
                >
                    <View style={styles.itemLeft}>
                        <AtomicIcon
                            name="time-outline"
                            size="sm"
                            customColor={tokens.colors.textSecondary}
                        />
                        <AtomicText
                            type="bodyMedium"
                            style={[
                                styles.itemText,
                                { color: tokens.colors.textPrimary }
                            ]}
                            numberOfLines={1}
                        >
                            {item.query}
                        </AtomicText>
                    </View>

                    <TouchableOpacity
                        onPress={() => onRemoveItem(item.id)}
                        style={styles.removeButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <AtomicIcon
                            name="close"
                            size="sm"
                            customColor={tokens.colors.textSecondary}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 4,
    },
    clearButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 48,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 12,
    },
    itemText: {
        marginLeft: 12,
        flex: 1,
    },
    removeButton: {
        padding: 4,
    },
});
