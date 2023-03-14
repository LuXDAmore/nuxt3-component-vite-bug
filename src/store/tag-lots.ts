// Types
import type { LotsTagType } from '~/types';

// Built-in
import { useLotsTagApi } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useTagLotsStore = defineStore(
    'tagLots',
    {
        actions: {
            async getTagLotsItems(): Promise<void> {

                if( this.isLoading )
                    return;

                try {

                    this.setIsLoading( true );

                    const { data } = await useLotsTagApi();

                    // Tag Lots
                    if( data?.length )
                        this.setTagLotsItems( data );

                } catch( exception ) {

                    console.error(
                        { exception }
                    );

                } finally {

                    this.setIsLoading( false );

                }

            },
            setIsLoading( value: boolean ): void {

                this.isLoading = value;

            },
            setTagLotsItems( value?: LotsTagType[] ): void {

                this.items = [ ... value || [] ] as LotsTagType[];

            },
        },
        state: () => (
            {
                isLoading: false as boolean,
                items: [] as LotsTagType[],
            }
        ),
    }
);

// Exports
export { useTagLotsStore };
export default useTagLotsStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useTagLotsStore, import.meta.hot ) );
