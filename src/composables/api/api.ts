// Universal fetch
import { $fetch } from 'ofetch';

// Types
import type { ApiFetchOptionsType, ApiFetchType } from '~/types';

// Built-in
import { onApiRequest, useRuntimeConfig } from '#imports';

// Store
import { storeToRefs } from 'pinia';

// Utils
import { useCognitoStore } from '~/store';

// UseStore
const useApiMagazzinoLotti = ( config?: ApiFetchOptionsType ): ApiFetchType => {

        const { api } = useRuntimeConfig()
            , cognitoStore = useCognitoStore()
            , { token } = storeToRefs( cognitoStore )
            , apiFetch = $fetch.create(
                {
                    baseURL: `${ api.origin }${ api.paths.magazzinoLotti }${ api.prefix }${ api.version }`,
                    ... config,
                    headers: {
                        Authorization: `Bearer ${ token.value }`,
                        'Content-Type': 'application/json',
                        ... ( config || {} ).headers,
                    },
                    onRequest: onApiRequest,
                }
            )
        ;

        return apiFetch;

    }
    , useApiGestoreAffidamenti = ( config?: ApiFetchOptionsType ): ApiFetchType => {

        const { api } = useRuntimeConfig()
            , cognitoStore = useCognitoStore()
            , { token } = storeToRefs( cognitoStore )
            , apiFetch = $fetch.create(
                {
                    baseURL: `${ api.origin }${ api.paths.gestoreAffidamenti }${ api.prefix }${ api.version }`,
                    ... config,
                    headers: {
                        Authorization: `Bearer ${ token.value }`,
                        'Content-Type': 'application/json',
                        ... ( config || {} ).headers,
                    },
                    onRequest: onApiRequest,
                }
            )
        ;

        return apiFetch;

    }
    , useApiLocation = ( config?: ApiFetchOptionsType ): ApiFetchType => {

        const { aws: { location, apiKey } } = useRuntimeConfig()
            // , cognitoStore = useCognitoStore()
            // , { token } = storeToRefs( cognitoStore )
            , apiFetch = $fetch.create(
                {
                    baseURL: `${ location.origin }${ location.prefix }${ location.version }`,
                    ... config,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        ... ( config || {} ).headers,
                    },
                    onRequest: onApiRequest,
                }
            )
        ;

        return apiFetch;

    }
;

// Exports
export {
    useApiMagazzinoLotti,
    useApiLocation,
    useApiGestoreAffidamenti,
};
