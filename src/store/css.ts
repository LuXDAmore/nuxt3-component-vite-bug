// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Css to JS
// @ts-ignore:next-line Not valid because it's a SCSS file
import variables from '~/assets/styles/exports.module.scss'; // eslint-disable-line import/extensions

// Interface
interface CssVariables {
    [key: string]: string;
}

// Define Store
const useCssStore = defineStore(
    'cssStore',
    {
        state: () => (
            { variables: variables<CssVariables> }
        ),
    }
);

// Exports
export { useCssStore };
export default useCssStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCssStore, import.meta.hot ) );
