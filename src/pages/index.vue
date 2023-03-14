<template>
    <section class="page homepage">

        <a-page-header class="header">
            <template #title>
                <a-typography-title :level="2" strong>

                    Welcome

                </a-typography-title>
            </template>
        </a-page-header>

    </section>
</template>

<script lang="ts">

    // AntDesign - Components
    import { PageHeader, TypographyTitle } from 'ant-design-vue';

    // Built-in
    import { defineComponent } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'homepage',
            components: {
                // Ant components
                'a-page-header': PageHeader,
                'a-typography-title': TypographyTitle,
            },
            inheritAttrs: false,
        }
    );

</script>
