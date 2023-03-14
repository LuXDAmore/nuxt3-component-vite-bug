<template>
    <page-layout-table
        bulk-modal-text-button="Modifica affidamento"
        bulk-modal-title="Modifica affidamento"
        create-modal-text-button="Crea lotto"
        create-modal-title="Crea lotto"
        :is-bulk-modal-enabled="tableIsRowSelected"
        :is-table-loading="isLoading"
        @click:advanced-filters-modal-button-cancel="() => handleRestoreAdvancedFiltersBackup()"
        @click:table-handle-reset="() => tableHandleReset()"
    >

        <!-- Title -->
        <template #title>

            Gestione Lotti

        </template>

        <template #table-operations-left>
            <!-- TODO: Fixare questo AS che e fare un componente -->
            <a-radio-group
                v-model:value="advancedFilters.tipologiaAsset"
                button-style="outline"
                :loading="isLoading"
                option-type="button"
                :options="[
                    { label: 'Tutti',value: undefined },
                    ... LOT_ASSET_TYPOLOGY_OPTIONS
                ]"
                @change="() => onFiltersSubmit()"
            />
        </template>

        <template #advanced-filters />
        <template #reset-filters />

        <!-- Extra button -->
        <template
            v-if="tableIsRowSelected"
            #table-operations-right-start
        >

            <a-button
                :loading="isLoading"
                size="small"
                type="link"
                @click="() =>{}"
            >
                <template #icon>
                    <delete-outlined />
                </template>

                Elimina lotti

            </a-button>

        </template>

        <!-- Table -->
        <template #table>
            <a-table
                :columns="tableColumns"
                :data-source="tableRows"
                :loading="tableIsLoading"
                :pagination="tablePagination"
                row-key="idLotto"
                :row-selection="{
                    onChange: tableOnRowSelection,
                    selectedRowKeys: tableSelectedRows,
                }"
                :show-header="tableIsShowColumnHeader"
                size="small"
                @change="tableOnChange"
            >

                <template #bodyCell="{ column, record }">

                    <span
                        v-if="column.dataIndex === 'listaTag'"
                        v-text="record.listaTag.map( ( tag: any ) => tag.nomeTag || '' ).join(', ')"
                    />

                    <span v-else-if="column.dataIndex === 'nomeLotto'">
                        <nuxt-link
                            exact
                            :to="`/lotti/${ record.idLotto }`"
                        >
                            {{ record.nomeLotto || record.idLotto }}
                        </nuxt-link>
                    </span>

                    <span v-else-if="column.dataIndex === 'livelloCompletamento'">
                        <check-circle-outlined v-if="record.livelloCompletamento === LotsCompletionEnum.FULL" />
                    </span>

                    <span
                        v-else-if="column.dataIndex === 'statoLotto'"
                        v-for="stato in LOT_STATUS_OPTIONS"
                        :key="stato.value"
                    >
                        <a-tag
                            v-if="record.statoLotto === stato.value"
                            :color="stato.color"
                        >
                            {{ stato.label }}
                        </a-tag>
                    </span>

                    <a-button
                        v-if="column.dataIndex === 'actions'"
                        size="small"
                        title="Actions"
                        type="text"
                    >

                        <template #icon>
                            <more-outlined />
                        </template>

                    </a-button>

                </template>

                <template #customFilterDropdown="{ column, clearFilters } : { column: { dataIndex: KeyOf<LotItemType> }, clearFilters: GenericEmptyArrowFunctionType }">

                    <select-category-tree
                        v-if="column.dataIndex === 'nomeNanoCategoria'"
                        v-model:value="advancedFilters[ column.dataIndex ]"
                        ref="searchInput"
                        @change="() => onFiltersSubmit( { clearFilters, htmlInputRef: searchInput } )"
                    />

                    <select-tag-lots
                        v-else-if="column.dataIndex === 'listaTag'"
                        v-model:value="advancedFilters[ column.dataIndex ]"
                        ref="searchInput"
                        @change="() => onFiltersSubmit( { clearFilters, htmlInputRef: searchInput } )"
                    />

                    <a-radio-group
                        v-else-if="column.dataIndex === 'livelloCompletamento'"
                        v-model:value="advancedFilters[ column.dataIndex ]"
                        ref="searchInput"
                        :disabled="isLoading"
                        :options="LOT_COMPLETION_OPTIONS"
                        @change="() => onFiltersSubmit( { clearFilters, htmlInputRef: searchInput } )"
                    />

                    <a-checkbox-group
                        v-else-if="column.dataIndex === 'statoLotto'"
                        v-model:value="advancedFilters[ column.dataIndex ]"
                        ref="searchInput"
                        :disabled="isLoading"
                        :options="LOT_STATUS_OPTIONS"
                        @change="() => onFiltersSubmit( { clearFilters, htmlInputRef: searchInput } )"
                    />

                    <a-input
                        v-else
                        v-model:value.lazy="advancedFilters[ column.dataIndex ]"
                        ref="searchInput"
                        :disabled="isLoading"
                        :placeholder="formatInputPlaceholder(column.dataIndex)"
                        @press-enter="() => onFiltersSubmit( { clearFilters, htmlInputRef: searchInput } )"
                    />

                    <table-dropdown-buttons
                        v-model:value="advancedFilters[ column.dataIndex ]"
                        :loading="isLoading"
                        @click="() => onFiltersSubmit( { clearFilters } )"
                    />

                </template>

            </a-table>
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
                    label="Nome"
                    :rules="createFormDataRules.nomeLotto"
                    v-bind="createFormDataValidated.nomeLotto"
                >

                    <input-text-multilanguage
                        v-model:en="createFormData.nomeLotto.en"
                        v-model:es="createFormData.nomeLotto.es"
                        v-model:it="createFormData.nomeLotto.it"
                        autofocus
                        placeholder="Nome"
                    />

                </a-form-item>

                <a-form-item
                    has-feedback
                    label="Categoria"
                    :rules="createFormDataRules.idNanoCategoria"
                    v-bind="createFormDataValidated.idNanoCategoria"
                >
                    <!-- TODO: Qui c'è un errore Invalid prop: type check failed for prop "value". -->
                    <select-category-tree
                        v-model:value="createFormData.idNanoCategoria"
                        :tipologia="CategoryTypologyEnum.NANO"
                    />
                </a-form-item>

                <a-form-item
                    has-feedback
                    label="Affidamento"
                    :rules="createFormDataRules.idAffidamento"
                    v-bind="createFormDataValidated.idAffidamento"
                >
                    <select-credit-lines
                        v-model:value="createFormData.idAffidamento"
                        show-preview-link
                    />
                </a-form-item>

            </a-form>
        </template>

        <!-- Advanced Filters Form -->
        <template #advanced-filters-modal-form="{ advancedFiltersModalFormName, onHandleAdvancedFiltersFormSubmit } : { advancedFiltersModalFormName: string, onHandleAdvancedFiltersFormSubmit: Function }">
            <a-form
                :id="advancedFiltersModalFormName"
                class="lot-advanced-search-form"
                layout="vertical"
                :model="advancedFilters"
                @submit.prevent="() => onHandleAdvancedFiltersFormSubmit(
                    {
                        listener: onFiltersSubmit,
                    }
                )"
            >

                <a-row :gutter="32">
                    <a-col :span="12">
                        <a-typography-title :level="5">
                            Lotto
                        </a-typography-title>

                        <a-row>
                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Lotto"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.codiceLotto"
                                        autofocus
                                        placeholder="Lotto"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Nome"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.nomeLotto"
                                        autofocus
                                        placeholder="Nome"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Identificativo"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.idEsternoLotto"
                                        autofocus
                                        placeholder="Identificativo"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Tag">
                                            Tag
                                        </label>
                                    </div>
                                    <select-tag-lots
                                        v-model:value="advancedFilters.listaTag"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Categoria">
                                            Categoria
                                        </label>
                                    </div>
                                    <select-category-tree
                                        v-model:value="advancedFilters.nomeNanoCategoria"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Tribunale">
                                            Tribunale
                                        </label>
                                    </div>
                                    <select-tribunals
                                        v-model:value="advancedFilters.idTribunale"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Completamento">
                                            Completamento
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.livelloCompletamento"
                                        :options="LOT_COMPLETION_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Stato">
                                            Stato
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.statoLotto"
                                        mode="multiple"
                                        :options="LOT_STATUS_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Motivo stato">
                                            Motivo stato
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.motivazioneStato"
                                        :options="LOT_MOTIVATION_STATUS_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Dimensione">
                                            Dimensione
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.dimensione"
                                        :options="LOT_DIMENSIONS_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Salesman">
                                            Salesman
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.idSalesman"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Asset manager mandante">
                                            Asset manager mandante
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.idAssetManagerMandante"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Referente proprietà mandante">
                                            Referente proprietà mandante
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.idReferentePropMandante"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Broker">
                                            Broker
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.idGestoreBroker"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                    </a-col>

                    <a-col :span="12">
                        <a-typography-title :level="5">
                            Affidamento
                        </a-typography-title>

                        <a-row>
                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Contratto"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.codiceContratto"
                                        autofocus
                                        placeholder="Contratto"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Affidamento">
                                            Affidamento
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.codiceAffidamento"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Data Affido">
                                            Data Affido
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.dataAffido"
                                        disabled
                                        :options="[]"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Tipologia Asset">
                                            Tipologia Asset
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.tipologiaAsset"
                                        :options="LOT_ASSET_TYPOLOGY_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Tipologia servizio">
                                            Tipologia servizio
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.tipologiaServizio"
                                        :options="LOT_SERVICE_TYPOLOGY_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item>
                                    <div class="ant-col ant-form-item-label">
                                        <label title="Tipologia cliente">
                                            Tipologia cliente
                                        </label>
                                    </div>
                                    <select-filter
                                        v-model:value="advancedFilters.tipologiaCliente"
                                        :options="LOT_CUSTOMER_TYPOLOGY_OPTIONS"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Codice mandante"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.codiceMandante"
                                        autofocus
                                        placeholder="Codice mandante"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Nome mandante"
                                >
                                    <a-input
                                        v-model:value.lazy="advancedFilters.nomeMandante"
                                        autofocus
                                        placeholder="Nome mandante"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Numero RG"
                                >
                                    <a-input-number
                                        v-model:value.lazy="advancedFilters.numeroRG"
                                        autofocus
                                        placeholder="Numero RG"
                                    />
                                </a-form-item>
                            </a-col>

                            <a-col :span="12">
                                <a-form-item
                                    has-feedback
                                    label="Anno RG"
                                >
                                    <a-input-number
                                        v-model:value.lazy="advancedFilters.annoRG"
                                        autofocus
                                        placeholder="Anno RG"
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                    </a-col>
                </a-row>

            </a-form>
        </template>

        <!-- Bulk operation -->
        <template #bulk-modal-form="{ bulkModalFormName, onHandleBulkFormSubmit } : { bulkModalFormName: string, onHandleBulkFormSubmit: Function }">
            <a-form
                :id="bulkModalFormName"
                layout="vertical"
                :model="bulkFormData"
                @submit.prevent="() => onHandleBulkFormSubmit(
                    {
                        listener: bulkFormOnSubmit,
                    }
                )"
            >
                <p>
                    Sposta i lotti selezionati nell'affidamento scelto
                </p>

                <a-form-item
                    has-feedback
                    label="Cerca affidamento"
                    :rules="bulkFormDataRules.idAffidamento"
                    v-bind="bulkFormDataValidated.idAffidamento"
                >
                    <select-credit-lines
                        v-model:value="bulkFormData.idAffidamento"
                        show-preview-link
                    />
                </a-form-item>

            </a-form>
        </template>

    </page-layout-table>
