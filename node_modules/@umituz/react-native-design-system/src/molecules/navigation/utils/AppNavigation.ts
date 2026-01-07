import { NavigationContainerRef, CommonActions, StackActions } from '@react-navigation/native';

export class AppNavigation {
    private static navigationRef: NavigationContainerRef<any> | null = null;

    /**
     * Set the global navigation reference
     */
    static setRef(ref: NavigationContainerRef<any> | null): void {
        this.navigationRef = ref;
    }

    /**
     * Set the global navigation reference (alias for setRef)
     * @deprecated Use setRef instead
     */
    static setNavigationRef(ref: NavigationContainerRef<any> | null): void {
        this.setRef(ref);
    }

    /**
     * Get the global navigation reference
     */
    static getRef(): NavigationContainerRef<any> | null {
        return this.navigationRef;
    }

    /**
     * Navigate to a route
     */
    static navigate(name: string, params?: object): void {
        if (this.navigationRef?.isReady()) {
            this.navigationRef.navigate(name, params);
        }
    }

    /**
     * Push a route onto the stack
     */
    static push(name: string, params?: object): void {
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.push(name, params));
        }
    }

    /**
     * Go back to the previous screen
     */
    static goBack(): void {
        if (this.navigationRef?.isReady() && this.navigationRef.canGoBack()) {
            this.navigationRef.goBack();
        }
    }

    /**
     * Reset the navigation state
     */
    static reset(name: string, params?: object): void {
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name, params }],
                })
            );
        }
    }

    /**
     * Replace the current route
     */
    static replace(name: string, params?: object): void {
        if (this.navigationRef?.isReady()) {
            this.navigationRef.dispatch(StackActions.replace(name, params));
        }
    }

    /**
    * Navigate to a screen in a nested navigator (e.g. Tab > Stack > Screen)
    */
    static navigateToNested(parentParams: { screen: string; params?: any }): void {
        if (this.navigationRef?.isReady()) {
            this.navigationRef.navigate(parentParams.screen, parentParams.params);
        }
    }

    /**
     * Navigate to a screen in the parent navigator
     */
    static navigateToParent(name: string, params?: object): void {
        if (this.navigationRef?.isReady()) {
            const parent = this.navigationRef.getParent();
            if (parent) {
                parent.navigate(name, params);
            }
        }
    }
}
