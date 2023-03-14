import { GenericInputValueType, GenericSelectOptionType } from '~/types';

export const selectOptionsToRecord = <EnumType extends GenericInputValueType, K extends GenericSelectOptionType<EnumType>>( options: K[] ): Record<EnumType, Omit<K, 'value'>> =>
    options.reduce( ( accumulator, current ) => {

        const { value, ... rest } = current;

        return {
            ... accumulator,
            [ value ]: { ... rest },
        };

    }, {} as Record<EnumType, Omit<K, 'value'>> );
