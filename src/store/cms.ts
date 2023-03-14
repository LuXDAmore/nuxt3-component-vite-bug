// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useCmsStore = defineStore(
    'cmsStore',
    {
        actions: {
            setTitle( title?: string ): void {

                this.title = title || '';

            },
        },
        state: () => (
            { title: '' as string }
        ),
    }
);

// Exports
export { useCmsStore };
export default useCmsStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCmsStore, import.meta.hot ) );
