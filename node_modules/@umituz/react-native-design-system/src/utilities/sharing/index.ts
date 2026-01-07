/**
 * Sharing Domain - Barrel Export
 *
 * Provides system share sheet functionality using expo-sharing.
 * Optional domain - disabled by default (opt-in).
 *
 * @domain sharing
 * @enabled false (Apps that need file sharing - Opt-in)
 *
 * ARCHITECTURE:
 * - Domain Layer: Entities (share types, MIME types, utilities)
 * - Infrastructure Layer: Services (SharingService)
 * - Presentation Layer: Hooks (useSharing)
 *
 * DEPENDENCIES:
 * - expo-sharing (system share sheet)
 *
 * FEATURES:
 * - Share files via system share sheet
 * - Automatic MIME type detection
 * - Platform-specific options (UTI for iOS, dialogTitle for Android)
 * - Share availability check
 * - Multiple file sharing (sequential)
 *
 * USAGE:
 *
 * Basic Sharing:
 * ```typescript
 * import { useSharing } from '@umituz/react-native-sharing';
 *
 * const { share, isAvailable, isSharing } = useSharing();
 *
 * if (!isAvailable) {
 *   return <Text>Sharing not available</Text>;
 * }
 *
 * const handleShare = async () => {
 *   const success = await share('file:///path/to/file.jpg', {
 *     dialogTitle: 'Share Photo',
 *     mimeType: 'image/jpeg',
 *   });
 *
 *   if (success) {
 *     console.log('Shared successfully');
 *   }
 * };
 *
 * <AtomicButton onPress={handleShare} loading={isSharing}>
 *   Share
 * </AtomicButton>
 * ```
 *
 * Auto-Detect MIME Type:
 * ```typescript
 * import { useSharing } from '@umituz/react-native-sharing';
 *
 * const { shareWithAutoType } = useSharing();
 *
 * // MIME type auto-detected from .pdf extension
 * await shareWithAutoType(
 *   'file:///path/to/document.pdf',
 *   'document.pdf',
 *   'Share Document'
 * );
 *
 * // MIME type auto-detected from .jpg extension
 * await shareWithAutoType(
 *   'file:///path/to/photo.jpg',
 *   'photo.jpg',
 *   'Share Photo'
 * );
 * ```
 *
 * Share with media Integration:
 * ```typescript
 * import { useMedia } from '@umituz/react-native-media';
 * import { useSharing } from '@umituz/react-native-sharing';
 * import { FileSystemService } from '@umituz/react-native-filesystem';
 *
 * const { pickImage } = useMedia();
 * const { shareWithAutoType } = useSharing();
 *
 * const handlePickAndShare = async () => {
 *   // Pick image
 *   const result = await pickImage();
 *   if (result.canceled || !result.assets?.[0]?.uri) return;
 *
 *   // Save to filesystem
 *   const savedPath = await FileSystemService.copyToDocuments(
 *     result.assets[0].uri,
 *     'shared_image.jpg'
 *   );
 *
 *   if (!savedPath.success || !savedPath.uri) return;
 *
 *   // Share via system sheet
 *   await shareWithAutoType(savedPath.uri, 'shared_image.jpg', 'Share Photo');
 * };
 * ```
 *
 * Share Multiple Files:
 * ```typescript
 * import { useSharing } from '@umituz/react-native-sharing';
 *
 * const { shareMultiple } = useSharing();
 *
 * const handleShareMultiple = async () => {
 *   const uris = [
 *     'file:///path/to/file1.jpg',
 *     'file:///path/to/file2.jpg',
 *     'file:///path/to/file3.jpg',
 *   ];
 *
 *   await shareMultiple(uris, {
 *     dialogTitle: 'Share Photos',
 *     mimeType: 'image/jpeg',
 *   });
 * };
 * ```
 *
 * MIME Type Utilities:
 * ```typescript
 * import { SharingUtils, MIME_TYPES } from '@umituz/react-native-sharing';
 *
 * // Get MIME type from extension
 * const mimeType = SharingUtils.getMimeTypeFromExtension('document.pdf');
 * // Returns: 'application/pdf'
 *
 * // Get UTI for iOS
 * const uti = SharingUtils.getUTIFromExtension('photo.jpg');
 * // Returns: 'public.jpeg'
 *
 * // Prepare full options
 * const options = SharingUtils.prepareShareOptions('file.pdf', 'Share Document');
 * // Returns: { dialogTitle, mimeType, UTI }
 *
 * // Use predefined MIME types
 * await share(uri, { mimeType: MIME_TYPES.PDF });
 * await share(uri, { mimeType: MIME_TYPES.IMAGE_JPEG });
 * await share(uri, { mimeType: MIME_TYPES.VIDEO_MP4 });
 * ```
 *
 * Direct Service Usage (Rare):
 * ```typescript
 * import { SharingService } from '@umituz/react-native-sharing';
 *
 * // Check availability
 * const isAvailable = await SharingService.isAvailable();
 *
 * // Share file
 * const result = await SharingService.shareFile(uri, options);
 * if (result.success) {
 *   console.log('Shared');
 * } else {
 *   console.error(result.error);
 * }
 * ```
 *
 * BENEFITS:
 * - Native system share sheet (OS-provided UI)
 * - Automatic MIME type detection from filename
 * - Platform-specific options (iOS UTI, Android dialogTitle)
 * - Share availability check before attempting
 * - Type-safe share operations
 * - Error handling with state management
 * - Works with all file types
 *
 * USE CASES:
 * - Share photos/videos from gallery
 * - Export reports/documents
 * - Share app-generated content
 * - Social media sharing
 * - File backup/export
 * - Collaborative file sharing
 *
 * @see https://docs.expo.dev/versions/latest/sdk/sharing/
 */

// ============================================================================
// DOMAIN LAYER - ENTITIES
// ============================================================================

export type {
  ShareOptions,
  ShareResult,
} from './domain/entities/Share';

export {
  MIME_TYPES,
  UTI_TYPES,
  SHARING_CONSTANTS,
  SharingUtils,
} from './domain/entities/Share';

// ============================================================================
// INFRASTRUCTURE LAYER - SERVICES
// ============================================================================

export { SharingService } from './infrastructure/services/SharingService';

// ============================================================================
// PRESENTATION LAYER - HOOKS
// ============================================================================

export { useSharing } from './presentation/hooks/useSharing';
