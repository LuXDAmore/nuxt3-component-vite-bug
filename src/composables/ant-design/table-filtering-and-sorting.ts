// Third party
import { usePagination } from 'vue-request';

// Types
import type {
    AntSorterType,
    ApiFetchOptionsWithIdType,
    ApiResultsType,
    ApiServiceType,
    GenericEmptyArrowFunctionType,
    GenericEmptyPromiseArrowFunctionType,
    KeyOf,
    ParameterValueType,
    ParametersForFilteringRenamedType,
    ParametersForFilteringType,
    ParametersForPaginationType,
    ParametersForSortingType,
    ParametersType,
    SorterType,
    TableColumnsToTransformType,
    TableColumnsType,
    TablePaginationOnChangeEventType,
    TablePaginationType,
    TableSelectedRowsType,
} from '~/types';
import { SortOrderEnum } from '~/types';

import type { ComputedRef, Ref } from 'vue';

// Built-in
import {
    computed,
    nextTick,
    ref,
} from '#imports';

// Types
type OnFiltersSubmitArgumentsType = {
    clearFilters?: ( parameters?: unknown ) => void,
    htmlInputRef?: HTMLInputElement | null,
};
type AntTableFilteringAndSortingType<T> = {

    // Parameters
    activeFilteringParameters: ComputedRef<ParametersForFilteringType<T>>,
    activeSortingParameters: ComputedRef<ParametersForSortingType<T>>,
    advancedFilters: Ref<ParametersForFilteringType<T>>,

    handleCreateAdvancedFiltersBackup: GenericEmptyArrowFunctionType,
    handleRestoreAdvancedFiltersBackup: GenericEmptyArrowFunctionType,

    isLoading: ComputedRef<boolean>,
    loading: Ref<boolean>,

    onFiltersSubmit: ( antCustomFilterDropdownArguments?: OnFiltersSubmitArgumentsType ) => Promise<void>,

    refresh: () => Promise<ApiResultsType<T[]>>,

    renamedQueryParameters: ParametersForFilteringRenamedType<T>,

    resetAntPagination: GenericEmptyArrowFunctionType,
    resetAntSorter: GenericEmptyArrowFunctionType,
    resetAntTableFilters: GenericEmptyArrowFunctionType,

    tableColumns: ComputedRef<TableColumnsType<T>[]>,
    tableHandleReset: GenericEmptyPromiseArrowFunctionType,
    tableIsLoading: ComputedRef<boolean>,
    tableIsRowSelected: ComputedRef<boolean>,
    tableIsShowColumnHeader: ComputedRef<boolean>,
    tableOnChange: TablePaginationOnChangeEventType<T>,
    tableOnRowSelection: ( selectedRowKeys: TableSelectedRowsType ) => void,
    tablePagination: ComputedRef<TablePaginationType>,
    tableRows: ComputedRef<T[]>,
    tableSelectedRows: Ref<TableSelectedRowsType>,

};

