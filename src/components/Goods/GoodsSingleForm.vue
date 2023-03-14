<template>
    <span v-if="isFormDisabled">
        Impossibile procedere: il lotto è in stato {{ statoLotto }}.
    </span>
    <a-spin v-else-if="isGoodLoading" />
    <a-form
        v-else
        ref="formReference"
        :id="createModalFormName"
        class="lot-advanced-search-form goods-single-form"
        layout="vertical"
        :model="createGoodsFormData"
        @submit.prevent="() => onHandleCreateFormSubmit(
            {
                listener: idBene ? editGoodsFormOnSubmit : createGoodsFormOnSubmit,
            }
        )"
    >
        <a-form-item
            has-feedback
            label="Categoria"
            :rules="createGoodsFormDataRules.idNanoCategoria"
            v-bind="createGoodsFormDataValidated.idNanoCategoria"
        >
            <select-category-tree
                v-model:value="createGoodsFormData.idNanoCategoria"
                allow-clear
            />
        </a-form-item>
        <a-row v-if="isGoodAssetCategoryImmobiliare">
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Tipologia di catasto"
                >
                    <a-select
                        v-model:value="createGoodsFormData.datiCatastali.catasto"
                        :options="LOT_GOODS_CADASTRE_OPTIONS"
                        placeholder="Scegli"
                    />
                </a-form-item>

            </a-col>
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Categoria catastale"
                >
                    <a-select
                        v-model:value="createGoodsFormData.datiCatastali.categoriaCatasto"
                        :options="LOT_GOODS_CADASTRE_CATEGORY_OPTIONS"
                        placeholder="Scegli"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Comune"
                >
                    <a-select
                        v-model:value="createGoodsFormData.datiCatastali.idComune"
                        :options="[
                            {
                                label: 'D458 - FAENZA',
                                value: '05b7baba-5614-4e63-b18d-95a4704629c4',
                            },
                            {
                                label: 'F205 - MILANO',
                                value: '607f8e87-3106-4d0c-9e7a-f291af6898d2',
                            },
                            {
                                label: 'H294 - RIMINI',
                                value: '70d33ff0-cd3f-40cc-ab2a-7b0ed87dd5b1',
                            },
                        ]"
                        placeholder="Scegli"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Proprietà"
                >
                    <a-select
                        v-model:value="createGoodsFormData.datiCatastali.proprieta"
                        :options="LOT_GOODS_PROPERTY_OPTIONS"
                        placeholder="Scegli"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Quota"
                >
                    <a-input-number
                        v-model:value="createGoodsFormData.datiCatastali.quota"
                        decimal-separator=","
                        :min="0"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Perizia"
                >
                    <a-input-number
                        v-model:value="createGoodsFormData.datiCatastali.perizia"
                        decimal-separator=","
                        :min="0"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Ipoteca %"
                >
                    <a-input-number
                        v-model:value="createGoodsFormData.datiCatastali.ipoteca"
                        decimal-separator=","
                        :formatter="value => `${ value }%`"
                        :max="100"
                        :min="0"
                        :parser="value => value.replace( '%', '' )"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Sezione"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiCatastali.sezione"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Foglio"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiCatastali.foglio"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Mappale"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiCatastali.mappale"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Subalterno"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiCatastali.subalterno"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item
                    has-feedback
                    label="Asset ID illimity"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiCatastali.idEsterno"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-row v-if="isGoodAssetCategoryMobiliare">
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Targa"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiTargati.targa"
                    />
                </a-form-item>

            </a-col>
            <a-col :span="12">
                <a-form-item
                    has-feedback
                    label="Telaio"
                >
                    <a-input
                        v-model:value="createGoodsFormData.datiTargati.telaio"
                    />
                </a-form-item>
            </a-col>
        </a-row>
        <a-form-item
            v-if="createGoodsFormData.idNanoCategoria"
            has-feedback
            label="Nome"
            :rules="createGoodsFormDataRules.nomeBene"
            v-bind="createGoodsFormDataValidated.nomeBene"
        >
            <a-input
                v-model:value="createGoodsFormData.nomeBene"
                :suffix="(automaticGoodCreateSuffix && createGoodsFormData.nomeBene )
                    ? ` - ${ automaticGoodCreateSuffix }`
                    : automaticGoodCreateSuffix"
            />
        </a-form-item>
        <a-row v-if="isGoodAssetCategoryImmobiliare">
            <a-col :span="24">
                <a-form-item>
                    <a-checkbox v-model:checked="createGoodsFormData.datiCatastali.graffato">
                        Bene graffato
                    </a-checkbox>
                </a-form-item>
            </a-col>
            <a-col
                v-if="createGoodsFormData.datiCatastali.graffato"
                :span="24"
            >
                <a-form-item
                    has-feedback
                    label="Note graffatura"
                >
                    <a-textarea v-model:value="createGoodsFormData.datiCatastali.noteGraffatura" />
                </a-form-item>

            </a-col>
        </a-row>
    </a-form>
