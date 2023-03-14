// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    LotItemType,
} from '~/types';

// Built-in
import { useApiIdAndConfiguration, useApiMagazzinoLotti, useRuntimeConfig } from '#imports';

// useLotsApi
const useLotsApi = <T =LotItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiMagazzinoLotti( baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.lots, configuration )
    ;

    return promise(
        url,
        config
    );

}
    , useSingleLotApi = ( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<LotItemType>> => useLotsApi<LotItemType>( configuration, baseConfig )
;

// Exports
export {
    useLotsApi,
    useSingleLotApi,
};
