// Nuxt
import { defineNuxtConfig } from 'nuxt/config';

// Design system
import { AntDesignVueResolver as antDesignResolver } from 'unplugin-vue-components/resolvers';

// Vite plugins
import components from 'unplugin-vue-components/vite';
import eslintPlugin from 'vite-plugin-eslint';

// Configuration: https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig(
    {
        alias: {
            // FIXME: related to https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1081781840
            // and https://github.com/nuxt/framework/issues/2874
            './runtimeConfig': './runtimeConfig.browser',
            // Cause
            // https://github.com/nuxt/framework/issues/4916
            // FIX HERE: https://github.com/nuxt/framework/discussions/2308#discussioncomment-2766426
        },
        app: {
            head: {
                charset: 'utf-16',
                meta: [
                    {
                        content: process.env.NUXT_DESCRIPTION || 'Component not found in vite.js',
                        name: 'description',
                    },
                ],
                title: process.env.NUXT_TITLE || 'TEST BUG',
                viewport: 'width=device-width,initial-scale=1',
            },
        },
        css: [ '~/assets/styles/main.scss', '~/assets/styles/root.scss' ],
        imports: { dirs: [ 'composables/**', 'utils/**' ] },
        modules: [
            '@nuxt/devtools',
            'nuxt-typed-router',
            '@vueuse/nuxt',
            '@pinia/nuxt',
        ],
        runtimeConfig: {
            public: {

                // API
                api: {

                    origin: process.env.NUXT_API_ORIGIN,

                    paths: {

                        anagrafica: process.env.NUXT_API_PATH_ANAGRAFICA,

                        anagraficaVenditori: process.env.NUXT_API_PATH_ANAGRAFICA_VENDITORI,

                        categories: process.env.NUXT_API_PATH_CATEGORIES,

                        categoriesLookup: process.env.NUXT_API_PATH_CATEGORIES_LOOKUP,
                        creditLines: process.env.NUXT_API_PATH_CREDIT_LINES,

                        creditLinesLookup: process.env.NUXT_API_PATH_CREDIT_LINES_LOOKUP,
                        gestoreAffidamenti: process.env.NUXT_API_PATH_GESTORE_AFFIDAMENTI,
                        lots: process.env.NUXT_API_PATH_LOTS,
                        magazzinoLotti: process.env.NUXT_API_PATH_MAGAZZINO_LOTTI,
                        tagLots: process.env.NUXT_API_PATH_TAG_LOTS,
                        tribunals: process.env.NUXT_API_PATH_TRIBUNALS,

                    },

                    prefix: process.env.NUXT_API_PREFIX,

                    version: process.env.NUXT_API_VERSION,

                },

                // App related
                application: {

                    meta: {

                        description: process.env.NUXT_DESCRIPTION || '',
                        shortTitle: process.env.NUXT_SHORT_TITLE || '',
                        title: process.env.NUXT_TITLE || '',
                        url: process.env.NUXT_URL || '',

                    },

                },

                // AWS API
                aws: {

                    apiKey: process.env.NUXT_AWS_APPSYNC_API_KEY,

                    endpoints: {

                        af: process.env.NUXT_AWS_API_GW_AF_ENDPOINT,
                        grl: process.env.NUXT_AWS_API_GW_GRL_ENDPOINT,
                        magazzino: process.env.NUXT_AWS_API_GW_MAGAZZINO_ENDPOINT,
                        maia: process.env.NUXT_AWS_API_GW_MAIA_ENDPOINT,
                        red: process.env.NUXT_AWS_API_GW_RED_ENDPOINT,

                    },

                    // Location
                    location: {

                        origin: process.env.NUXT_API_LOCATION_ORIGIN,

                        prefix: process.env.NUXT_API_LOCATION_PREFIX,
                        version: process.env.NUXT_API_LOCATION_VERSION,

                    },

                },

                // AWS Cognito
                cognito: {

                    domain: process.env.NUXT_AWS_COGNITO_DOMAIN,
                    provider: process.env.NUXT_AWS_COGNITO_PROVIDER,
                    redirectSignIn: process.env.NUXT_AWS_COGNITO_REDIRECT_SIGN_IN,
                    redirectSignOut: process.env.NUXT_AWS_COGNITO_REDIRECT_SIGN_OUT,
                    region: process.env.NUXT_AWS_COGNITO_REGION,
                    responseType: process.env.NUXT_AWS_COGNITO_RESPONSE_TYPE,
                    userPoolId: process.env.NUXT_AWS_COGNITO_USER_POOL,
                    userPoolWebClientId: process.env.NUXT_AWS_COGNITO_USER_POOL_CLIENT,

                },

            },
        },
        ssr: false,
        typescript: {
            shim: false,
            strict: true,
        },
        vite: {
            css: { preprocessorOptions: { scss: { additionalData: '@import "~/assets/shared/main";' } } },
            define: {
                // FIXME: related to https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1081781840
                // and https://github.com/nuxt/framework/issues/2874
                'window.global': {},
                // Cause
                // https://github.com/nuxt/framework/issues/4916
                // FIX HERE: https://github.com/nuxt/framework/discussions/2308#discussioncomment-2766426
            },
            plugins: [
                eslintPlugin(),
                components(
                    {
                        resolvers: [
                            antDesignResolver(
                                {
                                    importStyle: false,
                                    resolveIcons: true,
                                }
                            ),
                        ],
                    }
                ),
            ],
            ssr: { noExternal: [ 'ant-design-vue', '@ant-design/icons-vue' ] },
        },
        vue: { compilerOptions: { whitespace: 'condense' } },
    }
);
