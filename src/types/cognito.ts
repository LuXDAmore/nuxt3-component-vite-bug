// Types
import { AmplifyConfig } from '@aws-amplify/core/lib-esm/types';

// Interface
interface AmplifyConfigExtended extends AmplifyConfig {
    I18n: {
        language: string,
    };
}

// Exports
export { AmplifyConfigExtended };
