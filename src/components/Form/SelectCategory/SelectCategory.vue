<template>
    <a-select
        class="select-category"
        :field-names="fieldNames"
        :loading="isLoading"
        :option-filter-prop="fieldLabel"
        :option-label-prop="fieldLabel"
        :options="categories"
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
                Apri in un'altra scheda
            </nuxt-link>

        </template>
    </a-select>
</template>

<script lang="ts">

    // AntDesign - Components
    import { Select } from 'ant-design-vue';

    import type { SizeType } from 'ant-design-vue/lib/config-provider';
    import type { SelectValue } from 'ant-design-vue/lib/select';

    // Types
    import type { CategoryItemType } from '~/types';
    import { CategoryTypologyEnum } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import { computed, defineComponent, toRefs } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useCategoriesStore } from '~/store';

    // Component
    export default defineComponent(
        {
            name: 'select-category',
            components: {
                // Components
                'a-select': Select,
            },
            inheritAttrs: false,
            props: {
                baseUrl: {
                    type: String,
                    default: '/categorie',
                },
                fieldLabel: {
                    type: String as PropType<keyof CategoryItemType>,
                    default: 'nome',
                },
                fieldValue: {
                    type: String as PropType<keyof CategoryItemType>,
                    default: 'id',
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona categoria',
                },
                showPreviewLink: {
                    type: Boolean,
                    default: false,
                },
                size: {
                    type: String as PropType<SizeType>,
                    default: undefined,
                },
                tipologia: {
                    type: String as PropType<CategoryTypologyEnum>,
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
                        tipologia,
                        loading,
                        fieldValue,
                        fieldLabel,
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
                    , categoriesStore = useCategoriesStore()
                    , { getCategoriesLookupItems } = categoriesStore
                    , {
                        items,
                        isLoading: loadingCategories,
                        microCategories,
                        nanoCategories,
                        assetCategories,
                    } = storeToRefs( categoriesStore )
                    , categories = computed<CategoryItemType[]>(
                        () => {

                            if( tipologia.value === CategoryTypologyEnum.NANO )
                                return nanoCategories.value;

                            if( tipologia.value === CategoryTypologyEnum.MICRO )
                                return microCategories.value;

                            if( tipologia.value === CategoryTypologyEnum.ASSET )
                                return assetCategories.value;

                            return items.value;

                        }
                    )
                    , isLoading = computed<boolean>( () => loading.value || loadingCategories.value )
                    // Events
                    , onClick = async() => {

                        if( isLoading.value || items.value.length )
                            return;

                        await getCategoriesLookupItems();

                    }
                    , onUpdateSelect = ( value: SelectValue ) => {

                        emit( 'update:value', value );

                        return value;

                    }
                ;

                return {

                    // Data
                    categories,
                    fieldNames,
                    isLoading,

                    // Events
                    onClick,
                    onUpdateSelect,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectCategory.scss"
></style>
