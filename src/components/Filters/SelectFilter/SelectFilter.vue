<template>
    <a-select
        class="select-filter"
        :disabled="disabled"
        :field-names="fieldNames"
        :mode="mode"
        :option-filter-prop="fieldLabel"
        :option-label-prop="fieldLabel"
        :options="optionsSelect"
        :placeholder="placeholder"
        show-search
        :size="size"
        :value="selectValue"
        @change="onUpdateSelect"
    />
</template>

<script lang="ts">

    // AntDesign - Components
    import { Select } from 'ant-design-vue';

    // Types
    import type { SizeType } from 'ant-design-vue/lib/config-provider';
    import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select';
    import type { FieldNames } from 'ant-design-vue/lib/vc-select/Select';

    // Vue Types
    import type { PropType } from 'vue';

    // Built-in
    import { computed, defineComponent, toRefs } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'select-filter',
            components: {
                // Components
                'a-select': Select,
            },
            inheritAttrs: false,
            props: {
                defaultOptionLabel: {
                    type: String,
                    default: 'Tutti',
                },
                disabled: {
                    type: Boolean,
                    default: false,
                },
                fieldLabel: {
                    type: String,
                    default: 'label',
                },
                fieldValue: {
                    type: String,
                    default: 'value',
                },
                mode: {
                    type: String as PropType<'multiple' | 'tags'>,
                    default: undefined,
                },
                noEmptyOption: {
                    type: Boolean,
                    default: false,
                },
                options: {
                    type: Array as PropType<DefaultOptionType[]>,
                    required: true,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona',
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
                        defaultOptionLabel,
                        fieldValue,
                        fieldLabel,
                        options,
                        noEmptyOption,
                        value,
                    } = toRefs( props )
                    , fieldNames = computed<FieldNames>(
                        () => (
                            {
                                label: fieldLabel.value,
                                value: fieldValue.value,
                            }
                        )
                    )
                    , defaultOption = computed(
                        () => ( {
                            [ fieldLabel.value ]: defaultOptionLabel.value,
                            [ fieldValue.value ]: '',
                        }
                        )
                    )
                    , optionsSelect = computed<DefaultOptionType[]>(
                        () => {

                            if( noEmptyOption.value || props.mode === 'multiple' )
                                return [ ... options.value ];

                            return [ defaultOption.value, ... options.value ];

                        }
                    )
                    , selectValue = computed(
                        () => {

                            if( noEmptyOption.value || props.mode === 'multiple' )
                                return value.value;

                            return value.value || '';

                        }
                    )
                    // Events
                    , onUpdateSelect = ( value: SelectValue ) => {

                        emit( 'update:value', value );

                        return value;

                    }
                ;

                return {

                    fieldNames,
                    onUpdateSelect,
                    optionsSelect,
                    selectValue,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectFilter.scss"
></style>
