<template>
    <a-select
        class="select-tag-lots"
        :field-names="fieldNames"
        filter-option
        :loading="isLoading"
        mode="multiple"
        :option-filter-prop="fieldLabel"
        :option-label-prop="fieldLabel"
        :options="options"
        :placeholder="placeholder"
        show-search
        :size="size"
        :value="selectValues"
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
    import type { LotsTagType } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import { computed, defineComponent, toRefs } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useTagLotsStore } from '~/store';

    // Component
    export default defineComponent(
        {
            name: 'select-tag-lots',
            components: {
                // Components
                'a-select': Select,
                'select-outlined': SelectOutlined,
            },
            inheritAttrs: false,
            props: {
                baseUrl: {
                    type: String,
                    default: '/tags',
                },
                defaultOptions: {
                    type: [ Array, Object ] as PropType<LotsTagType[]>,
                    default: () => ( [] ),
                },
                fieldLabel: {
                    type: String as PropType<keyof LotsTagType>,
                    default: 'nomeTag',
                },
                fieldValue: {
                    type: String as PropType<keyof LotsTagType>,
                    default: 'idTag',
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona i tag',
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
                    type: Array as PropType<LotsTagType['idTag'][]>,
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
                        fieldValue,
                        fieldLabel,
                        loading,
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
                    , tagLotsStore = useTagLotsStore()
                    , { getTagLotsItems } = tagLotsStore
                    , { items, isLoading: loadingTagLots } = storeToRefs( tagLotsStore )
                    , isLoading = computed<boolean>( () => loading.value || loadingTagLots.value )
                    // Events
                    , onClick = async() => {

                        if( isLoading.value || items.value.length )
                            return;

                        await getTagLotsItems();

                    }
                    , onUpdateSelect = ( value: SelectValue ) => {

                        emit( 'update:value', value );

                    }
                    , options = computed<LotsTagType[]>( () => {

                        return items.value.length ? items.value : defaultOptions.value;

                    } )
                    , selectValues = computed<LotsTagType['idTag'][]>( () => {

                        const objectToString: LotsTagType['idTag'][] = ( value.value || [] ).map( ( value: LotsTagType['idTag'] ) => {

                            if( typeof value === 'string' )
                                return value;

                            return value[ fieldValue.value ] as LotsTagType['idTag'];

                        } );

                        return objectToString;

                    } )
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
                    selectValues,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectTagLots.scss"
></style>
