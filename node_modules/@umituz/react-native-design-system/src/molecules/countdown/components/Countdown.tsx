import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppDesignTokens } from '../../../theme';
import { useCountdown } from '../hooks/useCountdown';
import { CountdownHeader } from './CountdownHeader';
import { TimeUnit } from './TimeUnit';
import type { CountdownTarget, CountdownDisplayConfig } from '../types/CountdownTypes';
import type { IconName } from '../../../atoms/AtomicIcon';

export interface CountdownProps {
    target: CountdownTarget;
    alternateTargets?: CountdownTarget[];
    displayConfig?: CountdownDisplayConfig;
    interval?: number;
    onExpire?: () => void;
    onTargetChange?: (target: CountdownTarget) => void;
    formatLabel?: (unit: 'days' | 'hours' | 'minutes' | 'seconds', value: number) => string;
}

export const Countdown: React.FC<CountdownProps> = ({
    target,
    alternateTargets = [],
    displayConfig = {},
    interval = 1000,
    onExpire,
    onTargetChange,
    formatLabel,
}) => {
    const tokens = useAppDesignTokens();
    const {
        showLabel = true,
        showToggle = alternateTargets.length > 0,
        size = 'medium',
        showDays,
        showHours = true,
        showMinutes = true,
        showSeconds = true,
    } = displayConfig;

    const [currentTargetIndex, setCurrentTargetIndex] = React.useState(0);
    const allTargets = useMemo(
        () => [target, ...alternateTargets],
        [target, alternateTargets]
    );
    const currentTarget = allTargets[currentTargetIndex];

    const { timeRemaining, setTarget: updateTarget } = useCountdown(currentTarget, {
        interval,
        onExpire,
    });

    React.useEffect(() => {
        updateTarget(currentTarget);
    }, [currentTarget, updateTarget]);

    const handleToggle = () => {
        const nextIndex = (currentTargetIndex + 1) % allTargets.length;
        setCurrentTargetIndex(nextIndex);
        if (onTargetChange) {
            onTargetChange(allTargets[nextIndex]);
        }
    };

    const defaultFormatLabel = (unit: 'days' | 'hours' | 'minutes' | 'seconds') => {
        const labels = {
            days: 'DAYS',
            hours: 'HOURS',
            minutes: 'MINUTES',
            seconds: 'SECONDS',
        };
        return labels[unit];
    };

    const labelFormatter = formatLabel || defaultFormatLabel;

    const timeUnits = useMemo(() => {
        interface CountdownUnit {
            value: number;
            label: string;
        }
        const units: CountdownUnit[] = [];

        const shouldShowDays = showDays !== undefined ? showDays : timeRemaining.days > 0;

        if (shouldShowDays) {
            units.push({
                value: timeRemaining.days,
                label: labelFormatter('days', timeRemaining.days)
            });
        }
        if (showHours) {
            units.push({
                value: timeRemaining.hours,
                label: labelFormatter('hours', timeRemaining.hours)
            });
        }
        if (showMinutes) {
            units.push({
                value: timeRemaining.minutes,
                label: labelFormatter('minutes', timeRemaining.minutes)
            });
        }
        if (showSeconds) {
            units.push({
                value: timeRemaining.seconds,
                label: labelFormatter('seconds', timeRemaining.seconds)
            });
        }

        return units;
    }, [timeRemaining, labelFormatter, showDays, showHours, showMinutes, showSeconds]);

    return (
        <View style={styles.container}>
            {showLabel && (
                <CountdownHeader
                    title={currentTarget.label || 'Countdown'}
                    icon={currentTarget.icon as IconName}
                    showToggle={showToggle}
                    onToggle={handleToggle}
                />
            )}

            <View style={[styles.grid, { gap: tokens.spacing.sm }]}>
                {timeUnits.map((unit, index) => (
                    <TimeUnit
                        key={index}
                        value={unit.value}
                        label={unit.label}
                        size={size}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
