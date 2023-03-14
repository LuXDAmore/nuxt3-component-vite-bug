<template>
    <div class="page">
        <a-calendar
            :value="date"
            @panel-change="onPanelChange"
            @select="onSelect"
        >
            <template #dateCellRender="{ current }">
                <template v-if="current.date() === 13">
                    <a-button @click="() => { current.date() === 13 && ( showModal = true ) }">
                        Apri modale {{ current.date() }}
                    </a-button>
                    <br>
                    <h3>12345 Garage</h3>
                    <p>Tentativo 1</p>
                </template>
            </template>
        </a-calendar>
        <a-modal
            v-model:visible="showModal"
            @cancel="showModal = false"
            @ok="showModal = false"
        >
            Prova
        </a-modal>
    </div>
</template>

<script lang="ts">
    // Third party
    import dayjs, { Dayjs } from 'dayjs';
    import { defineComponent, ref } from 'vue';

    // Component
    export default defineComponent(
        {
            name: 'calendario',
            setup() {

                const now = Date.now()
                      , showModal = ref( false )
                      , date = ref( dayjs( now ) )
                      , selectedValue = ref( dayjs( now ) )

                      , onSelect = ( value: Dayjs ) => {

                          date.value = value;
                          selectedValue.value = value;

                      }
                      , onPanelChange = ( value: Dayjs ) => {

                          date.value = value;

                      }
                ;

                return {
                    date,
                    onPanelChange,
                    onSelect,
                    selectedValue,
                    showModal,
                };

            },
        }
    );
</script>
