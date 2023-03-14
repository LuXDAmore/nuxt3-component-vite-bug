// Types
import type { GenericSelectOptionType } from '~/types';

import {
    LotGoodsCadastreCategoryEnum,
    LotGoodsCadastreEnum,
    LotGoodsPropertyEnum,
} from '~/types';

// Constants
const
    LOT_GOODS_CADASTRE_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Fabbricati',
            value: LotGoodsCadastreEnum.FABBRICATI,
        },
        {
            label: 'Terreni',
            value: LotGoodsCadastreEnum.TERRENI,
        },
    ]
    , LOT_GOODS_CADASTRE_CATEGORY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'BCNC',
            value: LotGoodsCadastreCategoryEnum.BCNC,
        },
        {
            label: 'T',
            value: LotGoodsCadastreCategoryEnum.T,
        },
        {
            label: 'A/1',
            value: LotGoodsCadastreCategoryEnum.A_1,
        },
        {
            label: 'A/2',
            value: LotGoodsCadastreCategoryEnum.A_2,
        },
        {
            label: 'A/3',
            value: LotGoodsCadastreCategoryEnum.A_3,
        },
        {
            label: 'A/4',
            value: LotGoodsCadastreCategoryEnum.A_4,
        },
        {
            label: 'A/5',
            value: LotGoodsCadastreCategoryEnum.A_5,
        },
        {
            label: 'A/6',
            value: LotGoodsCadastreCategoryEnum.A_6,
        },
        {
            label: 'A/7',
            value: LotGoodsCadastreCategoryEnum.A_7,
        },
        {
            label: 'A/8',
            value: LotGoodsCadastreCategoryEnum.A_8,
        },
        {
            label: 'A/9',
            value: LotGoodsCadastreCategoryEnum.A_9,
        },
        {
            label: 'A/10',
            value: LotGoodsCadastreCategoryEnum.A_10,
        },
        {
            label: 'A/11',
            value: LotGoodsCadastreCategoryEnum.A_11,
        },
        {
            label: 'B/1',
            value: LotGoodsCadastreCategoryEnum.B_1,
        },
        {
            label: 'B/2',
            value: LotGoodsCadastreCategoryEnum.B_2,
        },
        {
            label: 'B/3',
            value: LotGoodsCadastreCategoryEnum.B_3,
        },
        {
            label: 'B/4',
            value: LotGoodsCadastreCategoryEnum.B_4,
        },
        {
            label: 'B/5',
            value: LotGoodsCadastreCategoryEnum.B_5,
        },
        {
            label: 'B/6',
            value: LotGoodsCadastreCategoryEnum.B_6,
        },
        {
            label: 'B/7',
            value: LotGoodsCadastreCategoryEnum.B_7,
        },
        {
            label: 'B/8',
            value: LotGoodsCadastreCategoryEnum.B_8,
        },
        {
            label: 'C/1',
            value: LotGoodsCadastreCategoryEnum.C_1,
        },
        {
            label: 'C/2',
            value: LotGoodsCadastreCategoryEnum.C_2,
        },
        {
            label: 'C/3',
            value: LotGoodsCadastreCategoryEnum.C_3,
        },
        {
            label: 'C/4',
            value: LotGoodsCadastreCategoryEnum.C_4,
        },
        {
            label: 'C/5',
            value: LotGoodsCadastreCategoryEnum.C_5,
        },
        {
            label: 'C/6',
            value: LotGoodsCadastreCategoryEnum.C_6,
        },
        {
            label: 'C/7',
            value: LotGoodsCadastreCategoryEnum.C_7,
        },
        {
            label: 'D/1',
            value: LotGoodsCadastreCategoryEnum.D_1,
        },
        {
            label: 'D/2',
            value: LotGoodsCadastreCategoryEnum.D_2,
        },
        {
            label: 'D/3',
            value: LotGoodsCadastreCategoryEnum.D_3,
        },
        {
            label: 'D/4',
            value: LotGoodsCadastreCategoryEnum.D_4,
        },
        {
            label: 'D/5',
            value: LotGoodsCadastreCategoryEnum.D_5,
        },
        {
            label: 'D/6',
            value: LotGoodsCadastreCategoryEnum.D_6,
        },
        {
            label: 'D/7',
            value: LotGoodsCadastreCategoryEnum.D_7,
        },
        {
            label: 'D/8',
            value: LotGoodsCadastreCategoryEnum.D_8,
        },
        {
            label: 'D/9',
            value: LotGoodsCadastreCategoryEnum.D_9,
        },
        {
            label: 'D/10',
            value: LotGoodsCadastreCategoryEnum.D_10,
        },
        {
            label: 'E/1',
            value: LotGoodsCadastreCategoryEnum.E_1,
        },
        {
            label: 'E/2',
            value: LotGoodsCadastreCategoryEnum.E_2,
        },
        {
            label: 'E/3',
            value: LotGoodsCadastreCategoryEnum.E_3,
        },
        {
            label: 'E/4',
            value: LotGoodsCadastreCategoryEnum.E_4,
        },
        {
            label: 'E/5',
            value: LotGoodsCadastreCategoryEnum.E_5,
        },
        {
            label: 'E/6',
            value: LotGoodsCadastreCategoryEnum.E_6,
        },
        {
            label: 'E/7',
            value: LotGoodsCadastreCategoryEnum.E_7,
        },
        {
            label: 'E/8',
            value: LotGoodsCadastreCategoryEnum.E_8,
        },
        {
            label: 'E/9',
            value: LotGoodsCadastreCategoryEnum.E_9,
        },
        {
            label: 'F/1',
            value: LotGoodsCadastreCategoryEnum.F_1,
        },
        {
            label: 'F/2',
            value: LotGoodsCadastreCategoryEnum.F_2,
        },
        {
            label: 'F/3',
            value: LotGoodsCadastreCategoryEnum.F_3,
        },
        {
            label: 'F/4',
            value: LotGoodsCadastreCategoryEnum.F_4,
        },
        {
            label: 'F/5',
            value: LotGoodsCadastreCategoryEnum.F_5,
        },
        {
            label: 'F/6',
            value: LotGoodsCadastreCategoryEnum.F_6,
        },
        {
            label: 'F/7',
            value: LotGoodsCadastreCategoryEnum.F_7,
        },
    ]
    , LOT_GOODS_PROPERTY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Diritto di superficie',
            value: LotGoodsPropertyEnum.DIRITTO_DI_SUPERFICIE,
        },
        {
            label: 'Enfiteusi',
            value: LotGoodsPropertyEnum.ENFITEUSI,
        },
        {
            label: 'Nuda proprietà',
            value: LotGoodsPropertyEnum.NUDA_PROPRIETA,
        },
        {
            label: 'Proprietà',
            value: LotGoodsPropertyEnum.PROPRIETA,
        },
        {
            label: 'Proprietà gravata da diritto di abitazione',
            value: LotGoodsPropertyEnum.PROPRIETA_GRAVATA_DA_DIRITTO_DI_ABITAZIONE,
        },
        {
            label: 'Proprietà gravata da diritto uso',
            value: LotGoodsPropertyEnum.PROPRIETA_GRAVATA_DA_DIRITTO_USO,
        },
        {
            label: 'Usufrutto',
            value: LotGoodsPropertyEnum.USUFRUTTO,
        },
    ]
    ;

export {
    LOT_GOODS_CADASTRE_CATEGORY_OPTIONS,
    LOT_GOODS_CADASTRE_OPTIONS,
    LOT_GOODS_PROPERTY_OPTIONS,
};
