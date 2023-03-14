// Types
import type {
    ApiFetchOptionsType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    LocationItemType,
} from '~/types';

// Built-in
import { useApiIdAndConfiguration, useApiLocation } from '#imports';

// useLotsTagApi
const useLocationAutocompleteApi = <T = LocationItemType[]>( configuration?: ApiFetchOptionsWithIdType, baseConfiguration?: ApiFetchOptionsType ): Promise<ApiResultsType<T>> => {

    const promise = useApiLocation( baseConfiguration )
        , { url, config } = useApiIdAndConfiguration( '', configuration )
    ;

    return promise(
        url,
        config
    );

};

// Exports
export {
    useLocationAutocompleteApi,
};

