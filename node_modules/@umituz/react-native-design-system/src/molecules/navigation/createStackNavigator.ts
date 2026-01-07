import React from "react";
import type { ParamListBase } from "@react-navigation/native";
import type { StackNavigatorConfig } from "./types";
import { StackNavigator } from "./StackNavigator";

/**
 * Creates a Stack Navigator component based on configuration.
 * 
 * @deprecated Use <StackNavigator config={...} /> instead to prevent re-mounting issues.
 * This wrapper is maintained for backward compatibility but using the component directly is recommended.
 */
export function createStackNavigator<T extends ParamListBase>(
  config: StackNavigatorConfig<T>
): React.ComponentType {
  // Return a component that renders the new StackNavigator
  // Using React.memo to prevent unnecessary re-renders of the wrapper
  return React.memo(function StackNavigatorWrapper() {
    return React.createElement(StackNavigator as any, { config });
  });
}