</template>

<script lang="ts">

    // AntDesign - Components
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import {
        Form,
        FormItem,
        Input,
        InputNumber,
        Table,
        Tag,
    } from 'ant-design-vue';

    import type {
        FormDataRulesType,
        GenericEmptyArrowFunctionType, // eslint-disable-line @typescript-eslint/no-unused-vars
        KeyOf, // eslint-disable-line @typescript-eslint/no-unused-vars
        LotItemType,
    } from '~/types';
    import { CategoryTypologyEnum, LotsCompletionEnum } from '~/types';

    // Built-in
    import {
        defineComponent,
        reactive,
        ref,
        useAntTableFilteringAndSorting,
        useLotsApi,
    } from '#imports';

    // Custom - Components
    import SelectFilter from '~/components/Filters/SelectFilter/SelectFilter.vue';
    import TableDropdownButtons from '~/components/Filters/TableDropdownButtons/TableDropdownButtons.vue';
    import InputTextMultilanguage from '~/components/Form/InputTextMultilanguage/InputTextMultilanguage.vue';

    import SelectCategoryTree from '~/components/Form/SelectCategoryTree/SelectCategoryTree.vue';
    import SelectCreditLines from '~/components/Form/SelectCreditLines/SelectCreditLines.vue';
    import SelectTagLots from '~/components/Form/SelectTagLots/SelectTagLots.vue';
    import SelectTribunals from '~/components/Form/SelectTribunals/SelectTribunals.vue';
    import PageLayoutTable from '~/components/PageLayouts/PageLayoutTable/PageLayoutTable.vue';

    // Constants
    import {
        LOT_ASSET_TYPOLOGY_OPTIONS,
        LOT_COMPLETION_OPTIONS,
        LOT_CUSTOMER_TYPOLOGY_OPTIONS,
        LOT_DIMENSIONS_OPTIONS,
        LOT_MOTIVATION_STATUS_OPTIONS,
        LOT_SERVICE_TYPOLOGY_OPTIONS,
        LOT_STATUS_OPTIONS,
    } from '~/constants';

    // AntDesign - Form utilities
    const useForm = Form.useForm;

    // Page
    export default defineComponent(
        {
            name: 'page-listing-lots',
            components: {
                // Form
                'a-form': Form,
                'a-form-item': FormItem,
                'a-input': Input,
                'a-input-number': InputNumber,
                // Table
                'a-table': Table,
                'a-tag': Tag,
                // Icon
                'delete-outlined': DeleteOutlined,
                // Our Components
                'input-text-multilanguage': InputTextMultilanguage,
                'page-layout-table': PageLayoutTable,
                'select-category-tree': SelectCategoryTree,
                'select-credit-lines': SelectCreditLines,
                'select-filter': SelectFilter,
                'select-tag-lots': SelectTagLots,
                'select-tribunals': SelectTribunals,
                'table-dropdown-buttons': TableDropdownButtons,
            },
            setup() {

                // Const
                const searchInput = ref<HTMLInputElement | null>( null )
                      , {
                          // Filters
                          advancedFilters,
                          activeFilteringParameters,
                          activeSortingParameters,
                          handleRestoreAdvancedFiltersBackup,
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
                          tableOnRowSelection,
                          tablePagination,
                          tableRows,
                          tableSelectedRows,
                      } = useAntTableFilteringAndSorting<LotItemType>(
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
                                      id: 'codiceLotto',
                                      title: 'Lotto',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'nomeLotto',
                                      title: 'Nome',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'idEsternoLotto',
                                      title: 'ID',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      htmlInputRef: searchInput,
                                      id: 'nomeMandante',
                                      title: 'Mandante',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      id: 'listaTag',
                                      title: 'Tag',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      id: 'nomeNanoCategoria',
                                      renamedFilter: 'idNanoCategoria',
                                      title: 'Categoria',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      id: 'livelloCompletamento',
                                      title: 'Completamento',
                                  },
                                  {
                                      hasDropdownFilter: true,
                                      id: 'statoLotto',
                                      title: 'Stato',
                                  },
                              ],
                              service: useLotsApi,
                          }
                      )
                      // New Form data
                      , createFormInitialValues = ref<Pick<LotItemType, 'idAffidamento' | 'idNanoCategoria' | 'nomeLotto'>>(
                          {
                              idAffidamento: '',
                              idNanoCategoria: '',
                              nomeLotto: {
                                  en: '',
                                  es: '',
                                  it: '',
                              },
                          }
                      )
                      , createFormData = ref<Pick<LotItemType, 'idAffidamento' | 'idNanoCategoria' | 'nomeLotto'>>(
                          {
                              ... createFormInitialValues.value,
                              nomeLotto: { ... createFormInitialValues.value.nomeLotto },
                          }
                      )
                      , createFormDataRules = reactive<FormDataRulesType<Pick<LotItemType, 'idAffidamento' | 'idNanoCategoria' | 'nomeLotto'>>>(
                          {
                              idAffidamento: [
                                  {
                                      message: 'Campo obbligatorio!',
                                      required: true,
                                      trigger: [ 'change', 'blur' ],
                                      type: 'string',
                                  },
                              ],
                              idNanoCategoria: [
                                  {
                                      message: 'Campo obbligatorio!',
                                      required: true,
                                      trigger: [ 'change', 'blur' ],
                                      type: 'string',
                                  },
                              ],
                              nomeLotto: [
                                  {
                                      message: 'Campo IT obbligatorio!',
                                      required: true,
                                      trigger: [ 'change', 'blur' ],
                                      type: 'string',
                                      validator( rule, value: LotItemType[ 'nomeLotto' ] ) {

                                          if( ! value.it )
                                              return Promise.reject( rule.message );

                                          return Promise.resolve();

                                      },
                                  },
                              ],
                          }
                      )
                      , bulkFormData = ref<Pick<LotItemType, 'idAffidamento'>>(
                          { idAffidamento: '' }
                      )
                      , bulkFormDataRules = reactive<FormDataRulesType<Pick<LotItemType, 'idAffidamento'>>>(
                          {
                              idAffidamento: [
                                  {
                                      message: 'Campo obbligatorio!',
                                      required: true,
                                      trigger: [ 'change', 'blur' ],
                                      type: 'string',
                                  },
                              ],
                          }
                      )
                      , { validate: validateCreateFormSubmit, validateInfos: createFormDataValidated } = useForm( createFormData, createFormDataRules )
                      , { validate: validateBulkFormSubmit, validateInfos: bulkFormDataValidated } = useForm( bulkFormData, bulkFormDataRules )
                      // Form Events
                      , createFormOnSubmit = async(): Promise<void> => {

                          await validateCreateFormSubmit();

                          await useLotsApi(
                              {
                                  body: createFormData.value,
                                  method: 'POST',
                              }
                          );

                          await tableHandleReset();

                          resetCreateFormData();

                      }
                      , resetCreateFormData = (): void => {

                          createFormData.value = {
                              ... createFormInitialValues.value,
                              nomeLotto: { ... createFormInitialValues.value.nomeLotto },
                          };

                      }
                      , bulkFormOnSubmit = async() => {

                          await validateBulkFormSubmit();

                          console.info( 'Modifica affidamento', bulkFormData.value );

                          //   await useLotsApi(
                          //       {
                          //           body: bulkFormData.value,
                          //           method: 'POST',
                          //       }
                          //   );

                          await tableHandleReset();

                      }
                ;

                // Return
                return {

                    // Const && Enum
                    CategoryTypologyEnum,
                    LOT_ASSET_TYPOLOGY_OPTIONS,
                    LOT_COMPLETION_OPTIONS,
                    LOT_CUSTOMER_TYPOLOGY_OPTIONS,
                    LOT_DIMENSIONS_OPTIONS,
                    LOT_MOTIVATION_STATUS_OPTIONS,
                    LOT_SERVICE_TYPOLOGY_OPTIONS,
                    LOT_STATUS_OPTIONS,
                    LotsCompletionEnum,

                    // Filters and Sorting
                    activeFilteringParameters,
                    activeSortingParameters,
                    advancedFilters,

                    // Form
                    bulkFormData,
                    bulkFormDataRules,
                    bulkFormDataValidated,
                    bulkFormOnSubmit,

                    createFormData,
                    createFormDataRules,
                    createFormDataValidated,
                    createFormOnSubmit,

                    handleRestoreAdvancedFiltersBackup,

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
                    tableOnRowSelection,
                    tablePagination,
                    tableRows,
                    tableSelectedRows,

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
