<template>
    <section class="page homepage">

        <a-page-header class="header">
            <template #title>
                <a-typography-title :level="2" strong>

                    id: {{ id }}

                </a-typography-title>
            </template>
        </a-page-header>

    </section>
</template>

<script setup lang="ts">

    // Built-in
    import { useRoute } from '#imports';

    const { params: { id } } = useRoute();

</script>
