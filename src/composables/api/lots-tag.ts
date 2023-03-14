// Types
import type { ApiResultsType, LotsTagType } from '~/types';

// Universal fetch
import type { FetchOptions } from 'ofetch';

// Built-in
import { useApiMagazzinoLotti, useRuntimeConfig } from '#imports';

// useLotsTagApi
const useLotsTagApi = <T = LotsTagType[]>( config?: FetchOptions<'json'>, baseConfig?: FetchOptions<'json'> ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiMagazzinoLotti( baseConfig )
    ;

    return promise(
        api.paths.tagLots,
        config
    );

};

// Exports
export {
    useLotsTagApi,
};

