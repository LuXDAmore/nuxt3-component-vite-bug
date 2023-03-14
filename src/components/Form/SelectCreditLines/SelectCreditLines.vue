<template>
    <a-select
        class="select-credit-lines"
        :field-names="fieldNames"
        filter-option
        :loading="isLoading"
        :mode="mode"
        :option-filter-prop="fieldValue"
        :option-label-prop="fieldLabel"
        :options="options"
        :placeholder="placeholder"
        show-search
        :size="size"
        :value="selectValue"
        @change="onUpdateSelect"
        @click="onClick"
    >
        <template #option="option">

            <span v-text="option[ fieldLabel ]" />

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

    // Types
    import type { CreditLinesItemType } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import {
        computed,
        defineComponent,
        toRefs,
    } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useCreditLinesStore } from '~/store';

    // Component
    export default defineComponent(
        {
            name: 'select-credit-lines',
            components: {
                // Components
                'a-select': Select,
                'select-outlined': SelectOutlined,
            },
            inheritAttrs: false,
            props: {
                baseUrl: {
                    type: String,
                    default: '/affidamenti',
                },
                defaultOptions: {
                    type: [ Array, Object ] as PropType<CreditLinesItemType[]>,
                    default: () => ( [] ),
                },
                fieldLabel: {
                    type: String as PropType<keyof CreditLinesItemType>,
                    default: 'codiceAffidamento',
                },
                fieldValue: {
                    type: String as PropType<keyof CreditLinesItemType>,
                    default: 'idAffidamento',
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
                    default: 'Seleziona un affidamento',
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
                    type: [ String, Array ] as PropType<CreditLinesItemType['idAffidamento'] | CreditLinesItemType['idAffidamento'][]>,
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
                        loading,
                        fieldLabel,
                        fieldValue,
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
                    // Store
                    // Categories
                    , creditLinesStore = useCreditLinesStore()
                    , { getCreditLinesLookupItems } = creditLinesStore
                    , { items, isLoading: loadingCreditLines } = storeToRefs( creditLinesStore )
                    , isLoading = computed<boolean>( () => loading.value || loadingCreditLines.value )
                    , options = computed<CreditLinesItemType[]>(
                        () => {

                            const options: CreditLinesItemType[] = items.value.length ? items.value : defaultOptions.value

                                  , cleanOptions = ( options || [] ).filter( option => option[ fieldValue.value ] !== omitOptions.value )
                            ;

                            return cleanOptions;

                        }
                    )
                    , selectValue = computed<CreditLinesItemType['idAffidamento'] | CreditLinesItemType['idAffidamento'][]>(
                        () => {

                            if( mode.value === 'multiple' && Array.isArray( value.value ) ) {

                                const objectToString: CreditLinesItemType['idAffidamento'][] = ( value.value || [] ).map(
                                    ( value: CreditLinesItemType['idAffidamento'] ) => {

                                        if( typeof value === 'string' )
                                            return value;

                                        return value[ fieldValue.value ] as CreditLinesItemType['idAffidamento'];

                                    }
                                );

                                return ( objectToString || [] ).filter( ( element: string ) => element !== omitOptions.value ) as CreditLinesItemType['idAffidamento'][];

                            }

                            return value.value as CreditLinesItemType['idAffidamento'];

                        }
                    )
                    // Events
                    , onClick = async() => {

                        if( isLoading.value || items.value.length )
                            return;

                        await getCreditLinesLookupItems();

                    }
                    , onUpdateSelect = ( value: SelectValue ) => {

                        emit( 'update:value', value );

                    }
                ;

                return {

                    // Data
                    fieldNames,
                    isLoading,
                    items,

                    // Events
                    onClick,
                    onUpdateSelect,

                    options,
                    selectValue,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectCreditLines.scss"
></style>
