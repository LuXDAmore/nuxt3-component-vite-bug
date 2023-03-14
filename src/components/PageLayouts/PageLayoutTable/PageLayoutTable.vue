<template>
    <section class="page page-layout-table">

        <!-- Title -->
        <a-page-header
            v-if="!compact"
            class="header"
        >
            <template #title>
                <a-typography-title :level="1" strong>

                    <!-- @slot Title -->
                    <slot name="title" />

                </a-typography-title>
            </template>
            <template #extra>

                <a-button
                    :disabled="isModalCreateOpened"
                    :loading="isModalCreateLoading"
                    type="primary"
                    @click="onOpenCreateModal"
                >

                    <template #icon>
                        <plus-outlined />
                    </template>

                    {{ createModalTextButton }}

                </a-button>

            </template>
        </a-page-header>

        <!-- Table -->
        <div class="table-operations-row">
            <div class="table-operations-left">

                <slot name="table-operations-left" />

            </div>
            <div class="table-operations-right">

                <slot name="table-operations-right-start" />

                <a-button
                    v-if="isBulkModalEnabled"
                    :disabled="isBulkModalOpened"
                    :loading="isBulkModalLoading || isTableLoading"
                    size="small"
                    type="link"
                    @click="onOpenBulkModal"
                >
                    <template #icon>
                        <folder-open-outlined />
                    </template>

                    {{ bulkModalTextButton }}

                </a-button>

                <template v-if="$slots['advanced-filters']">
                    <slot name="advanced-filters" />
                    <a-button
                        :disabled="isAdvancedFiltersModalOpened || isAdvancedFiltersModalLoading || isTableLoading"
                        size="small"
                        type="link"
                        @click="onOpenFiltersModal"
                    >
                        <template #icon>
                            <search-outlined />
                        </template>
                        {{ advancedFiltersModalLabelAndTitle }}
                    </a-button>
                </template>

                <slot v-if="$slots['reset-filters']" name="reset-filters">
                    <a-button
                        :disabled="isAdvancedFiltersModalOpened || isAdvancedFiltersModalLoading || isTableLoading"
                        size="small"
                        type="link"
                        @click="$emit( 'click:table-handle-reset' )"
                    >
                        <template #icon>
                            <delete-outlined />
                        </template>
                        Reset filtri
                    </a-button>
                </slot>

                <a-button
                    v-if="compact"
                    :disabled="isModalCreateOpened"
                    :loading="isModalCreateLoading"
                    size="small"
                    type="link"
                    @click="onOpenCreateModal"
                >

                    <template #icon>
                        <plus-outlined />
                    </template>

                    {{ createModalTextButton }}

                </a-button>

                <slot name="table-operations-right-end" />

            </div>
        </div>

        <!-- @slot Table -->
        <slot name="table" />

        <!-- @slot Default -->
        <slot />

        <!-- Create Modal -->
        <a-modal
            v-model:visible="isModalCreateOpened"
            :cancel-text="createModalCancelButtonText"
            centered
            closable
            :confirm-loading="isModalCreateLoading"
            :keyboard="false"
            :mask-closable="false"
            :ok-button-props="{
                disabled: !isCreateModalFormDataModified,
                // @ts-expect-error: This error is reported from AntDesignSystem, not expecting buttons has a form property.
                form: createModalFormName,
                htmlType: createModalFormButtonType,
            }"
            :ok-text="createModalConfirmButtonText"
            :title="createModalTitle"
            @cancel="() => {

                $emit( 'update:is-create-modal-opened-props', false );
                $emit( 'click:create-modal-button-cancel' );

            }"
            @ok="$emit( 'click:create-modal-button-confirm' )"
        >
            <!-- @slot Form inside modal -->
            <slot
                :create-modal-form-name="createModalFormName"
                :is-modal-loading="isModalCreateLoading"
                :is-modal-opened="isModalCreateOpened"
                name="create-modal-form"
                :on-handle-create-form-submit="onHandleCreateFormSubmit"
            />
        </a-modal>

        <!-- Advanced Filters Modal -->
        <a-modal
            v-model:visible="isAdvancedFiltersModalOpened"
            :cancel-text="advancedFiltersModalCancelButtonText"
            centered
            closable
            :confirm-loading="isAdvancedFiltersModalLoading"
            :keyboard="false"
            :mask-closable="false"
            :ok-button-props="{
                // @ts-expect-error: This error is reported from AntDesignSystem, not expecting buttons has a form property.
                form: advancedFiltersModalFormName,
                htmlType: advancedFiltersModalFormButtonType,
            }"
            :ok-text="advancedFiltersModalConfirmButtonText"
            :title="advancedFiltersModalLabelAndTitle"
            width="1000px"
            @cancel="$emit( 'click:advanced-filters-modal-button-cancel' )"
            @ok="$emit( 'click:advanced-filters-modal-button-confirm' )"
        >
            <!-- @slot Form inside modal -->
            <slot
                :advanced-filters-modal-form-name="advancedFiltersModalFormName"
                :is-advanced-filters-modal-loading="isAdvancedFiltersModalLoading"
                :is-advanced-filters-modal-opened="isAdvancedFiltersModalOpened"
                name="advanced-filters-modal-form"
                :on-close-filters-modal="onCloseFiltersModal"
                :on-handle-advanced-filters-form-submit="onHandleAdvancedFiltersFormSubmit"
            />
        </a-modal>

        <!-- Bulk Table Selection Modal -->
        <a-modal
            v-model:visible="isBulkModalOpened"
            :cancel-text="bulkModalCancelButtonText"
            centered
            closable
            :confirm-loading="isBulkModalLoading"
            :keyboard="false"
            :mask-closable="false"
            :ok-button-props="{
                // @ts-expect-error: This error is reported from AntDesignSystem, not expecting buttons has a form property.
                form: bulkModalFormName,
                htmlType: bulkModalFormButtonType,
            }"
            :ok-text="bulkModalConfirmButtonText"
            :title="bulkModalTitle"
            @cancel="$emit( 'click:bulk-modal-button-cancel' )"
            @ok="$emit( 'click:bulk-modal-button-confirm' )"
        >
            <!-- @slot Form inside modal -->
            <slot
                :bulk-modal-form-name="bulkModalFormName"
                :is-modal-loading="isBulkModalLoading"
                :is-modal-opened="isBulkModalOpened"
                name="bulk-modal-form"
                :on-handle-bulk-form-submit="onHandleBulkFormSubmit"
            />
        </a-modal>

    </section>
