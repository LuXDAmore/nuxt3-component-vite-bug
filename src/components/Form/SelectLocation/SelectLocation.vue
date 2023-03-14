<template>
    <div class="select-location">

        <div class="select">
            <a-select
                v-model:value="modelWithGetter"
                :allow-clear="!! ( modelWithGetter && ! isLoading )"
                :default-active-first-option="false"
                :disabled="disabled"
                :field-names="fieldNames"
                :filter-option="false"
                :loading="isLoading"
                :mode="mode"
                :not-found-content="isLoading ? undefined : null"
                :option-label-prop="fieldLabel"
                :options="optionsToShow"
                :placeholder="placeholder"
                :search="searchQuery"
                :show-arrow="hideSearch"
                :show-search="! hideSearch"
                :size="size"
                @clear="onClear"
                @click="onClick"
                @search="onSearch"
            >
                <template v-if="isLoading" #notFoundContent>
                    <a-spin size="small" /> &nbsp; Sto cercando ...
                </template>
            </a-select>
        </div>

        <div v-if="debug" class="debug">
            <strong>Value</strong>: {{ value }}<br>
            <strong>Model</strong>: {{ model }}<br>
            <strong>modelWithGetter</strong>: {{ modelWithGetter }}
            <hr>
            <strong>Search Value</strong>: {{ searchValue }}<br>
            <strong>Search Query</strong>: {{ searchQuery }}
            <hr>
            <strong>fieldNames</strong>: {{ fieldNames }}<br>
            <strong>showSelectedValueInOptions</strong>: {{ showSelectedValueInOptions }}<br>
            <strong>isLoading</strong>: {{ isLoading }}
            <hr>
            <strong>optionsLength</strong>: {{ options.length }}<br>
            <strong>optionsToShowLength</strong>:{{ optionsToShow.length }}
        </div>

    </div>
</template>

