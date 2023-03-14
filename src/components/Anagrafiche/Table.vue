<template>
    <a-table
        :columns="tableColumns"
        :data-source="tableRows"
        :loading="isLoading"
        :pagination="tablePagination"
        row-key="idAnagrafica"
        :show-header="tableIsShowColumnHeader"
        size="small"
        @change="(...params) => $emit('change', ...params)"
    >

        <template
            #bodyCell="{ column, record } : {
                column: {dataIndex: keyof AnagraficaItemType},
                record: AnagraficaItemType
            }"
        >
            <template v-if="column.dataIndex === 'tipologia'">
                <span>{{ tipologiaRecord[record.tipologia].label }}</span>
            </template>
            <template v-if="column.dataIndex === 'stato'">
                <a-tag :color="statoRecord[record.stato].color">
                    {{ statoRecord[record.stato].label }}
                </a-tag>
            </template>
        </template>

        <template #customFilterDropdown="{ column, clearFilters } : { column: { dataIndex: keyof AnagraficaItemType }, clearFilters: () => void }">
            <a-input
                ref="searchInput"
                :disabled="isLoading"
                :placeholder="formatInputPlaceholder(column.dataIndex)"
                :value="advancedFilters[ column.dataIndex ]"
                @update:value="(value) => filterChangeHandler(value, column.dataIndex )"
            />
            <table-dropdown-buttons
                :loading="isLoading"
                :value="advancedFilters[ column.dataIndex ]"
                @click="() => $emit('filter-submit', ( { clearFilters } ))"
                @update:value="(value) => filterChangeHandler(value, column.dataIndex)"
            />
        </template>
    </a-table>
</template>

<script lang="ts">
    import { Table } from 'ant-design-vue';
    import { PropType } from 'vue';

    import {
        AnagraficaItemType,
        ParametersForFilteringType,
        TableColumnsType,
        TablePaginationType,
    } from '~/types';

    import { defineComponent, selectOptionsToRecord } from '#imports';

    import { ANAGRAFICA_STATUS_OPTIONS, TIPOLOGIA_ANAGRAFICA_OPTIONS } from '~/constants';

    import TableDropdownButtons from '../Filters/TableDropdownButtons/TableDropdownButtons.vue';

    export default defineComponent(
        {
            name: 'table-anagrafiche',
            components: {
                'a-table': Table,
                'table-dropdown-buttons': TableDropdownButtons,
            },
            props: {
                advancedFilters: {
                    type: Object as PropType<ParametersForFilteringType<AnagraficaItemType>>,
                    required: true,
                },
                isLoading: {
                    type: Boolean,
                    required: true,
                },
                tableColumns: {
                    type: Array as PropType<TableColumnsType<AnagraficaItemType>[]>,
                    required: true,
                },
                tableIsShowColumnHeader: {
                    type: Boolean,
                    required: true,
                },
                tablePagination: {
                    type: Object as PropType<TablePaginationType>,
                    required: true,
                },
                tableRows: {
                    type: Array as PropType<AnagraficaItemType[]>,
                    required: true,
                },
            },
            emits: [
                'change',
                'update:advanced-filters',
                'filter-submit',
            ],
            setup( props, { emit } ) {

                const
                    filterChangeHandler = ( value: string, key: string ) => {

                        emit( 'update:advanced-filters', {
                            ... props.advancedFilters,
                            [ key ]: value,
                        } );

                    };

                return {
                    ANAGRAFICA_STATUS_OPTIONS,
                    TIPOLOGIA_ANAGRAFICA_OPTIONS,
                    filterChangeHandler,
                    statoRecord: selectOptionsToRecord( ANAGRAFICA_STATUS_OPTIONS ),
                    tipologiaRecord: selectOptionsToRecord( TIPOLOGIA_ANAGRAFICA_OPTIONS ),
                };

            },
        },
    );
</script>
