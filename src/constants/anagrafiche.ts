import {
    AnagraficaStatusTypes,
    ColorsEnum,
    GenericSelectOptionType,
    StatoAnagraficaEnum,
    TipologiaAnagraficaEnum,
} from '~/types';

const
    TIPOLOGIA_ANAGRAFICA_OPTIONS: GenericSelectOptionType<TipologiaAnagraficaEnum>[] = [
        {
            label: 'Agente',
            value: TipologiaAnagraficaEnum.AGENTE,
        },
        {
            label: 'Asset manager',
            value: TipologiaAnagraficaEnum.ASSET_MANAGER,
        },
        {
            label: 'Curatore',
            value: TipologiaAnagraficaEnum.CURATORE,
        },
        {
            label: 'Giudice',
            value: TipologiaAnagraficaEnum.GIUDICE,
        },
    ]

    , ANAGRAFICA_STATUS_OPTIONS: AnagraficaStatusTypes[] = [
        {
            color: ColorsEnum.CYAN,
            label: 'Ricercabile',
            value: StatoAnagraficaEnum.RICERCABILE,
        },
        {
            label: 'Non ricercabile',
            value: StatoAnagraficaEnum.NON_RICERCABILE,
        },
    ];

export {
    TIPOLOGIA_ANAGRAFICA_OPTIONS,
    ANAGRAFICA_STATUS_OPTIONS,
};
