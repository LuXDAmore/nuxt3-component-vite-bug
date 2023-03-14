// Third Party
import type { KeyOf } from '~/types';

// Third Party
import type { $Fetch, FetchOptions, FetchRequest } from 'ofetch';

// Enums
export enum SortOrderEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

// Types
// Parameters
export type ParameterInputValueType = string | number;
// type ParameterArrayValueType = ( string | number )[];
// type ParameterValueType = ParameterInputValueType | ParameterArrayValueType;
export type ParameterValueType = ParameterInputValueType;
export type ParametersType = Record<string, ParameterValueType> | Record<string, never>;

// API
export type ApiMetaType = {
    total?: number;
    per_page: number;
    page: number;
    total_pages?: number;
};

export type ApiResultsType<T, K = ApiMetaType> = {
    data: T;
    meta: K;
};

export type ApiFetchOptionsType = FetchOptions<'json'>;
export type ApiFetchType = $Fetch;

export interface ApiFetchOptionsWithIdType extends ApiFetchOptionsType {
    id?: string | string[] | number | number[],
    idChild?: string | string[] | number | number[],
}
export type ApiFetchOptionsTransformer = {
    config: ApiFetchOptionsType,
    id: ApiFetchOptionsWithIdType[ 'id' ],
    idChild: ApiFetchOptionsWithIdType[ 'idChild' ],
    url: FetchRequest,
};

export type ApiServiceType<T> = ( config?: ApiFetchOptionsType, baseConfig?: ApiFetchOptionsType ) => Promise<ApiResultsType<T[]>>;

// Filters
export type ParametersForFilteringType<T> = Record<KeyOf<T>, ParameterValueType> | Record<string, never>;
export type ParametersForFilteringRenamedType<T> = {
    [P in Extract<keyof T, string>]?: Extract<keyof T, string>;
};

// Pagination
export type ParametersForPaginationType = {
    'meta.page'?: number,
    'meta.per_page'?: number,
};
export type ParametersForSortingType<T, K extends string = 'dataCreazione'> = {
    'sort_direction'?: SortOrderEnum,
    'sort_field'?: KeyOf<T> | K,
};

export type ArrayFields<T> = {
    id: KeyOf<T>,
    key: KeyOf<T>,
};

export type OptionsApiDataPatchType<T> = {
    arrayFields?: ArrayFields<T>[],
    omitKey?: KeyOf<T>[],
    renamedKey?: Partial<Record<KeyOf<T>, KeyOf<T>>>
};