</template>

<script lang="ts">

    // AntDesign - Icons
    import { DeleteOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons-vue';

    // AntDesign - Components
    import {
        Modal,
        PageHeader,
        TypographyTitle,
    } from 'ant-design-vue';

    // Types
    import type { ButtonHTMLType } from 'ant-design-vue/es/button/buttonTypes';

    import type { callbackEventType } from '~/types';

    // Built-in
    import type { PropType } from 'vue';

    import {
        defineComponent,
        ref,
        toRefs,
        useAntModal,
        watch,
    } from '#imports';

    // Component
    export default defineComponent(
        {
            name: 'page-layout-table',
            components: {
                // Components
                'a-modal': Modal,
                'a-page-header': PageHeader,
                'a-typography-title': TypographyTitle,
                // Icons
                'delete-outlined': DeleteOutlined,
                'folder-open-outlined': FolderOpenOutlined,
                'plus-outlined': PlusOutlined,
            },
            inheritAttrs: false,
            props: {
                advancedFiltersModalCancelButtonText: {
                    type: String,
                    default: 'Annulla',
                },
                advancedFiltersModalConfirmButtonText: {
                    type: String,
                    default: 'Filtra',
                },
                advancedFiltersModalFormButtonType: {
                    type: String as PropType<ButtonHTMLType>,
                    default: 'submit',
                },
                advancedFiltersModalFormName: {
                    type: String,
                    default: 'filters-form',
                },
                advancedFiltersModalLabelAndTitle: {
                    type: String,
                    default: 'Ricerca avanzata',
                },
                bulkModalCancelButtonText: {
                    type: String,
                    default: 'Annulla',
                },
                bulkModalConfirmButtonText: {
                    type: String,
                    default: 'Modifica',
                },
                bulkModalFormButtonType: {
                    type: String as PropType<ButtonHTMLType>,
                    default: 'submit',
                },
                bulkModalFormName: {
                    type: String,
                    default: 'bulk-form',
                    validator( value ) {

                        return !! value;

                    },
                },
                bulkModalTextButton: {
                    type: String,
                    default: 'Modifica',
                },
                bulkModalTitle: {
                    type: String,
                    default: 'Modifica',
                },
                compact: {
                    type: Boolean,
                    default: false,
                },
                createModalCancelButtonText: {
                    type: String,
                    default: 'Annulla',
                },
                createModalConfirmButtonText: {
                    type: String,
                    default: 'Crea',
                },
                createModalFormButtonType: {
                    type: String as PropType<ButtonHTMLType>,
                    default: 'submit',
                },
                createModalFormName: {
                    type: String,
                    default: 'create-form',
                    validator( value ) {

                        return !! value;

                    },
                },
                createModalTextButton: {
                    type: String,
                    default: 'Crea',
                },
                createModalTitle: {
                    type: String,
                    default: 'Crea',
                },
                isBulkModalEnabled: {
                    type: Boolean,
                    default: false,
                },
                isCreateModalFormDataModified: {
                    type: Boolean,
                    default: false,
                },
                isCreateModalOpenedProps: {
                    type: Boolean,
                    default: false,
                },
                isTableLoading: {
                    type: Boolean,
                    default: false,
                },
            },
            emits: [
                'click:create-modal-button-cancel',
                'click:create-modal-button-confirm',
                'modal:create-action-modal-open',
                'modal:create-action-modal-closed',
                'modal:create-action-modal-toggle-loading',
                'click:advanced-filters-modal-button-cancel',
                'click:advanced-filters-modal-button-confirm',
                'modal:filters-action-modal-open',
                'modal:filters-action-modal-closed',
                'modal:filters-action-modal-toggle-loading',
                'click:table-handle-reset',
                'click:bulk-modal-button-cancel',
                'click:bulk-modal-button-confirm',
                'modal:bulk-action-modal-open',
                'modal:bulk-action-modal-closed',
                'modal:bulk-action-modal-toggle-loading',
                'update:is-create-modal-opened-props',
            ],
            setup( props, { emit } ) {

                // Setup
                const
                    // Props
                    { isCreateModalOpenedProps } = toRefs( props )
                    // State
                    , isBulkModalOpened = ref<boolean>( false )
                    , isBulkModalLoading = ref<boolean>( false )
                    , isModalCreateOpened = ref<boolean>( isCreateModalOpenedProps.value )
                    , isModalCreateLoading = ref<boolean>( false )
                    , isAdvancedFiltersModalOpened = ref<boolean>( false )
                    , isAdvancedFiltersModalLoading = ref<boolean>( false )
                    // Composable
                    , { onModalSubmit } = useAntModal()
                    // Events create modal
                    , toggleCreateModalLoading = (): void => {

                        isModalCreateLoading.value = ! isModalCreateLoading.value;

                        emit( 'modal:create-action-modal-open', isModalCreateLoading.value );

                    }
                    , onOpenCreateModal = (): void => {

                        emit( 'modal:create-action-modal-open' );

                        isModalCreateOpened.value = true;

                        emit( 'update:is-create-modal-opened-props', isModalCreateOpened.value );

                    }
                    , onCloseCreateModal = (): void => {

                        isModalCreateOpened.value = false;

                        emit( 'update:is-create-modal-opened-props', isModalCreateOpened.value );

                        emit( 'modal:create-action-modal-closed' );

                    }
                    , onHandleCreateFormSubmit = async( callback?: callbackEventType ): Promise<void> => {

                        await onModalSubmit( onCloseCreateModal, toggleCreateModalLoading, callback );

                    }
                    // Events filter modal
                    , toggleFiltersModalLoading = (): void => {

                        isAdvancedFiltersModalLoading.value = ! isAdvancedFiltersModalLoading.value;

                        emit( 'modal:filters-action-modal-open', isAdvancedFiltersModalLoading.value );

                    }
                    , onOpenFiltersModal = (): void => {

                        emit( 'modal:filters-action-modal-open' );

                        isAdvancedFiltersModalOpened.value = true;

                    }
                    , onCloseFiltersModal = (): void => {

                        isAdvancedFiltersModalOpened.value = false;

                        emit( 'modal:filters-action-modal-closed' );

                    }
                    , onHandleAdvancedFiltersFormSubmit = async( callback?: callbackEventType ): Promise<void> => {

                        await onModalSubmit( onCloseFiltersModal, toggleFiltersModalLoading, callback );

                    }
                    // Events bulk modal
                    , toggleBulkModalLoading = (): void => {

                        isBulkModalLoading.value = ! isBulkModalLoading.value;

                        emit( 'modal:bulk-action-modal-open', isBulkModalLoading.value );

                    }
                    , onOpenBulkModal = (): void => {

                        emit( 'modal:bulk-action-modal-open' );

                        isBulkModalOpened.value = true;

                    }
                    , onCloseBulkModal = (): void => {

                        isBulkModalOpened.value = false;

                        emit( 'modal:bulk-action-modal-closed' );

                    }
                    , onHandleBulkFormSubmit = async( callback?: callbackEventType ): Promise<void> => {

                        await onModalSubmit( onCloseBulkModal, toggleBulkModalLoading, callback );

                    }
                ;

                watch( isCreateModalOpenedProps, newCreateModalOpenedValue => {

                    isModalCreateOpened.value = newCreateModalOpenedValue;

                } );

                return {

                    // State
                    isAdvancedFiltersModalLoading,
                    isAdvancedFiltersModalOpened,
                    isBulkModalLoading,
                    isBulkModalOpened,
                    isModalCreateLoading,
                    isModalCreateOpened,

                    // Events
                    onCloseCreateModal,
                    onCloseFiltersModal,
                    onHandleAdvancedFiltersFormSubmit,
                    onHandleBulkFormSubmit,
                    onHandleCreateFormSubmit,
                    onOpenBulkModal,
                    onOpenCreateModal,
                    onOpenFiltersModal,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./PageLayoutTable.scss"
></style>
