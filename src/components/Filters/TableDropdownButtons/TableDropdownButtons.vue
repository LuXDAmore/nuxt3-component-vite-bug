<template>
    <div class="table-dropdown-buttons ant-table-filter-dropdown-btns">

        <a-button
            :disabled="loading"
            size="small"
            type="link"
            @click="() => onResetClick()"
        >
            Reset
        </a-button>

        <a-button
            :disabled="loading"
            :loading="loading"
            size="small"
            type="primary"
            @click="() => onConfirmClick()"
        >

            <template #icon>
                <search-outlined />
            </template>

            Cerca

        </a-button>

    </div>
</template>

<script lang="ts">

    // AntDesign - Components
    import { SearchOutlined } from '@ant-design/icons-vue';

    // Built-in
    import { defineComponent } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'table-dropdown-buttons',
            components: {
                // Icons
                'search-outlined': SearchOutlined,
            },
            inheritAttrs: false,
            props: {
                handleFilterConfirm: {
                    type: Function,
                    default: null,
                },
                handleFilterReset: {
                    type: Function,
                    default: null,
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                value: {
                    type: [
                        String,
                        Number,
                        Array,
                    ],
                    default: null,
                },
            },
            emits: [
                'click',
                'click:reset',
                'click:confirm',
                'update:value',
            ],
            setup( _, { emit } ) {

                const
                    onConfirmClick = () => {

                        emit( 'click:confirm' );

                        emit( 'click' );

                    }
                    , onResetClick = () => {

                        emit( 'update:value', undefined );
                        emit( 'click:reset' );

                        emit( 'click' );

                    }
                ;

                return {

                    onConfirmClick,
                    onResetClick,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./TableDropdownButtons.scss"
></style>
