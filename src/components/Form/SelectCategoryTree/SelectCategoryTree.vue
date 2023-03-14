<template>
    <a-cascader
        :allow-clear="allowClear"
        class="select-category-tree"
        expand-trigger="hover"
        :field-names="fieldNames"
        filter-option
        :loading="isLoading"
        :options="items"
        :placeholder="placeholder"
        show-search
        :size="size"
        :value="valueToArray"
        @change="onUpdateSelect"
        @click="onClick"
    />
</template>

<script lang="ts">

    // AntDesign - Components
    import { Cascader } from 'ant-design-vue';

    // Ant Types
    import type { SizeType } from 'ant-design-vue/lib/config-provider';
    import type { SelectValue } from 'ant-design-vue/lib/select';
    import type { ValueType } from 'ant-design-vue/lib/vc-cascader/Cascader';

    import type { CategoryTreeItemType } from '~/types';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import {
        computed,
        defineComponent,
        ref,
        toRefs,
        watch,
    } from '#imports';

    // Store
    import { storeToRefs } from 'pinia';

    // UseStore
    import { useCategoriesTreeStore } from '~/store';

    // Component
    export default defineComponent(
        {
            name: 'select-category-tree',
            components: {
                // Components
                'a-cascader': Cascader,
            },
            inheritAttrs: false,
            props: {
                allowClear: {
                    type: Boolean,
                    default: false,
                },
                autoLoadItems: {
                    type: Boolean,
                    default: false,
                },
                baseUrl: {
                    type: String,
                    default: '/lookupCategorie',
                },
                fieldChildren: {
                    type: String as PropType<keyof CategoryTreeItemType>,
                    default: 'children',
                },
                fieldLabel: {
                    type: String as PropType<keyof CategoryTreeItemType>,
                    default: 'nomeCategoria',
                },
                fieldValue: {
                    type: String as PropType<keyof CategoryTreeItemType>,
                    default: 'idCategoria',
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona una categoria',
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
            async setup( props, { emit } ) {

                // Define Vars
                const
                    // Props
                    {
                        loading,
                        fieldValue,
                        fieldLabel,
                        fieldChildren,
                        value,
                    } = toRefs( props )
                    , fieldNames = computed(
                        () => (
                            {
                                children: fieldChildren.value,
                                label: fieldLabel.value,
                                value: fieldValue.value,
                            }
                        )
                    )
                    // Store
                    // Categories
                    , categoriesTreeStore = useCategoriesTreeStore()
                    , { getCategoriesTreeItems } = categoriesTreeStore
                    , { items, isLoading: loadingCategoriesTree } = storeToRefs( categoriesTreeStore )
                    , isLoading = computed<boolean>( () => loading.value || loadingCategoriesTree.value )
                    , valueToArray = ref<ValueType>( [] )
                    // Events
                    , onClick = async() => {

                        if( isLoading.value || items.value.length )
                            return;

                        await getCategoriesTreeItems();

                    }
                    , onUpdateSelect = ( value: ValueType ) => {

                        emit( 'update:value', Array.isArray( value ) ? value.at( - 1 ) : undefined );

                    }

                    , findParentIds = computed<ValueType>(
                        () => {

                            const parentIds: ValueType = [];

                            if( ! items.value.length )
                                return parentIds;

                            for( const macro of items.value ) {

                                for( const micro of macro.children ) {

                                    for( const nano of micro.children ) {

                                        if( nano.idCategoria === value.value ) {

                                            parentIds.push(
                                                macro.idCategoria,
                                                micro.idCategoria,
                                                nano.idCategoria
                                            );

                                            return parentIds;

                                        }

                                    }

                                }

                            }

                            return parentIds;

                        }
                    )

                    , transformToAnt = async() => {

                        if( ! value.value )
                            valueToArray.value = [];

                        if( ! items.value.length && props.autoLoadItems )
                            await getCategoriesTreeItems();

                        valueToArray.value = findParentIds.value;

                    }
                ;

                watch( value, transformToAnt );

                await transformToAnt();

                return {

                    // Data
                    fieldNames,
                    isLoading,
                    items,

                    // Events
                    onClick,
                    onUpdateSelect,

                    valueToArray,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectCategoryTree.scss"
></style>
