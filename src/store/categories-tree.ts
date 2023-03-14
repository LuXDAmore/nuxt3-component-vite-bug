// Types
import type { CategoryTreeItemType, CategoryTreeType } from '~/types';

// Built-in
import { useCategoriesLookupApi } from '#imports';

// Store
import { acceptHMRUpdate, defineStore } from 'pinia';

// Define Store
const useCategoriesTreeStore = defineStore(
    'categoriesTree',
    {
        actions: {
            getCategoriesParentTree( { idNanoCategoria }: { idNanoCategoria?: string } = {} ): CategoryTreeType {

                const categories: CategoryTreeType = {};

                if( ! this.items.length || ! idNanoCategoria )
                    return categories;

                for( const asset of this.items ) {

                    for( const micro of asset.children ) {

                        for( const nano of micro.children ) {

                            if( nano.idCategoria === idNanoCategoria ) {

                                categories.ASSET_CLASS = asset;
                                categories.MICRO = micro;
                                categories.NANO = nano;

                                return categories;

                            }

                        }

                    }

                }

                return categories;

            },
            async getCategoriesTreeItems( { force } : { force?: boolean } = {} ): Promise<void> {

                if( this.isLoading || ( this.items.length && ! force ) )
                    return;

                try {

                    this.setIsLoading( true );

                    const { data } = await useCategoriesLookupApi();

                    // Categories Tree
                    if( data?.length )
                        this.setCategoriesTreeItems( data );

                } catch( exception ) {

                    console.error(
                        { exception }
                    );

                } finally {

                    this.setIsLoading( false );

                }

            },
            setCategoriesTreeItems( value?: CategoryTreeItemType[] ): void {

                this.items = [ ... value || [] ] as CategoryTreeItemType[];

            },
            setIsLoading( value: boolean ): void {

                this.isLoading = value;

            },
        },
        state: () => (
            {
                isLoading: false as boolean,
                items: [] as CategoryTreeItemType[],
            }
        ),
    }
);

// Exports
export { useCategoriesTreeStore };
export default useCategoriesTreeStore;

// HMR
if( import.meta.hot )
    import.meta.hot.accept( acceptHMRUpdate( useCategoriesTreeStore, import.meta.hot ) );
