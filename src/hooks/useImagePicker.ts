import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
}

export interface UseImagePickerReturn {
  pickFromGallery: (options?: ImagePicker.ImagePickerOptions) => Promise<ImagePickerResult | null>;
  takePhoto: (options?: ImagePicker.ImagePickerOptions) => Promise<ImagePickerResult | null>;
  loading: boolean;
}

export const useImagePicker = (): UseImagePickerReturn => {
  const [loading, setLoading] = useState(false);

  const pickFromGallery = async (
    options?: ImagePicker.ImagePickerOptions,
  ): Promise<ImagePickerResult | null> => {
    setLoading(true);
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
        ...options,
      });

      if (result.canceled || result.assets.length === 0) return null;
      const asset = result.assets[0];
      return { uri: asset.uri, width: asset.width, height: asset.height };
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async (
    options?: ImagePicker.ImagePickerOptions,
  ): Promise<ImagePickerResult | null> => {
    setLoading(true);
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 1,
        ...options,
      });

      if (result.canceled || result.assets.length === 0) return null;
      const asset = result.assets[0];
      return { uri: asset.uri, width: asset.width, height: asset.height };
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { pickFromGallery, takePhoto, loading };
};
