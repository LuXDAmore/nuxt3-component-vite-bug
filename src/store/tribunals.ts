// Types
import type { TribunalsItemType } from '~/types';

// Built-in
import { useTribunalsApi } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useTribunalsStore = defineStore(
    'tribunals',
    {
        actions: {
            async getTribunalsItems(): Promise<void> {

                if( this.isLoading )
                    return;

                try {

                    this.setIsLoading( true );

                    const { data } = await useTribunalsApi();

                    // Tribunals
                    if( data?.length )
                        this.setTribunalsItems( data );

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
            setTribunalsItems( value?: TribunalsItemType[] ): void {

                this.items = [ ... value || [] ] as TribunalsItemType[];

            },
        },
        state: () => (
            {
                isLoading: false as boolean,
                items: [] as TribunalsItemType[],
            }
        ),
    }
);

// Exports
export { useTribunalsStore };
export default useTribunalsStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useTribunalsStore, import.meta.hot ) );
