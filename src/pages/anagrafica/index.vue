<template>
    <page-layout-table
        create-modal-text-button="Crea anagrafica"
        create-modal-title="Crea anagrafica"
        :is-table-loading="isLoading"
        @click:table-handle-reset="() => tableHandleReset()"
    >
        <!-- Title -->
        <template #title>

            Anagrafica

        </template>

        <template #reset-filters />
        <!-- Table -->
        <template #table>
            <table-anagrafiche
                v-model:advanced-filters="advancedFilters"
                :is-loading="isLoading"
                :table-columns="tableColumns"
                :table-is-show-column-header="tableIsShowColumnHeader"
                :table-pagination="tablePagination"
                :table-rows="tableRows"
                @change="tableOnChange"
                @filter-submit="onFiltersSubmit"
            />
        </template>
    </page-layout-table>
</template>

<script lang="ts">

    import { AnagraficaItemType, TipologiaAnagraficaEnum } from '~/types';

    import {
        defineComponent,
        ref,
        useAnagraficheApi,
        useAntTableFilteringAndSorting,
    } from '#imports';

    import TableAnagrafiche from '~/components/Anagrafiche/Table.vue';

    export default defineComponent(
        {
            name: 'page-listing-anagrafiche',
            components: { 'table-anagrafiche': TableAnagrafiche },
            setup() {

                const searchInput = ref<HTMLInputElement | null>( null )
                      , {
                          // Filters
                          activeFilteringParameters,
                          activeSortingParameters,
                          advancedFilters,
                          // Loading
                          isLoading,
                          // Events
                          onFiltersSubmit,
                          // Table
                          tableColumns,
                          tableHandleReset,
                          tableIsLoading,
                          tableIsRowSelected,
                          tableIsShowColumnHeader,
                          tableOnChange,
                          tablePagination,
                          tableRows,
                      } = useAntTableFilteringAndSorting<AnagraficaItemType>(
                          {
                              columns: [
                                  {
                                      id: 'dataCreazione',
                                      isHidden: true,
                                      title: 'Data Creazione',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'nome',
                                      title: 'Nome',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'cognome',
                                      title: 'Cognome',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'ragioneSociale',
                                      minWidth: 200,
                                      title: 'Ragione sociale',
                                      width: 200,
                                  },
                                  {
                                      id: 'codiceFiscale',
                                      sorter: false,
                                      title: 'Codice fiscale',
                                  },
                                  {
                                      id: 'partitaIva',
                                      minWidth: 150,
                                      sorter: false,
                                      title: 'Partita iva',
                                      width: 150,
                                  },
                                  {
                                      id: 'tipologia',
                                      sorter: false,
                                      title: 'Tipologia',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'email',
                                      title: 'Email',
                                  },
                                  {
                                      id: 'stato',
                                      sorter: false,
                                      title: 'Stato',
                                  },
                              ],
                              service: useAnagraficheApi,
                          }
                      );

                // Return
                return {
                    // Const && Enum
                    TipologiaAnagraficaEnum,

                    // Filters and Sorting
                    activeFilteringParameters,
                    activeSortingParameters,
                    advancedFilters,

                    isLoading,

                    onFiltersSubmit,

                    searchInput,

                    // Table
                    tableColumns,
                    tableHandleReset,
                    tableIsLoading,
                    tableIsRowSelected,
                    tableIsShowColumnHeader,
                    tableOnChange,
                    tablePagination,
                    tableRows,

                };

            },
        }
    );
</script>
