// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    TribunalsItemType,
} from '~/types';

// Built-in
import { useApiGestoreAffidamenti, useApiIdAndConfiguration, useRuntimeConfig } from '#imports';

// UseTribunalsApi
const useTribunalsApi = <T = TribunalsItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiGestoreAffidamenti( baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.tribunals, configuration )
    ;

    return promise(
        url,
        config
    );

};

// Exports
export {
    useTribunalsApi,
};
