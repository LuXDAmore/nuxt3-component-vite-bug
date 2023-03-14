<template>
    <section class="page homepage">

        <!-- TODO: Eliminare questa pagina, è solo di esempio -->

        <a-form
            id="modalFormData"
            layout="vertical"
        >
            <a-form-item
                has-feedback
                label="Località"
                vertical
            >
                <select-location debug />
            </a-form-item>
            <a-form-item
                has-feedback
                label="Località"
                vertical
            >
                <select-location v-model:value="locationValue" debug />
            </a-form-item>
            <a-form-item
                has-feedback
                label="Località con searchValue"
                vertical
            >
                <select-location
                    v-model:searchValue="searchValue"
                    v-model:value="locationValue"
                    debug
                    field-label="labelId"
                    field-value="id"
                    show-selected-value-in-options
                />
            </a-form-item>
        </a-form>

        <div class="debug">
            <p>
                <strong>Location Value</strong>: {{ locationValue }}<br>
                <strong>Search Value</strong>: {{ searchValue }}<br>
            </p>

            <button type="button" @click="onSetLocation">
                SET LOCATION
            </button>
        </div>

    </section>
</template>

<script setup lang="ts">

    // Built-in
    import { ref } from '#imports';

    // Components
    import SelectLocation from '~/components/Form/SelectLocation/SelectLocation.vue';

    // Setup
    const locationValue = ref<string | undefined>( undefined )
          , searchValue = ref<string>( '' )
          , onSetLocation = (): void => {

              locationValue.value = 'F205';
              searchValue.value = 'Milano';

          }
    ;

</script>
