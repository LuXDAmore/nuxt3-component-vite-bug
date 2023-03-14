// Types
type GenericInputValueType = string | number;

type GenericSelectOptionType<T = GenericInputValueType> = {
    label: string,
    value: T,
};

// Exports
export type {
    GenericInputValueType,
    GenericSelectOptionType,
};
