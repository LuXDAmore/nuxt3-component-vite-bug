<template>
    <nuxt-layout>
        <section class="error-container">

            <h1 v-if="title || statusCode">
                <template v-if="statusCode">
                    <span
                        class="status-code"
                        v-text="statusCode"
                    />
                    <br>
                </template>
                <span
                    v-if="title"
                    class="title"
                    v-text="title"
                />
            </h1>

            <small v-if="message" v-text="message" />

            <hr>
            <hr>

            <a-button @click="handleError">
                Clear errors and go to Homepage
            </a-button>

        </section>
    </nuxt-layout>
</template>

<script setup lang="ts">

    // AntDesign - Components
    import { Button as AButton } from 'ant-design-vue';

    // Built-in
    import { clearError, computed, toRefs } from '#imports';

    // Something can be found here: https://github.com/nuxt/movies/blob/main/error.vue

    // Setup
    const props = defineProps(
              {
                  error: {
                      default: null,
                      type: Object,
                  },
              }
          )
          , { error } = toRefs( props )
          // Data
          , message = computed<string>( () => error.value?.message || '' )
          , statusCode = computed<number | string>( () => error.value?.statusCode || '' )
          , is404 = computed<boolean>( () => statusCode.value === 404 || message.value?.includes( '404' ) )
          , title = computed<string>( () => ( is404.value ? 'This page could not be found' : 'An error has occurred' ).toUpperCase() )
          , handleError = () => clearError( { redirect: '/' } )
    ;

</script>

<style
    scoped
    lang="scss"
    src="./error.scss"
></style>
