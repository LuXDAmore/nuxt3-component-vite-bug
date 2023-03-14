// Ant Design Types
import type {
    PaginationProps as AntPaginationProperties,
    TableColumnType as AntTableColumnType,
    TableProps as AntTableProperties,
} from 'ant-design-vue';
import type {
    ColumnFilterItem as AntColumnFilterItem,
    Key as AntKey,
    SortOrder as AntSortOrder,
    SorterResult as AntSorterResult,
} from 'ant-design-vue/lib/table/interface';

import type { KeyOf } from '~/types';

import type { Ref } from 'vue';

// Types
// Sorting
type AntSorterType<T> = AntSorterResult<T[]>;
type SorterType<T, K = 'dataCreazione'> ={
    field?: KeyOf<T> | K,
    order?: AntSortOrder,
};

// Table
type TablePaginationOnChangeEventType<T> = AntTableProperties<T[]>[ 'onChange' ];
type TableColumnsType<T> = AntTableColumnType<T>;
type TablePaginationType = AntPaginationProperties;

type TableColumnsToTransformType<T> = {
    id: KeyOf<T> | 'actions',
    title?: string,
    hasDropdownFilter?: boolean,
    htmlInputRef?: Ref<HTMLInputElement | null>,
    isHidden?: boolean,
    isFilterMultiple?: boolean,
    filters?: AntColumnFilterItem[],
    sorter?: boolean,
    renamedFilter?: KeyOf<T>,
    width?: number | string;
    minWidth?: number;
    maxWidth?: number;
};

type TableSelectedRowsType = AntKey[];

// Exports
export type {

    AntSorterType,

    SorterType,

    TablePaginationOnChangeEventType,
    TableColumnsToTransformType,
    TableColumnsType,
    TablePaginationType,
    TableSelectedRowsType,

};
