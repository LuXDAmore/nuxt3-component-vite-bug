<template>
    <nuxt-layout>

        <nuxt-page />

    </nuxt-layout>
</template>

<script lang="ts">

    // Built-in
    import {
        computed,
        defineComponent,
        useHead,
        useRuntimeConfig,
    } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useCmsStore } from '~/store';

    // Export
    export default defineComponent(
        {
            name: 'app',
            setup() {

                // Define Vars
                const
                    // Cms
                    cmsStore = useCmsStore()
                    , { title } = storeToRefs( cmsStore )
                    // Config
                    , { application } = useRuntimeConfig()
                    , pageTitle = application?.meta?.title || ''
                ;

                // Head
                useHead(
                    { title: computed( () => `${ title.value || pageTitle || '' }` ) }
                );

                return {};

            },
        }
    );

</script>
