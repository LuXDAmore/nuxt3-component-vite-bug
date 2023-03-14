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
                        content: process.env.NUXT_DESCRIPTION || '',
                        name: 'description',
                    },
                ],
                title: process.env.NUXT_TITLE || '',
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
