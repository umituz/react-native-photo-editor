import React from "react";
import type { ParamListBase } from "@react-navigation/native";
import type { TabNavigatorConfig } from "./types";
import { TabsNavigator } from "./TabsNavigator";

/**
 * Creates a Tab Navigator component based on configuration.
 * 
 * @deprecated Use <TabsNavigator config={...} /> instead to prevent re-mounting issues.
 * This wrapper is maintained for backward compatibility but using the component directly is recommended.
 */
export function createTabNavigator<T extends ParamListBase>(
  config: TabNavigatorConfig<T>
): React.ComponentType {
  // Return a component that renders the new TabsNavigator
  // Using React.memo to prevent unnecessary re-renders of the wrapper
  return React.memo(function TabNavigatorWrapper() {
    return React.createElement(TabsNavigator as any, { config });
  });
}