<script lang="ts">

    // AntDesign - Components
    import { Select, Spin, message } from 'ant-design-vue';

    // Ant Types
    import type { SizeType } from 'ant-design-vue/lib/config-provider';

    // Third party
    import debounce from 'lodash/debounce';

    // Types
    import type {
        ExceptionType,
        GenericEmptyPromiseArrowFunctionType,
        LocationItemOptionIdType,
        LocationItemOptionKeyLabelType,
        LocationItemOptionLabelType,
        LocationItemOptionType,
        LocationItemType,
        LocationParametersApiType,
    } from '~/types';
    import { LocationTypeEnum } from '~/types';

    import type { PropType } from 'vue';

    // Built-in
    import {
        computed,
        defineComponent,
        ref,
        toRefs,
        useLocationAutocompleteApi,
        watch,
    } from '#imports';

    // Types
    type modelValue = LocationItemOptionType[ `${ LocationItemOptionIdType }` ];

    // Component
    export default defineComponent(
        {
            name: 'select-location',
            components: {
                // Components
                'a-select': Select,
                'a-spin': Spin,
            },
            inheritAttrs: false,
            props: {
                debug: {
                    type: Boolean,
                    default: false,
                },
                delay: {
                    type: [ Number, String ],
                    default: 300,
                },
                disabled: {
                    type: Boolean,
                    default: false,
                },
                fieldLabel: {
                    type: String as PropType<LocationItemOptionLabelType>,
                    default: 'labelCadastralCode',
                },
                fieldValue: {
                    // TODO: Questi ID da decidere
                    type: String as PropType<LocationItemOptionIdType>,
                    default: 'cadastralCode',
                },
                hideSearch: {
                    type: Boolean,
                    default: false,
                },
                items: {
                    type: Array as PropType<LocationItemType[]>,
                    default: () => ( [] ),
                },
                loading: {
                    type: Boolean,
                    default: false,
                },
                mode: {
                    type: String as PropType<'multiple' | 'tags'>,
                    default: undefined,
                },
                perPage: {
                    type: [ Number, String ],
                    default: 5,
                },
                placeholder: {
                    type: String,
                    default: 'Seleziona una località',
                },
                searchValue: {
                    type: String,
                    default: undefined,
                },
                showSelectedValueInOptions: {
                    type: Boolean,
                    default: false,
                },
                size: {
                    type: String as PropType<SizeType>,
                    default: undefined,
                },
                type: {
                    type: String as PropType<LocationTypeEnum>,
                    default: LocationTypeEnum.CITY,
                },
                value: {
                    type: String as PropType<modelValue | modelValue[]>,
                    default: undefined,
                },
            },
            emits: [
                'update:value',
                'update:searchValue',
                'clear',
                'click',
            ],
            setup( props, { emit } ) {

                // Define Vars
                const
                    // Props
                    {
                        disabled,
                        delay,
                        loading,
                        fieldValue,
                        fieldLabel,
                        perPage,
                        searchValue,
                        items,
                        showSelectedValueInOptions,
                        type,
                        value,
                    } = toRefs( props )
                    // Value && Model
                    , valueToArray = computed<modelValue[]>(
                        () => {

                            if( ! value.value )
                                return [];

                            return Array.isArray( value.value ) ? value.value || [] : [ value.value ];

                        }
                    )
                    , model = ref<modelValue | modelValue[] | undefined>( Array.isArray( value.value ) ? [ ... valueToArray.value ] : value.value )
                    , modelWithGetter = computed<modelValue | modelValue[] | undefined>(
                        {
                            get() {

                                if( ! model.value )
                                    return undefined;

                                if( ! Object.keys( optionsToKeyLabel.value ).length )
                                    return Array.isArray( model.value ) ? model.value : [ model.value ];

                                return Array.isArray( model.value ) ? ( model.value ).map( item => optionsToKeyLabel.value[ item ] ) : [ optionsToKeyLabel.value[ model.value ] ];

                            },
                            set( v: modelValue | modelValue[] | undefined ) {

                                model.value = Array.isArray( v ) ? v : v ? [ v ] : v;

                                emit( 'update:value', model.value );

                            },
                        }
                    )
                    // Search
                    , searchQuery = ref<string>( searchValue.value || '' )
                    , searchParameters = computed<LocationParametersApiType>(
                        () => (
                            {
                                needle: searchQuery.value,
                                per_page: Number.parseInt(
                                    ( perPage.value || 5 ).toString(),
                                    10
                                ),
                                type: type.value,
                            }
                        )
                    )
                    // Options
                    , fieldNames = computed(
                        () => (
                            {
                                label: fieldLabel.value,
                                value: fieldValue.value,
                            }
                        )
                    )
                    , options = ref<LocationItemType[]>( [ ... items.value || [] ] )
                    , optionsToValues = computed<LocationItemOptionType[]>(
                        () => {

                            if( ! options.value.length )
                                return [];

                            return options.value.map(
                                item => (
                                    {
                                        cadastralCode: item.city.cadastralCode,
                                        id: item.city.id,
                                        initialValue: { ... item },
                                        labelCadastralCode: `Cad: ${ item.city.name } - ${ item.province.id }`,
                                        labelId: `ID: ${ item.city.name } - ${ item.province.id }`,
                                    }
                                )
                            );

                        }
                    )
                    , optionsToShow = computed<LocationItemOptionType[]>(
                        () => {

                            if( ! optionsToValues.value.length || isLoading.value )
                                return [];

                            if( showSelectedValueInOptions.value )
                                return optionsToValues.value;

                            // Filtro sull'elemento già selezionato
                            return optionsToValues.value.filter( item => ! ( valueToArray.value.includes( item[ fieldValue.value ] ) ) );

                        }
                    )
                    , optionsToKeyLabel = computed<LocationItemOptionKeyLabelType>(
                        () => {

                            if( ! optionsToValues.value.length )
                                return {};

                            return optionsToValues.value.reduce(
                                (
                                    accumulator,
                                    item,
                                ) => {

                                    accumulator[ item.id ] = item.labelId;
                                    accumulator[ item.cadastralCode ] = item.labelCadastralCode;

                                    accumulator[ item[ fieldValue.value ] ] = item[ fieldLabel.value ];

                                    return accumulator;

                                },
                                {} as LocationItemOptionKeyLabelType
                            );

                        }
                    )
                    , onOptionsUpdate = ( $event: LocationItemType[] ): void => {

                        options.value = [ ... $event || [] ];

                    }
                    // Utils
                    , isSearchLoading = ref<boolean>( false )
                    , isLoading = computed<boolean>( () => loading.value || isSearchLoading.value )
                    // Events
                    // Search
                    , onSearchDebounce = debounce<GenericEmptyPromiseArrowFunctionType>(
                        async() => {

                            if( disabled.value || searchQuery.value.length < 3 )
                                return;

                            try {

                                isSearchLoading.value = true;

                                onResetOptions();

                                const { data } = await useLocationAutocompleteApi( { params: searchParameters.value } );

                                if( ! data?.length )
                                    throw new Error();

                                onOptionsUpdate( data );

                            } catch( exception ) {

                                onResetOptions();

                                console.error( { exception } );

                                // TODO: La gestione dei messaggi di errore è da implementare
                                const errorMessage = ( exception as ExceptionType )?.data?.message ?? `Nessuna località trovata per "${ searchQuery.value }".`;

                                message.error( errorMessage );

                            } finally {

                                isSearchLoading.value = false;

                            }

                        },
                        Number.parseInt(
                            ( delay.value || 300 ).toString(),
                            10
                        ),
                    )
                    , onSearch = ( $event: string | undefined ): void => {

                        onChangeSearchQuery( $event );

                        onSearchDebounce();

                    }
                    , onChangeSearchQuery = ( $event: string | undefined ): void => {

                        searchQuery.value = $event || '';

                        emit( 'update:searchValue', searchQuery.value );

                    }
                    // Select
                    , onClick = (): void => {

                        if( searchValue.value )
                            onSearchDebounce();

                        emit( 'click' );

                    }
                    // Clear
                    , onResetOptions = (): void => {

                        const results = value.value
                            ? optionsToValues.value.filter( item => valueToArray.value.includes( item[ fieldValue.value ] ) ).map( item => item.initialValue )
                            : []
                        ;

                        onOptionsUpdate( results );

                    }
                    , onClear = (): void => {

                        modelWithGetter.value = undefined;

                        onChangeSearchQuery( undefined );
                        onResetOptions();

                        emit( 'clear' );

                    }
                ;

                // Watch
                watch( searchValue, newSearch => ( searchQuery.value = newSearch || '' ) );
                watch( value, newValue => ( modelWithGetter.value = newValue ) );
                watch( items, onOptionsUpdate );

                // TODO: Da valutare quando sarà un array di location anche (o forse no?)

                // Return
                return {

                    fieldNames,

                    isLoading,

                    model,
                    modelWithGetter,

                    onClear,
                    onClick,
                    onResetOptions,
                    onSearch,

                    options,
                    optionsToKeyLabel,
                    optionsToShow,
                    optionsToValues,

                    searchQuery,

                    valueToArray,

                };

            },
        }
    );

</script>

<style
    scoped
    lang="scss"
    src="./SelectLocation.scss"
></style>
