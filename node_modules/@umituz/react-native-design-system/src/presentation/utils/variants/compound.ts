import { Style, VariantConfig, VariantProps, createVariants } from './core';

export interface CompoundVariant<T extends Record<string, Record<string, Style>>> {
  conditions: Partial<VariantProps<T>>;
  style: Style;
}

export interface AdvancedVariantConfig<T extends Record<string, Record<string, Style>>>
  extends VariantConfig<T> {
  compoundVariants?: CompoundVariant<T>[];
}

export function createAdvancedVariants<T extends Record<string, Record<string, Style>>>(
  config: AdvancedVariantConfig<T>
) {
  const baseVariantFn = createVariants(config);

  return (props: VariantProps<T> = {}): Style => {
    let result = baseVariantFn(props);

    if (config.compoundVariants) {
      config.compoundVariants.forEach(compound => {
        const conditionsMet = Object.entries(compound.conditions).every(
          ([key, value]) => props[key as keyof T] === value
        );
        if (conditionsMet) {
          result = { ...result, ...compound.style };
        }
      });
    }

    return result;
  };
}
