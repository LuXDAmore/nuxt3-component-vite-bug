<template>
    <a-select
        allow-clear
        :default-active-first-option="false"
        dropdown-class-name="select-lots"
        :field-names="fieldNames"
        :filter-option="false"
        :loading="isLoading"
        :mode="mode"
        :option-label-prop="fieldLabel"
        :options="options"
        :placeholder="placeholder"
        :show-arrow="false"
        show-search
        :size="size"
        :value="selectValue"
        @change="onUpdateSelect"
        @click="onClick"
        @search="onSearch"
    >
        <template #option="option">

            <span
                v-text="`${ option.codiceLotto } - ${ option.nomeLotto } - ${ option.codiceAffidamento }`"
            />

            <nuxt-link
                v-if="showPreviewLink && option[ fieldValue ]"
                target="_blank"
                :to="`${ baseUrl }/${ option[ fieldValue ] }`"
                @click="option.onClose"
            >
                Apri <select-outlined :rotate="90" />
            </nuxt-link>

        </template>
    </a-select>
</template>

<script lang="ts">

    // AntDesign - Components
    import { SelectOutlined } from '@ant-design/icons-vue';
    import { Select } from 'ant-design-vue';

    // Ant Types
    import type { SizeType } from 'ant-design-vue/lib/config-provider';
    import type { SelectValue } from 'ant-design-vue/lib/select';

    // Third party
    import debounce from 'lodash/debounce';

    // Types
    import { LotsStatusEnum } from '~/types';
    import type { ApiFetchOptionsWithIdType, LotItemType } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import {
        computed,
        defineComponent,
        ref,
        toRefs,
        useLotsApi,
        watch,
    } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'select-lots',
            components: {
                // Components
                'a-select': Select,
                'select-outlined': SelectOutlined,
            },
            inheritAttrs: false,
            props: {
                baseUrl: {
                    type: String,
                    default: '/lotti',
                },
                defaultOptions: {
                    type: [ Array, Object ] as PropType<LotItemType[]>,
                    default: () => ( [] ),
                },
                fieldLabel: {
                    type: String as PropType<keyof LotItemType>,
                    default: 'nomeLotto',
                },
                fieldValue: {
                    type: String as PropType<keyof LotItemType>,
                    default: 'idLotto',
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                mode: {
                    type: String as PropType<'multiple' | 'tags'>,
                    default: undefined,
                },
                omitOptions: {
                    type: [ String, Array ] as PropType<SelectValue>,
                    default: undefined,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona un lotto',
                },
                showPreviewLink: {
                    type: Boolean,
                    default: false,
                },
                size: {
                    type: String as PropType<SizeType>,
                    default: undefined,
                },
                value: {
                    type: [ String, Array ] as PropType<LotItemType['idLotto'] | LotItemType['idLotto'][]>,
                    default: undefined,
                },
            },
            emits: [ 'update:value' ],
            setup( props, { emit } ) {

                // Define Vars
                const
                    // Props
                    {
                        defaultOptions,
                        fieldLabel,
                        fieldValue,
                        loading,
                        mode,
                        omitOptions,
                        value,
                    } = toRefs( props )
                    , fieldNames = computed(
                        () => (
                            {
                                label: fieldLabel.value,
                                value: fieldValue.value,
                            }
                        )
                    )
                    , searchQuery = ref<string>( '' )
                    // Lots
                    , configurationApi = computed<ApiFetchOptionsWithIdType>(
                        () => (
                            {
                                params: {
                                    codiceLotto: searchQuery.value,
                                    page: 1,
                                    per_page: 5,
                                    statoLotto: [
                                        LotsStatusEnum.BOZZA,
                                        LotsStatusEnum.IN_LAVORAZIONE,
                                        LotsStatusEnum.IN_ATTESA_DI_SOPRALLUOGO,
                                    ],
                                },
                            }
                        )
                    )
                    , items = ref<LotItemType[]>( defaultOptions.value )
                    , loadingLots = ref<boolean>( false )
                    , isLoading = computed<boolean>( () => loading.value || loadingLots.value )
                    , options = computed<LotItemType[]>(
                        () => {

                            const options = items.value.length ? items.value : defaultOptions.value
                                  , cleanOptions = ( options || [] ).filter( option => ( option[ fieldValue.value ] !== omitOptions.value ) )
                            ;

                            return cleanOptions;

                        }
                    )
                    , selectValue = computed<LotItemType['idLotto'] | LotItemType['idLotto'][]>(
                        () => {

                            if( mode.value === 'multiple' && Array.isArray( value.value ) ) {

                                const objectToString = ( value.value || [] ).map(
                                    ( value: LotItemType['idLotto'] ) => {

                                        if( typeof value === 'string' )
                                            return value;

                                        return value[ fieldValue.value ];

                                    }
                                );

                                return ( objectToString || [] ).filter( ( element: string ) => element !== omitOptions.value );

                            }

                            return value.value;

                        }
                    )
                    , loadDataLots = async( config: ApiFetchOptionsWithIdType ): Promise<void> => {

                        loadingLots.value = true;

                        const { data } = await useLotsApi( config );

                        items.value = data ?? ( {} as LotItemType[] );

                        loadingLots.value = false;

                    }

                    // Events
                    , onClick = async() => {

                        await loadDataLots( configurationApi.value );

                    }
                    , onSearch = ( value: string ) => {

                        searchQuery.value = value;

                    }
                    , onUpdateSelect = ( value: SelectValue ) => {

                        searchQuery.value = '';

                        emit( 'update:value', value );

                    }
                ;

                watch(
                    configurationApi,
                    debounce(
                        async( newConfigurationApi: ApiFetchOptionsWithIdType ) => {

                            await loadDataLots( newConfigurationApi );

                        },
                        500
                    )
                );

                return {

                    // Data
                    fieldNames,
                    isLoading,
                    items,

                    // Events
                    onClick,
                    onSearch,
                    onUpdateSelect,

                    options,
                    searchQuery,
                    selectValue,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectLots.scss"
></style>
