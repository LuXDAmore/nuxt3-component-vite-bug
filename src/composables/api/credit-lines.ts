// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    CreditLinesItemType,
} from '~/types';

// Built-in
import { useApiGestoreAffidamenti, useApiIdAndConfiguration, useRuntimeConfig } from '#imports';

// useCreditLinesApi
const useCreditLinesApi = <T = CreditLinesItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const { api } = useRuntimeConfig()
        , promise = useApiGestoreAffidamenti( baseConfig )
        , { url, config } = useApiIdAndConfiguration( api.paths.creditLines, configuration )
        ;

    return promise(
        url,
        config
    );

}
    , useCreditLinesLookupApi = <T = CreditLinesItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfig?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

        const { api } = useRuntimeConfig()
            , promise = useApiGestoreAffidamenti( baseConfig )
            , { url, config } = useApiIdAndConfiguration( api.paths.creditLinesLookup, configuration )
    ;

        return promise(
            url,
            {
                ... config,
                params: {
                    per_page: - 1,
                    ... config?.params,
                },
            }
        );

    }
;

// Exports
export {
    useCreditLinesApi,
    useCreditLinesLookupApi,
};
