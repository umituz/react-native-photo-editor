/**
 * DARK THEME COLORS
 * 
 * Dark theme color palette with warm orange harmony
 */

export const darkColors = {
  // PRIMARY BRAND COLORS - Warm Orange & Harmony Bloom (Dark Mode)
  primary: '#FF8C42',          // Warm Orange for dark backgrounds
  primaryLight: '#FFA07A',     // Light Salmon
  primaryDark: '#FF6B35',      // Vibrant Orange

  secondary: '#FFCC99',        // Light Peach for dark backgrounds
  secondaryLight: '#FFD4A3',   // Warm Beige
  secondaryDark: '#FFB88C',    // Soft Peach

  accent: '#FFB6C1',           // Light Pink (Bloom) for dark backgrounds
  accentLight: '#FFA07A',      // Light Salmon
  accentDark: '#FF8C69',       // Salmon

  // MATERIAL DESIGN 3 - ON COLORS (Dark mode text colors)
  onPrimary: '#000000',           // Dark text on light primary
  onSecondary: '#000000',         // Dark text on light secondary
  onSuccess: '#000000',           // Dark text on light success
  onError: '#FFFFFF',             // Light text on dark error
  onWarning: '#000000',           // Dark text on light warning
  onInfo: '#000000',              // Dark text on light info
  onSurface: '#E2E8F0',           // Light text on dark surface
  onBackground: '#F1F5F9',        // Light text on dark background
  onSurfaceDisabled: '#64748B',   // Disabled dark mode text
  onSurfaceVariant: '#CBD5E1',    // Text on dark surface variant

  // MATERIAL DESIGN 3 - CONTAINER COLORS (Dark mode containers)
  primaryContainer: '#CC4A1F',    // Dark orange container
  onPrimaryContainer: '#FFE4CD',  // Light text on dark primary container
  secondaryContainer: '#CC8C5F',  // Dark peach container
  onSecondaryContainer: '#FFF8DC', // Light text on dark secondary container
  errorContainer: '#7F1D1D',      // Dark red container
  onErrorContainer: '#FEE2E2',    // Light text on dark error container

  // MATERIAL DESIGN 3 - OUTLINE (Dark mode outlines)
  outline: '#475569',             // Medium gray outline for dark mode
  outlineVariant: '#334155',      // Darker outline variant
  outlineDisabled: '#334155',     // Disabled outline

  // SEMANTIC UI COLORS (slightly lighter for dark backgrounds)
  success: '#34D399',             // Lighter green for dark mode
  successLight: '#34D399',
  successDark: '#059669',

  error: '#EF4444',
  errorLight: '#F87171',
  errorDark: '#DC2626',

  warning: '#F59E0B',
  warningLight: '#FBBF24',
  warningDark: '#D97706',

  info: '#FF8C42',              // Warm Orange for info (dark mode)
  infoLight: '#FFA07A',         // Light Salmon
  infoDark: '#FF6347',          // Tomato

  // SEMANTIC CONTAINER COLORS (Same as light mode for type consistency)
  successContainer: '#D1FAE5',        // Same as light mode for type consistency
  onSuccessContainer: '#065F46',      // Same as light mode for type consistency
  warningContainer: '#FEF3C7',        // Same as light mode for type consistency
  onWarningContainer: '#92400E',      // Same as light mode for type consistency
  infoContainer: '#FFE4CD',           // Light orange container
  onInfoContainer: '#CC4A1F',         // Text on info container

  // GRAYSCALE PALETTE (Same as light mode for type consistency)
  gray50: '#FAFAFA',
  gray100: '#F4F4F5',
  gray200: '#E4E4E7',
  gray300: '#D4D4D8',
  gray400: '#A1A1AA',
  gray500: '#71717A',
  gray600: '#52525B',
  gray700: '#3F3F46',
  gray800: '#27272A',
  gray900: '#18181B',

  // BACKGROUND COLORS (dark mode - true dark backgrounds)
  backgroundPrimary: '#0F172A',      // Slate 900 - Deep dark background
  backgroundSecondary: '#1E293B',    // Slate 800 - Slightly lighter

  surface: '#1E293B',                // Slate 800 - Card/surface backgrounds
  surfaceVariant: '#334155',         // Slate 700 - Variant surfaces
  surfaceSecondary: '#334155',       // Alias for surfaceVariant
  surfaceDisabled: '#475569',        // Slate 600 - Disabled surfaces

  // TEXT COLORS (dark mode - light text on dark backgrounds)
  textPrimary: '#F1F5F9',            // Slate 100 - Primary text (very light)
  textSecondary: '#CBD5E1',          // Slate 300 - Secondary text
  textTertiary: '#94A3B8',           // Slate 400 - Tertiary text
  textDisabled: '#64748B',           // Slate 500 - Disabled text
  textInverse: '#0F172A',            // Dark text for light backgrounds

  // BORDER COLORS (dark mode - subtle borders)
  border: '#334155',                 // Slate 700 - Default border
  borderLight: '#475569',            // Slate 600 - Light border
  borderMedium: '#64748B',           // Slate 500 - Medium border
  borderFocus: '#60A5FA',            // Blue 400 - Focus border (lighter)
  borderDisabled: '#475569',         // Slate 600 - Disabled border

  // COMPONENT-SPECIFIC COLORS (dark mode specific)
  buttonPrimary: '#FF8C42',          // Warm Orange for dark mode
  buttonSecondary: '#FFCC99',        // Light Peach for dark mode

  inputBackground: '#1E293B',        // Dark input background
  inputBorder: '#475569',            // Subtle input border

  cardBackground: '#1E293B',         // Dark card background

  // COLOR ALIASES (for backward compatibility and convenience)
  text: '#F1F5F9',                    // Alias for textPrimary
  background: '#0F172A',              // Alias for backgroundPrimary
  card: '#1E293B',                    // Alias for cardBackground

  // SPECIAL COLORS
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',

  // RGBA OVERLAY COLORS (Same as light mode for type consistency)
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  overlaySubtle: 'rgba(0, 0, 0, 0.05)',
  overlayLight: 'rgba(0, 0, 0, 0.1)',
  overlayMedium: 'rgba(0, 0, 0, 0.3)',
  overlayBackground: 'rgba(0, 0, 0, 0.05)',

  whiteOverlay: 'rgba(255, 255, 255, 0.2)',
  whiteOverlayStrong: 'rgba(255, 255, 255, 0.95)',
  whiteOverlayBorder: 'rgba(255, 255, 255, 0.5)',

  textWhiteOpacity: 'rgba(255, 255, 255, 0.8)',

  errorBackground: 'rgba(239, 68, 68, 0.1)',
  primaryBackground: 'rgba(255, 140, 66, 0.1)',  // Orange background (dark mode)

  cardOverlay: 'rgba(0, 0, 0, 0.15)',

  inputBackground_RGBA: 'rgba(248, 250, 252, 0.9)',

  // GRADIENTS - Warm Orange Harmony (Dark Mode)
  gradient: ['#FF8C42', '#FFCC99'],  // Orange to Peach gradient
};