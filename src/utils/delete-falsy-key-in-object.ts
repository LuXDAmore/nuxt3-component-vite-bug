// Types
import type { ApiFetchOptionsType } from '~/types';

// Method
const deleteFalsyKeyInObject = ( parameters: Record<string, unknown> | ApiFetchOptionsType[ 'body' ] ) => {

    if( ! parameters || typeof parameters !== 'object' )
        return parameters;

    for( const [ key, value ] of Object.entries( parameters ) ) {

        if( ! value && value !== 0 && value !== false )
            ( parameters as Record<string, unknown> )[ key ] = null;
        else if( value && typeof value === 'object' )
            deleteFalsyKeyInObject( value );

    }

    return parameters;

};

// Export
export { deleteFalsyKeyInObject };
export default deleteFalsyKeyInObject;
