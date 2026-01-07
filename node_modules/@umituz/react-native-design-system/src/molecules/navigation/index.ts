export { createTabNavigator } from "./createTabNavigator";
export { createStackNavigator } from "./createStackNavigator";
export { TabsNavigator, type TabsNavigatorProps } from "./TabsNavigator";
export { StackNavigator, type StackNavigatorProps } from "./StackNavigator";
export { FabButton, type FabButtonProps } from "./components/FabButton";

export type {
  TabScreen,
  TabNavigatorConfig,
  StackScreen,
  StackNavigatorConfig,
  BaseScreen,
  BaseNavigatorConfig,
  IconRendererProps,
  LabelProcessorProps,
  FabConfig,
} from "./types";

export { DEFAULT_FAB_CONFIG } from "./types";

export { NavigationCleanupManager } from "./utils/NavigationCleanup";
export type { NavigationCleanup } from "./utils/NavigationCleanup";

export type {
  BottomTabNavigationOptions,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";

export type { StackNavigationOptions } from "@react-navigation/stack";

// Navigation Utilities
export { AppNavigation } from "./utils/AppNavigation";
export { TabLabel, type TabLabelProps } from "./components/TabLabel";
export { useTabBarStyles, type TabBarConfig } from "./hooks/useTabBarStyles";
export { useTabConfig, type UseTabConfigProps } from "./hooks/useTabConfig";

// Navigation Theme
export { createNavigationTheme } from "./utils/NavigationTheme";
