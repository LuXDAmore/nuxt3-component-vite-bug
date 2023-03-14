// Types
import type {
    ApiFetchOptionsTransformer,
    ApiFetchOptionsWithIdType,
    KeyOf,
    OptionsApiDataPatchType,
} from '~/types';

import type { FetchContext } from 'ofetch';

// Built-in
import { deleteFalsyKeyInObject, parametersSerializer, toRaw } from '#imports';

// Request
export const onApiRequest = ( { options } : FetchContext<unknown, 'json'> ): void => {

    if( options.params )
        parametersSerializer( options.params );

    if( options.body )
        deleteFalsyKeyInObject( options.body );

};

export const useApiIdAndConfiguration = ( baseUrl?: string, configuration?: ApiFetchOptionsWithIdType, prefixChild?: string ): ApiFetchOptionsTransformer => {

    const { id, idChild, ... config } = configuration || {}
        , url = `${ baseUrl || '' }${ id ? `/${ Array.isArray( id ) ? id.join( '' ) : id }` : '' }${ prefixChild ? `/${ prefixChild }` : '' }${ idChild ? `/${ Array.isArray( idChild ) ? idChild.join( '' ) : idChild }` : '' }`
    ;

    return {
        config,
        id,
        idChild,
        url,
    };

};

export const useApiDataPatch = <T>(
    payload: T,
    options: OptionsApiDataPatchType<T> = {
        arrayFields: [],
        omitKey: [],
        renamedKey: {},
    }
): T => {

    // FIXME: typescript
    // FIXME: Questa è una utils, non è un composable
    const { arrayFields, omitKey, renamedKey } = options || {}
        , transformedPayload: T = structuredClone( toRaw( payload || {} as T ) )
    ;

    if( arrayFields?.length ) {

        for( const field of arrayFields ) {

            const fieldKey = field.key
                , payloadKey = payload[ fieldKey ]
            ;

            if( Array.isArray( payloadKey ) )
                transformedPayload[ fieldKey ] = payloadKey.map( obj => obj[ field.id ] );

        }

    }

    for( const [ keyAsString ] of Object.entries<T>( transformedPayload ) ) {

        const key = keyAsString as KeyOf<T>;

        if( omitKey && omitKey.includes( key ) )
            delete transformedPayload[ key ];

        if( renamedKey && renamedKey[ key ] ) {

            const newKey = renamedKey[ key ] as KeyOf<T>;

            transformedPayload[ newKey ] = transformedPayload[ key ];

            delete transformedPayload[ key ];

        }

    }

    return transformedPayload;

};
