// Third party
import type { SearchParameters } from 'ofetch';

// Utils for serialize parameters
const parametersSerializer = ( parameters?: SearchParameters ): SearchParameters | void => {

    if( ! parameters || typeof parameters !== 'object' )
        return parameters;

    for( const [ key, value ] of Object.entries( parameters ) ) {

        if( ! value && value !== 0 && value !== false ) {

            delete parameters[ key ];
            continue;

        }

        if( ! Array.isArray( value ) )
            continue;

        for( const [ index, element ] of value.entries() )
            parameters[ `${ key }[${ index }]` ] = element;

        delete parameters[ key ];

    }

    return parameters;

};

// Export
export { parametersSerializer };
