// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithId,
    ApiResultsType,
} from '~/types';

// Built-in
import { AnagraficaItemType } from '~/types';

import { useApiIdAndConfiguration, useFetchCreate, useRuntimeConfig } from '#imports';

const useAnagraficheApi = <T = AnagraficaItemType[]>( configuration?: ApiFetchOptionsWithId, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useFetchCreate( { parentPath: api.paths.anagraficaVenditori }, baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.anagrafica, configuration )
    ;

    return promise(
        url,
        config
    );

};

// Exports
export {
    useAnagraficheApi,
};
