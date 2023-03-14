<template>
    <page-layout-table>

        <!-- Title -->
        <template #title>
            Gestione affidamenti
        </template>

        <!-- Table -->
        <template #table>
            <a-table
                :columns="tableColumns"
                :data-source="tableRows"
                :loading="tableIsLoading"
                :pagination="tablePagination"
                row-key="idAffidamento"
                :show-header="tableIsShowColumnHeader"
                size="small"
                @change="tableOnChange"
            />
        </template>

        <!-- Create Form -->
        <template #create-modal-form="{ createModalFormName, onHandleCreateFormSubmit } : { createModalFormName: string, onHandleCreateFormSubmit: Function }">
            <a-form
                :id="createModalFormName"
                layout="vertical"
                :model="createFormData"
                @submit.prevent="() => onHandleCreateFormSubmit(
                    {
                        listener: createFormOnSubmit,
                    }
                )"
            >

                <a-form-item
                    has-feedback
                    label="Affidamento"
                    :rules="createFormDataRules.idAffidamento"
                    v-bind="createFormDataValidated.idAffidamento"
                >
                    <select-credit-lines v-model:value="createFormData.idAffidamento" />
                </a-form-item>

            </a-form>
        </template>

    </page-layout-table>
</template>

<script lang="ts">

    // AntDesign - Components
    import {
        Form,
        FormItem,
        Table,
    } from 'ant-design-vue';

    // Types
    import type { CreditLinesItemType, FormDataRulesType } from '~/types';

    // Built-in
    import {
        defineComponent,
        reactive,
        useAntTableFilteringAndSorting,
        useCreditLinesLookupApi,
    } from '#imports';

    // Custom - Components
    import SelectCreditLines from '~/components/Form/SelectCreditLines/SelectCreditLines.vue';
    import PageLayoutTable from '~/components/PageLayouts/PageLayoutTable/PageLayoutTable.vue';

    // AntDesign - Form utilities
    const useForm = Form.useForm;

    // Page
    export default defineComponent(
        {
            name: 'listing-credit-lines',
            components: {
                // Form
                'a-form': Form,
                'a-form-item': FormItem,
                // Table
                'a-table': Table,
                // Our Components
                'page-layout-table': PageLayoutTable,
                'select-credit-lines': SelectCreditLines,
            },
            setup() {

                // Const
                const {
                          activeFilteringParameters,
                          activeSortingParameters,
                          loading,
                          tableColumns,
                          tableIsLoading,
                          tableIsShowColumnHeader,
                          tableOnChange,
                          tablePagination,
                          tableRows,
                      } = useAntTableFilteringAndSorting<CreditLinesItemType>(
                          {
                              columns: [
                                  {
                                      id: 'idAffidamento',
                                      isHidden: true,
                                      title: 'ID affidamento',
                                  },
                                  {
                                      id: 'codiceAffidamento',
                                      title: 'Codice affidamento',
                                  },
                                  {
                                      id: 'data_affido',
                                      title: 'Data affido',
                                  },
                                  {
                                      id: 'codice_contratto',
                                      title: 'Contratto',
                                  },
                                  {
                                      id: 'tipologia_servizio',
                                      title: 'Tipo servizio',
                                  },
                                  {
                                      id: 'tipologia_asset',
                                      title: 'Servizi accessori',
                                  },
                                  {
                                      id: 'tipologia_cliente',
                                      title: 'Tipo cliente',
                                  },
                                  {
                                      id: 'stato',
                                      title: 'Stato',
                                  },
                              ],
                              service: useCreditLinesLookupApi,
                          }
                      )
                      // New Form data
                      , createFormData = reactive<Pick<CreditLinesItemType, 'idAffidamento'>>( { idAffidamento: '' } )
                      , createFormDataRules = reactive<FormDataRulesType<Pick<CreditLinesItemType, 'idAffidamento'>>>(
                          {
                              idAffidamento: [
                                  {
                                      required: true,
                                      trigger: 'change',
                                      type: 'string',
                                  },
                              ],
                          }
                      )
                      , { validate: validateFormSubmit, validateInfos: createFormDataValidated } = useForm( createFormData, createFormDataRules )
                      // Form Events
                      , createFormOnSubmit = async() => {

                          loading.value = true;

                          await validateFormSubmit();

                          loading.value = false;

                      }
                ;

                // Return
                return {

                    // Filters and Sorting
                    activeFilteringParameters,
                    activeSortingParameters,

                    // Form
                    createFormData,
                    createFormDataRules,
                    createFormDataValidated,
                    createFormOnSubmit,

                    // Table
                    tableColumns,
                    tableIsLoading,
                    tableIsShowColumnHeader,
                    tableOnChange,
                    tablePagination,
                    tableRows,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./index.scss"
></style>
