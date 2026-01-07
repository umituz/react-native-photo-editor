import React, { ReactNode } from 'react';

export interface SafeBottomSheetModalProviderProps {
  children: ReactNode;
}

/**
 * SafeBottomSheetModalProvider
 * 
 * Simple wrapper for backward compatibility.
 * No longer uses @gorhom/bottom-sheet provider.
 */
export const SafeBottomSheetModalProvider = ({ children }: SafeBottomSheetModalProviderProps) => {
  return <>{children}</>;
};
