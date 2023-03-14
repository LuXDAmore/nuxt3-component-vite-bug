// Types
import type { CreditLinesItemType } from '~/types';

// Built-in
import { useCreditLinesLookupApi } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useCreditLinesStore = defineStore(
    'creditLines',
    {
        actions: {
            async getCreditLinesLookupItems(): Promise<void> {

                if( this.isLoading )
                    return;

                try {

                    this.setIsLoading( true );

                    const { data } = await useCreditLinesLookupApi();

                    // CreditLines
                    if( data?.length )
                        this.setCreditLinesLookupItems( data );

                } catch( exception ) {

                    console.error(
                        { exception }
                    );

                } finally {

                    this.setIsLoading( false );

                }

            },
            setCreditLinesLookupItems( value?: CreditLinesItemType[] ): void {

                this.items = [ ... value || [] ] as CreditLinesItemType[];

            },
            setIsLoading( value: boolean ): void {

                this.isLoading = value;

            },
        },
        state: () => (
            {
                isLoading: false as boolean,
                items: [] as CreditLinesItemType[],
            }
        ),
    }
);

// Exports
export { useCreditLinesStore };
export default useCreditLinesStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCreditLinesStore, import.meta.hot ) );
