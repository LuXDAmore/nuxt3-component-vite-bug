// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    LotGoodsItemType,
} from '~/types';

// Built-in
import { useApiIdAndConfiguration, useApiMagazzinoLotti, useRuntimeConfig } from '#imports';

// useSingleLotsGoodsApi
const useSingleLotsGoodsApi = <T =LotGoodsItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiMagazzinoLotti( baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.lots, configuration, 'beni' )
    ;

    return promise(
        `${ url }`,
        config
    );

}
    , useSingleLotSingleGoodApi = ( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<LotGoodsItemType>> => {

        return useSingleLotsGoodsApi<LotGoodsItemType>( configuration, baseConfig );

    }
;

// Exports
export {
    useSingleLotsGoodsApi,
    useSingleLotSingleGoodApi,
};