// useAntTableFilteringAndSorting
const useAntTableFilteringAndSorting = <T>(
    {
        autorun = true,
        columns = [],
        pagination = {
            'meta.page': 1,
            'meta.per_page': 10,
        },
        service,
        serviceConfigurations = {},
        sorting = {
            sort_direction: SortOrderEnum.DESC,
            sort_field: 'dataCreazione',
        },
    } : {
        autorun?: boolean,
        columns: TableColumnsToTransformType<T>[],
        pagination?: ParametersForPaginationType,
        service: ApiServiceType<T>,
        serviceConfigurations?: ApiFetchOptionsWithIdType,
        sorting?: ParametersForSortingType<T>,
    }
): AntTableFilteringAndSortingType<T> => {

    const // Filtering and sorting values
        advancedFilters = ref<ParametersForFilteringType<T>>( {} ) as Ref<ParametersForFilteringType<T>> // ?: There is a bug on Vue https://github.com/vuejs/core/issues/2136
        , advancedFiltersBackup = ref<ParametersForFilteringType<T>>( {} ) as Ref<ParametersForFilteringType<T>>
        , antSorter = ref<SorterType<T>>(
            {
                field: sorting.sort_field,
                order: sorting.sort_direction === SortOrderEnum.DESC ? 'descend' : 'ascend',
            }
        ) as Ref<SorterType<T>>
        , antPagination = ref<TablePaginationType>(
            {
                current: pagination?.[ 'meta.page' ] ?? 1,
                pageSize: pagination?.[ 'meta.per_page' ] ?? 10,
            }
        ) as Ref<TablePaginationType>
        , handleCreateAdvancedFiltersBackup = (): void => {

            advancedFiltersBackup.value = { ... advancedFilters.value };

        }
        , handleRestoreAdvancedFiltersBackup = (): void => {

            advancedFilters.value = { ... advancedFiltersBackup.value };

        }
        , resetAdvancedFiltersBackup = (): void => {

            advancedFilters.value = {};

        }
        // Utility
        , loading = ref<boolean>( false )
        // Query Paramenters
        , renamedQueryParameters = columns.reduce(
            (
                accumulator,
                item
            ) => {

                if( item.renamedFilter && item.id !== 'actions' )
                    accumulator[ item.id ] = item.renamedFilter;

                return accumulator;

            },
            {} as ParametersForFilteringRenamedType<T>
        )
        , activeFilteringParameters = computed<ParametersForFilteringType<T>>(
            () => {

                const activeAntTableFilters = {} as ParametersType;

                for( const [ keyAsString, value ] of Object.entries<ParameterValueType>( advancedFilters.value ) ) {

                    // ?: Object.entries restituisce sempre una chiave di tipo stringa, per cui cozza con il KeyOf dell'oggetto
                    const key = keyAsString as KeyOf<T>;

                    if(
                        value === undefined
                        || value === null
                        || ( typeof value === 'object' && ! Array.isArray( value ) )
                    )
                        continue;

                    // Filters rename
                    const renamedKey = (
                        Object.prototype.hasOwnProperty.call( renamedQueryParameters, key )
                            ? renamedQueryParameters[ key ]
                            : key
                    );

                    if( ! renamedKey )
                        continue;

                    // Filters apply
                    // FIXME: typescript
                    activeAntTableFilters[ renamedKey ] = value;

                }

                return activeAntTableFilters;

            }
        )
        , activePaginationParameters = computed<ParametersForPaginationType>(
            () => {

                const {
                    current,
                    pageSize,
                } = antPagination.value;

                return {
                    'meta.page': current,
                    'meta.per_page': pageSize,
                };

            }
        )
        , activeSortingParameters = computed<ParametersForSortingType<T>>(
            () => {

                const antActiveSorting = antSorter.value
                    , sortedValue = ( Array.isArray( antActiveSorting ) ? antActiveSorting?.[ 0 ] : antActiveSorting ) as AntSorterType<T>
                    , keyValue = sortedValue?.field
                    , sortingField = ( Array.isArray( keyValue ) ? keyValue?.[ 0 ] : keyValue ) as SorterType<T>[ 'field' ]
                    , sortingOrder = sortedValue?.order as SorterType<T>[ 'order' ]
                    , sorting = {} as ParametersForSortingType<T>
                ;

                if( sortingOrder )
                    sorting.sort_direction = sortingOrder === 'ascend' ? SortOrderEnum.ASC : SortOrderEnum.DESC;

                if( sortingField )
                    sorting.sort_field = sortingField;

                return sorting;

            }
        )
        // Filtering and sorting
        , resetAntPagination = (): void => {

            antPagination.value.current = pagination?.[ 'meta.page' ] ?? 1;
            antPagination.value.pageSize = pagination?.[ 'meta.per_page' ] ?? 10;

        }
        , resetAntSorter = (): void => {

            antSorter.value = {};

        }
        , resetAntTableFilters = (): void => {

            advancedFilters.value = {};

        }
        // Vue request
        , defaultUsePaginationParameters: ParametersType[] = [
            { ... activePaginationParameters.value },
            { ... activeSortingParameters.value },
            { ... activeFilteringParameters.value },
        ]
        , usePaginationParameters = computed<ParametersType[]>(
            () => (
                [
                    { ... activePaginationParameters.value },
                    { ... activeSortingParameters.value },
                    { ... activeFilteringParameters.value },
                ]
            )
        )
        , queryData = (
            pagination: ParametersForPaginationType,
            sorting: ParametersForSortingType<T>,
            filters: ParametersForFilteringType<T>,
        ) => {

            return service(
                {
                    ... serviceConfigurations,
                    params: {
                        page: pagination[ 'meta.page' ],
                        per_page: pagination[ 'meta.per_page' ],
                        sort_direction: sorting.sort_direction || SortOrderEnum.DESC,
                        sort_field: sorting.sort_field,
                        ... filters,
                    },
                }
            );

        }
        , {
            data,
            loading: paginationLoading,
            current: paginationCurrent,
            pageSize: paginationPerPage,
            total: paginationTotal,
            totalPage: paginationTotalPages,
            runAsync,
            refreshAsync: refresh,
        } = usePagination<ApiResultsType<T[]>, ParametersType[]>(
            queryData,
            {
                defaultParams: defaultUsePaginationParameters,
                manual: ! autorun,
                pagination: {
                    currentKey: 'meta.page',
                    pageSizeKey: 'meta.per_page',
                    totalKey: 'meta.total',
                    totalPageKey: 'meta.total_pages',
                },
            }
        )
        // Table
        , tableColumns = computed<TableColumnsType<T>[]>(
            () => {

                if( ! columns?.length )
                    return [];

                // Filters and sorting
                const antActiveSorting = antSorter.value
                    , sortedValue = ( Array.isArray( antActiveSorting ) ? antActiveSorting?.[ 0 ] : antActiveSorting ) as AntSorterType<T>
                    , keyValue = sortedValue?.field
                    , AntSortingField = ( Array.isArray( keyValue ) ? keyValue?.[ 0 ] : keyValue ) as SorterType<T>[ 'field' ]
                    , AntSortingOrder = sortedValue?.order as SorterType<T>[ 'order' ]
                ;

                return columns.map(
                    item => {

                        // Column
                        return {
                            ... (
                                item.isHidden
                                    ? {
                                        customCell: () => ( { 'aria-hidden': true } ),
                                        customHeaderCell: () => ( { 'aria-hidden': true } ),
                                    }
                                    : {}
                            ),
                            customFilterDropdown: item.hasDropdownFilter,
                            dataIndex: item.id,
                            filterMultiple: !! item.isFilterMultiple,
                            filtered: (
                                item.id === 'actions'
                                    ? false
                                    : !! activeFilteringParameters.value[ item.renamedFilter ?? item.id ]
                            ),
                            filteredValue: null,
                            filters: item.filters ?? null,
                            key: item.id,
                            maxWidth: item.maxWidth,
                            minWidth: item.minWidth,
                            onFilterDropdownVisibleChange: async visible => {

                                if( ! visible ) {

                                    handleRestoreAdvancedFiltersBackup();
                                    return;

                                }

                                await nextTick();

                                // TODO: Focus per radio-button
                                // console.info( item.htmlInputRef );

                                const htmlElement = item.htmlInputRef?.value;

                                if( ! htmlElement )
                                    return;

                                setTimeout(
                                    () => htmlElement?.focus(),
                                    180
                                );

                            },
                            sortOrder: AntSortingField === item.id ? AntSortingOrder : null,
                            sorter: item.sorter === undefined ? true : item.sorter,
                            title: item.title,
                            width: item.width,
                        } as TableColumnsType<T>; // Questo lo metto così c'è il mapping dei valori da Ant

                    }
                );

            }
        )
        , tableRows = computed<T[]>( () => data.value?.data || [] )
        , tableIsShowColumnHeader = computed<boolean>( () => !! tableColumns.value.length )
        , tableIsLoading = computed<boolean>( () => loading.value || paginationLoading.value )
        , tablePagination = computed<TablePaginationType>(
            () => (
                {
                    current: paginationCurrent.value,
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    hideOnSinglePage: true,
                    pageSize: paginationPerPage.value,
                    total: paginationTotal.value,
                    totalPage: paginationTotalPages.value,
                }
            )
        )
        , tableOnChange: TablePaginationOnChangeEventType<T> = async(
            pagination,
            _,
            sorter,
        ): Promise<void> => {

            // Imposto i valori ricevuti da Ant, come li vuole lui
            antPagination.value = pagination;
            antSorter.value = ( Array.isArray( sorter ) ? sorter?.[ 0 ] : sorter ) as SorterType<T>;

            await runAsync( ... usePaginationParameters.value );

        }
        , tableHandleReset = async(): Promise<void> => {

            resetAntPagination();
            resetAntSorter();
            resetAntTableFilters();

            await runAsync( ... defaultUsePaginationParameters );

            resetTableSelectedRows();

            resetAdvancedFiltersBackup();

        }
        , tableSelectedRows = ref<TableSelectedRowsType>( [] )
        , tableIsRowSelected = computed<boolean>( () => !! tableSelectedRows.value.length )
        , tableOnRowSelection = ( selectedRowKeys: TableSelectedRowsType ): void => {

            tableSelectedRows.value = selectedRowKeys;

        }
        , resetTableSelectedRows = () => {

            tableSelectedRows.value = [];

        }
        // Utils
        , isLoading = computed<boolean>( () => loading.value || tableIsLoading.value ) // FIXME: tableIsLoading & isLoading sono sempre uguali
        // Filters event
        , onFiltersSubmit: AntTableFilteringAndSortingType<T>[ 'onFiltersSubmit' ] = async( { clearFilters, htmlInputRef } = {} ): Promise<void> => {

            // ?: Se il valore è in "vModel.lazy" update devo forzare un "blur" dell'HTMLInput
            htmlInputRef?.blur?.();

            resetAntPagination();

            await runAsync( ... usePaginationParameters.value );

            handleCreateAdvancedFiltersBackup();

            clearFilters?.(
                {
                    closeDropdown: true,
                    confirm: false,
                }
            );

        }
    ;

    return {

        activeFilteringParameters,
        activeSortingParameters,

        advancedFilters,

        handleCreateAdvancedFiltersBackup,
        handleRestoreAdvancedFiltersBackup,

        isLoading,
        loading,

        onFiltersSubmit,

        refresh,

        renamedQueryParameters,

        resetAntPagination,
        resetAntSorter,
        resetAntTableFilters,

        tableColumns,
        tableHandleReset,
        tableIsLoading,
        tableIsRowSelected,
        tableIsShowColumnHeader,
        tableOnChange,
        tableOnRowSelection,
        tablePagination,
        tableRows,
        tableSelectedRows,

    };

};

// Exports
export type { AntTableFilteringAndSortingType };
export { useAntTableFilteringAndSorting };
