// Types
import type { CategoryItemType } from '~/types';
import { CategoryTypologyEnum } from '~/types';

// Built-in
import { useCategoriesApi } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useCategoriesStore = defineStore(
    'categoriesStore',
    {
        actions: {
            async getCategoriesLookupItems(): Promise<void> {

                if( this.isLoading )
                    return;

                try {

                    this.setIsLoading( true );

                    const { data } = await useCategoriesApi();

                    // Categories
                    if( data?.length )
                        this.setCategoriesLookupItems( data );

                } catch( exception ) {

                    console.error(
                        { exception }
                    );

                } finally {

                    this.setIsLoading( false );

                }

            },
            setCategoriesLookupItems( value?: CategoryItemType[] ): void {

                this.items = [ ... value || [] ] as CategoryItemType[];

            },
            setIsLoading( value: boolean ): void {

                this.isLoading = value;

            },
        },
        getters: {
            assetCategories( state ): CategoryItemType[] {

                if( ! state.items.length )
                    return [];

                return state.items.filter( item => item.tipologia === CategoryTypologyEnum.ASSET );

            },
            microCategories( state ): CategoryItemType[] {

                if( ! state.items.length )
                    return [];

                return state.items.filter( item => item.tipologia === CategoryTypologyEnum.MICRO );

            },
            nanoCategories( state ): CategoryItemType[] {

                if( ! state.items.length )
                    return [];

                return state.items.filter( item => item.tipologia === CategoryTypologyEnum.NANO );

            },
        },
        state: () => (
            {
                isLoading: false as boolean,
                items: [] as CategoryItemType[],
            }
        ),
    }
);

// Exports
export { useCategoriesStore };
export default useCategoriesStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCategoriesStore, import.meta.hot ) );