</template>

<script lang="ts">
    // AntDesign - Components
    import {
        Col,
        Form,
        FormItem,
        Input,
        InputNumber,
        Row,
        Select,
        Spin,
    } from 'ant-design-vue';

    import { FormInstance } from 'ant-design-vue/es';

    // Third party
    import cloneDeep from 'lodash/cloneDeep';
    import isEqual from 'lodash/isEqual';

    // Types
    import type {
        CategoryTreeType,
        FormDataRulesType,
        LotGoodsItemType,
    } from '~/types';

    import {
        LotCategoryEnum,
        LotsStatusEnum,
    } from '~/types';

    // Built-In
    import {
        computed,
        defineComponent,
        ref,
        toRefs,
        useApiDataPatch,
        useAsyncData,
        useSingleLotSingleGoodApi,
        useSingleLotsGoodsApi,
        watch,
    } from '#imports';

    // Custom - Components
    import SelectCategoryTree from '~/components/Form/SelectCategoryTree/SelectCategoryTree.vue';

    // Costants
    import {
        LOT_GOODS_CADASTRE_CATEGORY_OPTIONS,
        LOT_GOODS_CADASTRE_OPTIONS,
        LOT_GOODS_PROPERTY_OPTIONS,
    } from '~/constants';

    // Store
    import { useCategoriesTreeStore } from '~/store';

    // AntDesign - Form utilities
    const useForm = Form.useForm;

    // Component
    export default defineComponent(
        {
            name: 'goods-single-form',
            components: {
                // Ant
                'a-col': Col,
                'a-form': Form,
                'a-form-item': FormItem,
                'a-input': Input,
                'a-input-number': InputNumber,
                'a-row': Row,
                'a-select': Select,
                'a-spin': Spin,
                // Custom - Components
                'select-category-tree': SelectCategoryTree,
            },
            inheritAttrs: false,
            props: {
                createModalFormName: {
                    type: String,
                    default: 'create-form',
                    validator( value ) {

                        return !! value;

                    },
                },
                idBene: {
                    type: String,
                    default: undefined,
                },
                idLotto: {
                    type: String,
                    default: undefined,
                },
                isGoodsModalOpen: {
                    type: Boolean,
                    default: false,
                },
                onHandleCreateFormSubmit: {
                    type: Function,
                    default() {},
                },
                statoLotto: {
                    type: String,
                    default: undefined,
                },
            },
            emits: [
                'form:refresh-goods-after-submit',
                'nome-bene',
                'is-goods-form-data-modified',
            ],
            setup( props, { emit } ) {

                // Define Vars
                const createGoodsFormInitialValues: LotGoodsItemType = {
                          datiCatastali: {
                              catasto: undefined,
                              categoriaCatasto: undefined,
                              foglio: undefined,
                              graffato: false,
                              idComune: undefined,
                              idEsterno: undefined,
                              ipoteca: undefined,
                              mappale: undefined,
                              noteGraffatura: undefined,
                              perizia: undefined,
                              proprieta: undefined,
                              quota: undefined,
                              sezione: undefined,
                              subalterno: undefined,
                          },
                          datiTargati: {
                              targa: undefined,
                              telaio: undefined,
                          },
                          idNanoCategoria: undefined,
                          nomeBene: undefined,
                      }
                      // Props
                      , {
                          idBene,
                          idLotto,
                          statoLotto,
                      } = toRefs( props )
                      // Form Goods
                      , createGoodsFormData = ref<LotGoodsItemType>( cloneDeep( createGoodsFormInitialValues ) )
                      , backupGoodsFormData = ref<LotGoodsItemType | Record<string, never>>( {} )
                      , isGoodsFormDataModified = computed<boolean>(
                          () => {

                              if( idBene.value )
                                  return ! isEqual( createGoodsFormData.value, backupGoodsFormData.value );

                              return true;

                          }
                      )
                      , formReference = ref<FormInstance>()
                      // Store
                      // Categories
                      , categoriesTreeStore = useCategoriesTreeStore()
                      , { getCategoriesTreeItems, getCategoriesParentTree } = categoriesTreeStore
                      // Categories
                      , goodAssetCategory = ref<CategoryTreeType>( {} )
                      , isGoodAssetCategoryImmobiliare = computed<boolean>( () => ( !! ( ( goodAssetCategory.value.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.IMMOBILIARE.toUpperCase() ) ) )
                      , isGoodAssetCategoryMobiliare = computed<boolean>( () => ( !! ( ( goodAssetCategory.value.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.MOBILIARE.toUpperCase() ) ) )
                      , isGoodAssetCategoryImmateriale = computed<boolean>( () => ( !! ( ( goodAssetCategory.value.ASSET_CLASS?.nomeCategoria || '' ).toUpperCase() === LotCategoryEnum.IMMATERIALE.toUpperCase() ) ) )
                      , automaticGoodCreateSuffix = computed<string>(
                          () => {

                              let nameSuffix = '';

                              if( isGoodAssetCategoryImmobiliare.value && ! idBene.value )
                                  nameSuffix = `${ createGoodsFormData.value.datiCatastali.catasto ? ` - ${ createGoodsFormData.value.datiCatastali.catasto.toUpperCase() }` : '' }${ createGoodsFormData.value.datiCatastali.sezione ? ` - ${ createGoodsFormData.value.datiCatastali.sezione }` : '' }${ createGoodsFormData.value.datiCatastali.foglio ? ` - ${ createGoodsFormData.value.datiCatastali.foglio }` : '' }${ createGoodsFormData.value.datiCatastali.mappale ? ` - ${ createGoodsFormData.value.datiCatastali.mappale }` : '' }${ createGoodsFormData.value.datiCatastali.subalterno ? ` - ${ createGoodsFormData.value.datiCatastali.subalterno }` : '' }`;

                              if( isGoodAssetCategoryMobiliare.value && ! idBene.value )
                                  nameSuffix = `${ createGoodsFormData.value.datiTargati.targa ? ` - ${ createGoodsFormData.value.datiTargati.targa }` : '' }${ createGoodsFormData.value.datiTargati.telaio ? ` - ${ createGoodsFormData.value.datiTargati.telaio }` : '' }`;

                              return nameSuffix.startsWith( ' - ' ) ? nameSuffix.replace( ' - ', '' ) : nameSuffix;

                          }
                      )
                      , automaticGoodCreateName = computed<string>( () => {

                          if( createGoodsFormData.value.nomeBene?.length )
                              return `${ createGoodsFormData.value.nomeBene }${ automaticGoodCreateSuffix.value.length ? ` - ${ automaticGoodCreateSuffix.value }` : '' }`;

                          return automaticGoodCreateSuffix.value.length ? automaticGoodCreateSuffix.value : '-';

                      } )
                      // Rules
                      , createGoodsFormDataRules = computed<FormDataRulesType<Pick<LotGoodsItemType, 'nomeBene' | 'idNanoCategoria'>>>(
                          () => (
                              {
                                  idNanoCategoria: [
                                      {
                                          message: 'Campo obbligatorio!',
                                          required: true,
                                          trigger: [ 'change', 'blur' ],
                                          type: 'string',
                                      },
                                  ],
                                  nomeBene: [
                                      {
                                          message: 'Campo obbligatorio!',
                                          required: isGoodAssetCategoryImmateriale.value,
                                          trigger: [ 'change', 'blur' ],
                                          type: 'string',
                                      },
                                  ],
                              }
                          )
                      )
                      //   Form Events
                      , { validate: validateCreateGoodsFormSubmit, validateInfos: createGoodsFormDataValidated } = useForm( createGoodsFormData, createGoodsFormDataRules )
                      , resetGoodsFormData = (): void => {

                          goodAssetCategory.value = {};
                          createGoodsFormData.value = cloneDeep<LotGoodsItemType>( createGoodsFormInitialValues );

                      }
                      , createGoodsFormOnSubmit = async(): Promise<void> => {

                          await validateCreateGoodsFormSubmit();

                          await useSingleLotsGoodsApi(
                              {
                                  body: {
                                      ... createGoodsFormData.value,
                                      nomeBene: automaticGoodCreateName.value,
                                  },
                                  id: idLotto.value,
                                  method: 'POST',
                              }
                          );

                          resetGoodsFormData();

                          emit( 'form:refresh-goods-after-submit' );

                      }
                      , editGoodsFormOnSubmit = async(): Promise<void> => {

                          await validateCreateGoodsFormSubmit();

                          await useSingleLotSingleGoodApi(
                              {
                                  body: createGoodsFormData.value,
                                  id: idLotto.value,
                                  idChild: idBene.value,
                                  method: 'PUT',
                              }
                          );

                          emit( 'form:refresh-goods-after-submit' );

                      }
                      , isFormDisabled = computed<boolean>(
                          () => {

                              if(
                                  statoLotto.value === LotsStatusEnum.ATTIVO
                                  || statoLotto.value === LotsStatusEnum.FINALIZZAZIONE_IN_CORSO
                                  || statoLotto.value === LotsStatusEnum.USCITO_DAL_PORTAFOGLIO
                              )
                                  return true;

                              return false;

                          }
                      )
                      , isGoodLoading = ref<boolean>( false )
                ;

                watch(
                    idBene,
                    async newIdBene => {

                        if( ! newIdBene ) {

                            resetGoodsFormData();

                            emit( 'nome-bene', undefined );

                            return;

                        }

                        isGoodLoading.value = true;

                        const { data } = await useAsyncData(
                                  'single-good',
                                  () => useSingleLotSingleGoodApi(
                                      {
                                          id: idLotto.value,
                                          idChild: newIdBene,
                                      }
                                  )
                              )
                              , single = data?.value?.data ?? {} as LotGoodsItemType
                        ;

                        emit( 'nome-bene', `${ single.codiceBene }${ single.nomeBene ? ` - ${ single.nomeBene }` : '' }` );

                        const lotGood = useApiDataPatch<LotGoodsItemType>(
                            single,
                            {
                                omitKey: [
                                    'assetClassNanoCategoria',
                                    'codiceBene',
                                    'idBene',
                                    'nomeNanoCategoria',
                                ],
                            }
                        );

                        backupGoodsFormData.value = cloneDeep<LotGoodsItemType>( lotGood );
                        createGoodsFormData.value = cloneDeep<LotGoodsItemType>( lotGood );

                        isGoodLoading.value = false;

                    },
                    { immediate: true }
                );

                watch(
                    () => createGoodsFormData.value.datiCatastali.graffato,
                    () => {

                        if( createGoodsFormData.value.datiCatastali.graffato )
                            return;

                        createGoodsFormData.value.datiCatastali.noteGraffatura = undefined;

                    }
                );

                watch(
                    () => createGoodsFormData.value.idNanoCategoria,
                    async newValue => {

                        if( ! newValue ) {

                            resetGoodsFormData();
                            return;

                        }

                        await getCategoriesTreeItems();

                        goodAssetCategory.value = getCategoriesParentTree( { idNanoCategoria: newValue } );

                        if( idBene.value )
                            return;

                        createGoodsFormData.value = cloneDeep(
                            {
                                ... createGoodsFormInitialValues,
                                idNanoCategoria: newValue,
                            }
                        );

                    }
                );

                watch(
                    isGoodsFormDataModified,
                    newIsGoodsFormDataModified => {

                        emit( 'is-goods-form-data-modified', newIsGoodsFormDataModified );

                    }
                );

                return {

                    // Data
                    LOT_GOODS_CADASTRE_CATEGORY_OPTIONS,
                    LOT_GOODS_CADASTRE_OPTIONS,
                    LOT_GOODS_PROPERTY_OPTIONS,

                    LotCategoryEnum,

                    automaticGoodCreateSuffix,

                    createGoodsFormData,
                    createGoodsFormDataRules,
                    createGoodsFormDataValidated,

                    createGoodsFormOnSubmit,
                    editGoodsFormOnSubmit,

                    formReference,

                    isFormDisabled,

                    isGoodAssetCategoryImmateriale,
                    isGoodAssetCategoryImmobiliare,
                    isGoodAssetCategoryMobiliare,

                    isGoodLoading,

                };

            },
        }
    );

</script>
