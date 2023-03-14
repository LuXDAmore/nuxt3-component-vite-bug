<template>
    <a-select
        class="select-tribunals"
        :field-names="fieldNames"
        filter-option
        :loading="isLoading"
        :option-filter-prop="fieldLabel"
        :option-label-prop="fieldLabel"
        :options="options"
        :placeholder="placeholder"
        show-search
        :size="size"
        :value="value"
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
    import { DefaultOptionType } from 'ant-design-vue/es/select';
    import type { SizeType } from 'ant-design-vue/lib/config-provider';
    import type { SelectValue } from 'ant-design-vue/lib/select';

    // Types
    import type { TribunalsItemType } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import { computed, defineComponent, toRefs } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useTribunalsStore } from '~/store';

    // Component
    export default defineComponent(
        {
            name: 'select-tribunals',
            components: {
                // Components
                'a-select': Select,
                'select-outlined': SelectOutlined,
            },
            inheritAttrs: false,
            props: {
                baseUrl: {
                    type: String,
                    default: '/tribunali',
                },
                defaultOptions: {
                    type: [ Array, Object ] as PropType<DefaultOptionType[]>,
                    default: () => ( [] ),
                },
                fieldLabel: {
                    type: String as PropType<keyof TribunalsItemType>,
                    default: 'nomeTribunale',
                },
                fieldValue: {
                    type: String as PropType<keyof TribunalsItemType>,
                    default: 'idTribunale',
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona un tribunale',
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
                    type: String as PropType<SelectValue>,
                    default: undefined,
                },
            },
            emits: [ 'update:value' ],
            setup( props, { emit } ) {

                // Define Vars
                const
                    // Props
                    {
                        loading, fieldValue, fieldLabel, defaultOptions,
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
                    , tribunalsStore = useTribunalsStore()
                    , { getTribunalsItems } = tribunalsStore
                    , { items, isLoading: loadingTribunals } = storeToRefs( tribunalsStore )
                    , isLoading = computed<boolean>( () => loading.value || loadingTribunals.value )
                    , options = computed( () => {

                        return items.value.length ? items.value : defaultOptions.value;

                    } )
                    // Events
                    , onClick = async() => {

                        if( isLoading.value || items.value.length )
                            return;

                        await getTribunalsItems();

                    }
                    , onUpdateSelect = ( value: SelectValue ) => {

                        emit( 'update:value', value );

                        return value;

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

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectTribunals.scss"
></style>
