// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    CategoryItemType,
    CategoryTreeItemType,
} from '~/types';

// Built-in
import { useApiIdAndConfiguration, useApiMagazzinoLotti, useRuntimeConfig } from '#imports';

// UseCategoriesApi
const useCategoriesApi = <T = CategoryItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiMagazzinoLotti( baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.categories, configuration )
        ;

    return promise(
        url,
        config
    );

}
    // useCategoriesLookupApi
    , useCategoriesLookupApi = <T = CategoryTreeItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

        const { api } = useRuntimeConfig()
            , promise = useApiMagazzinoLotti( baseConfig )
            , { url, config } = useApiIdAndConfiguration( api.paths.categoriesLookup, configuration )
    ;

        return promise(
            url,
            config
        );

    }
;

// Exports
export {
    useCategoriesApi,
    useCategoriesLookupApi,
};
