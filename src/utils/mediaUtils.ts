import * as MediaLibrary from "expo-media-library";
import { File, Paths } from "expo-file-system";
import { Share } from "react-native";

export interface SaveResult {
  success: boolean;
  uri?: string;
  error?: string;
}

/**
 * Save an image URI to the device's media library (Camera Roll / Photos).
 * Requests permission if not already granted.
 */
export const saveToMediaLibrary = async (uri: string): Promise<SaveResult> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return { success: false, error: "Media library permission denied" };
    }
    const asset = await MediaLibrary.createAssetAsync(uri);
    return { success: true, uri: asset.uri };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

/**
 * Copy an image to the app's cache directory and return the local URI.
 * Useful for temporary storage before sharing.
 */
export const copyToCacheDirectory = async (uri: string): Promise<string> => {
  const fileName = `photo_editor_${Date.now()}.jpg`;
  const destFile = new File(Paths.cache, fileName);
  const srcFile = new File(uri);
  srcFile.copy(destFile);
  return destFile.uri;
};

/**
 * Share an image using the native share sheet.
 * @param uri - local file URI of the image
 * @param message - optional text message to share alongside the image
 */
export const shareImage = async (
  uri: string,
  message?: string,
): Promise<void> => {
  await Share.share({
    url: uri,
    message: message ?? "",
    title: message,
  });
};

/**
 * Delete a local file in the app's cache directory.
 * Safe to call — will not throw even if the file doesn't exist.
 */
export const deleteLocalFile = async (uri: string): Promise<void> => {
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // silent — best-effort cleanup
  }
};
