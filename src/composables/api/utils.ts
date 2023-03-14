import { $fetch } from 'ofetch';

import { ApiFetchOptionsType } from '~/types';

import type { $Fetch } from 'ofetch';

import { deleteFalsyKeyInObject, useRuntimeConfig } from '#imports';

import { storeToRefs } from 'pinia';

import { useCognitoStore } from '~/store';

import { parametersSerializer } from '~/utils/parameters-serializer';

// TODO: Si potrebbe evitare di passare parentPath qui in modo da rendere il metodo ancora più generico,
// e aggiungere parentPath in un altro metodo come ad esempio fa useApiIdAndConfiguration con il childPath
// bisognerebbe andare ad inserire in quel metodo anche ${ api.prefix }${ api.version }
export const useFetchCreate = ( { parentPath }: { parentPath: string | null }, config?: ApiFetchOptionsType ): $Fetch => {

    const { api } = useRuntimeConfig()
        , cognitoStore = useCognitoStore()
        , { token } = storeToRefs( cognitoStore )
        , apiFetch = $fetch.create(
            {
                baseURL: `${ api.origin }${ parentPath ?? '' }${ api.prefix }${ api.version }`,
                ... config,
                headers: {
                    Authorization: `Bearer ${ token.value }`,
                    ... ( config || {} ).headers,
                },
                onRequest( { options } ) {

                    if( options.params )
                        parametersSerializer( options.params );

                    if( options.body )
                        deleteFalsyKeyInObject( options.body );

                },
            }
        )
  ;

    return apiFetch;

};
