/**
 * Formatters Utility
 * Value formatting for UI display
 */

export function formatPercentage(value: number): string {
  const rounded = (value - 1) * 100;
  return `${rounded >= 0 ? "+" : ""}${Math.round(rounded)}%`;
}

export function formatDegrees(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatSliderValue(
  value: number,
  type: "percentage" | "degrees" | "integer" = "percentage"
): string {
  switch (type) {
    case "percentage":
      return formatPercentage(value);
    case "degrees":
      return formatDegrees(value);
    case "integer":
      return Math.round(value).toString();
    default:
      return value.toString();
  }
}
