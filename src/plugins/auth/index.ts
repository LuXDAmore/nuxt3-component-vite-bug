// AWS Auth
import { Auth } from '@aws-amplify/auth';
import { Amplify } from '@aws-amplify/core';

// Built-in
import { defineNuxtPlugin, useCognitoConfig } from '#imports';

// Plugin
export default defineNuxtPlugin(
    () => {

        const configuration = useCognitoConfig();

        // AWS settings
        Amplify.I18n?.setLanguage( configuration.I18n.language );
        Amplify.configure( configuration );

        return { provide: { auth: Auth } };

    }
);
