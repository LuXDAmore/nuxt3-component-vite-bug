// Types
import { AmplifyConfigExtended } from '~/types';

// Built-in
import { useRuntimeConfig } from '#imports';

// Store
import { storeToRefs } from 'pinia';

// UseStore
import { useCognitoStore } from '~/store';

// useCognitoConfig
const useCognitoConfig = ( config?: AmplifyConfigExtended ): AmplifyConfigExtended => {

    const
        // Runtime config
        {
            aws: { endpoints: { af } },
            cognito: {
                region,
                userPoolId,
                userPoolWebClientId,
                domain,
                responseType,
                redirectSignIn,
                redirectSignOut,
            },
        } = useRuntimeConfig()
        // Cognito Stored values
        , cognitoStore = useCognitoStore()
        , { token } = storeToRefs( cognitoStore )
    ;

    // Configuration
    return {
        ... config,
        API: {
            ... ( config || {} ).API,
            additionalHeaders() {

                // TODO: Controllare se questo metodo viene mai chiamato
                console.info( 'additionalHeaders' );

                if( ! token.value )
                    return {};

                return { Authorization: token.value };

            },
            graphql_endpoint: af,
            graphql_headers() {

                // TODO: Controllare se questo metodo viene mai chiamato
                console.info( 'graphql_headers' );

                if( ! token.value )
                    return {};

                return { Authorization: token.value };

            },
        },
        Auth: {
            ... ( config || {} ).Auth,
            oauth: {
                domain,
                redirectSignIn,
                redirectSignOut,
                responseType, // Or 'token', note that REFRESH token will only be generated when the responseType is code
                scope: [
                    'email',
                    'profile',
                    'openid',
                    'aws.cognito.signin.user.admin',
                ],
            },
            region,
            userPoolId,
            userPoolWebClientId,
        },
        I18n: {
            ... ( config || {} ).I18n,
            language: 'it',
        },
        ssr: false,
    };

};

// Exports
export { useCognitoConfig };
