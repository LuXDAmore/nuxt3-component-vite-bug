// Imports
import { ApiMetaType } from '~/types';

// Enum
export enum LocationTypeEnum {
    CITY = 'city',
    PROCINCE = 'province',
    REGION = 'region',
}

// Type
export type LocationItemType = {
    city: {
        id: string,
        name: string,
        cadastralCode: string,
    },
    province: {
        id: string,
        name: string,
        plate: string,
    },
    region: {
        id: string,
        name: string,
    }
};

export type LocationItemOptionLabelType = 'labelCadastralCode' | 'labelId';
export type LocationItemOptionIdType = 'cadastralCode' | 'id';

export type LocationItemOptionType = {
    [ Property in LocationItemOptionLabelType | LocationItemOptionIdType ]: string;
} & {
    initialValue: LocationItemType,
};

export type LocationItemOptionKeyLabelType = Record<string, string>;

export type LocationParametersApiType = {
    needle: string,
    type: `${ LocationTypeEnum }`,
    per_page?: ApiMetaType[ 'per_page' ],
};
