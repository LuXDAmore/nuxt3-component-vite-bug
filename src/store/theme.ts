// VueUse
import { useLocalStorage } from '@vueuse/core';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useThemeStore = defineStore(
    'themeStore',
    {
        actions: {
            switchTheme(): void {

                this.isDarkTheme = ! this.isDarkTheme;

            },
        },
        hydrate( state ): void {

            // in this case we can completely ignore the initial state since we
            // want to read the value from the browser
            state.isDarkTheme = useLocalStorage( 'isDarkTheme', false as boolean ) as unknown as boolean;

        },
        state: () => (
            { isDarkTheme: useLocalStorage( 'isDarkTheme', false as boolean ) as unknown as boolean }
        ),
    }
);

// Exports
export { useThemeStore };
export default useThemeStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useThemeStore, import.meta.hot ) );
