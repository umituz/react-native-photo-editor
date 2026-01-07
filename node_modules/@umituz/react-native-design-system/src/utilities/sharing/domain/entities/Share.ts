/**
 * Sharing Domain - Core Entities
 *
 * This file defines core types and interfaces for sharing functionality.
 * Handles system share sheet using expo-sharing.
 *
 * @domain sharing
 * @layer domain/entities
 */

/**
 * Share options for sharing content
 */
export interface ShareOptions {
  /**
   * Dialog title (Android only)
   */
  dialogTitle?: string;

  /**
   * MIME type of the file being shared
   */
  mimeType?: string;

  /**
   * UTI (Uniform Type Identifier) for the file (iOS only)
   */
  UTI?: string;
}

/**
 * Share result
 */
export interface ShareResult {
  success: boolean;
  error?: string;
}

/**
 * Common MIME types for sharing
 */
export const MIME_TYPES = {
  // Images
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  IMAGE_WEBP: 'image/webp',

  // Videos
  VIDEO_MP4: 'video/mp4',
  VIDEO_QUICKTIME: 'video/quicktime',
  VIDEO_AVI: 'video/avi',

  // Audio
  AUDIO_MP3: 'audio/mpeg',
  AUDIO_WAV: 'audio/wav',
  AUDIO_AAC: 'audio/aac',

  // Documents
  PDF: 'application/pdf',
  TEXT: 'text/plain',
  JSON: 'application/json',
  ZIP: 'application/zip',

  // Generic
  OCTET_STREAM: 'application/octet-stream',
} as const;

/**
 * iOS UTI (Uniform Type Identifiers)
 */
export const UTI_TYPES = {
  // Images
  IMAGE: 'public.image',
  JPEG: 'public.jpeg',
  PNG: 'public.png',

  // Videos
  VIDEO: 'public.video',
  MOVIE: 'public.movie',

  // Audio
  AUDIO: 'public.audio',
  MP3: 'public.mp3',

  // Documents
  PDF: 'com.adobe.pdf',
  TEXT: 'public.text',
  JSON: 'public.json',

  // Generic
  DATA: 'public.data',
  CONTENT: 'public.content',
} as const;

/**
 * Sharing constants
 */
export const SHARING_CONSTANTS = {
  DEFAULT_DIALOG_TITLE: 'Share',
  DEFAULT_MIME_TYPE: MIME_TYPES.OCTET_STREAM,
} as const;

/**
 * Sharing utilities
 */
export class SharingUtils {
  /**
   * Get MIME type from file extension
   */
  static getMimeTypeFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      // Images
      case 'jpg':
      case 'jpeg':
        return MIME_TYPES.IMAGE_JPEG;
      case 'png':
        return MIME_TYPES.IMAGE_PNG;
      case 'gif':
        return MIME_TYPES.IMAGE_GIF;
      case 'webp':
        return MIME_TYPES.IMAGE_WEBP;

      // Videos
      case 'mp4':
        return MIME_TYPES.VIDEO_MP4;
      case 'mov':
        return MIME_TYPES.VIDEO_QUICKTIME;
      case 'avi':
        return MIME_TYPES.VIDEO_AVI;

      // Audio
      case 'mp3':
        return MIME_TYPES.AUDIO_MP3;
      case 'wav':
        return MIME_TYPES.AUDIO_WAV;
      case 'aac':
        return MIME_TYPES.AUDIO_AAC;

      // Documents
      case 'pdf':
        return MIME_TYPES.PDF;
      case 'txt':
        return MIME_TYPES.TEXT;
      case 'json':
        return MIME_TYPES.JSON;
      case 'zip':
        return MIME_TYPES.ZIP;

      default:
        return MIME_TYPES.OCTET_STREAM;
    }
  }

  /**
   * Get UTI from file extension (iOS)
   */
  static getUTIFromExtension(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      // Images
      case 'jpg':
      case 'jpeg':
        return UTI_TYPES.JPEG;
      case 'png':
        return UTI_TYPES.PNG;
      case 'gif':
      case 'webp':
        return UTI_TYPES.IMAGE;

      // Videos
      case 'mp4':
      case 'mov':
      case 'avi':
        return UTI_TYPES.VIDEO;

      // Audio
      case 'mp3':
        return UTI_TYPES.MP3;
      case 'wav':
      case 'aac':
        return UTI_TYPES.AUDIO;

      // Documents
      case 'pdf':
        return UTI_TYPES.PDF;
      case 'txt':
        return UTI_TYPES.TEXT;
      case 'json':
        return UTI_TYPES.JSON;

      default:
        return UTI_TYPES.DATA;
    }
  }

  /**
   * Prepare share options from filename
   */
  static prepareShareOptions(filename: string, dialogTitle?: string): ShareOptions {
    return {
      dialogTitle: dialogTitle || SHARING_CONSTANTS.DEFAULT_DIALOG_TITLE,
      mimeType: SharingUtils.getMimeTypeFromExtension(filename),
      UTI: SharingUtils.getUTIFromExtension(filename),
    };
  }
}
