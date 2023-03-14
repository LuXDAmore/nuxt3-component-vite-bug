// Types
import type { GenericSelectOptionType, LotStatusTypes } from '~/types';

import {
    ColorsEnum,
    LotAssetTypologyEnum,
    LotsApeEnum,
    LotsCompassEnum,
    LotsCompletionEnum,
    LotsContextEnum,
    LotsCustomerTypologyEnum,
    LotsDimensionEnum,
    LotsEnergeticClassEnum,
    LotsEntranceEnum,
    LotsExtraServicesEnum,
    LotsGateEnum,
    LotsHeatingSystemEnum,
    LotsLocationQualityEnum,
    LotsMotivationStatusEnum,
    LotsParkingEnum,
    LotsRigEnum,
    LotsServiceTypologyEnum,
    LotsStatusEnum,
    LotsTransferOwnerEnum,
} from '~/types';

// Constants
const
    LOT_COMPLETION_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Full',
            value: LotsCompletionEnum.FULL,
        },
        {
            label: 'Light',
            value: LotsCompletionEnum.LIGHT,
        },
    ]

    , LOT_DIMENSIONS_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'XS',
            value: LotsDimensionEnum.XS,
        },
        {
            label: 'S',
            value: LotsDimensionEnum.S,
        },
        {
            label: 'M',
            value: LotsDimensionEnum.M,
        },
        {
            label: 'L',
            value: LotsDimensionEnum.L,
        },
        {
            label: 'XL',
            value: LotsDimensionEnum.XL,
        },
    ]

    , LOT_MOTIVATION_STATUS_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuna motivazione',
            value: LotsMotivationStatusEnum.NESSUNA_MOTIVAZIONE,
        },
        {
            label: 'Credito ceduto',
            value: LotsMotivationStatusEnum.CREDITO_CEDUTO,
        },
        {
            label: 'Estinzione',
            value: LotsMotivationStatusEnum.ESTINZIONE,
        },
        {
            label: 'Incarico revocato',
            value: LotsMotivationStatusEnum.INCARICO_REVOCATO,
        },
        {
            label: 'Incarico scaduto',
            value: LotsMotivationStatusEnum.INCARICO_SCADUTO,
        },
        {
            label: 'Rilottizzato',
            value: LotsMotivationStatusEnum.RILOTTIZZATO,
        },
        {
            label: 'Venduto',
            value: LotsMotivationStatusEnum.VENDUTO,
        },
    ]

    , LOT_STATUS_OPTIONS: LotStatusTypes[] = [
        {
            color: ColorsEnum.RED,
            destinations: [
                LotsStatusEnum.IN_ATTESA_DI_SOPRALLUOGO,
                LotsStatusEnum.IN_LAVORAZIONE,
                LotsStatusEnum.ATTIVO,
            ],
            label: 'Bozza',
            value: LotsStatusEnum.BOZZA,
        },
        {
            color: ColorsEnum.ORANGE,
            destinations: [ LotsStatusEnum.IN_LAVORAZIONE, LotsStatusEnum.ATTIVO ],
            label: 'In attesa di sopralluogo',
            value: LotsStatusEnum.IN_ATTESA_DI_SOPRALLUOGO,
        },
        {
            color: ColorsEnum.GREEN,
            destinations: [ LotsStatusEnum.ATTIVO ],
            label: 'In lavorazione',
            value: LotsStatusEnum.IN_LAVORAZIONE,
        },
        {
            color: ColorsEnum.CYAN,
            destinations: [
                LotsStatusEnum.IN_LAVORAZIONE,
                LotsStatusEnum.FINALIZZAZIONE_IN_CORSO,
                LotsStatusEnum.USCITO_DAL_PORTAFOGLIO,
            ],
            label: 'Attivo',
            value: LotsStatusEnum.ATTIVO,
        },
        {
            color: ColorsEnum.BLUE,
            destinations: [ LotsStatusEnum.ATTIVO, LotsStatusEnum.USCITO_DAL_PORTAFOGLIO ],
            label: 'Finalizzazione in corso',
            value: LotsStatusEnum.FINALIZZAZIONE_IN_CORSO,
        },
        {
            color: ColorsEnum.PURPLE,
            destinations: [ LotsStatusEnum.ATTIVO, LotsStatusEnum.USCITO_DAL_PORTAFOGLIO ],
            label: 'Uscito dal portafoglio',
            value: LotsStatusEnum.USCITO_DAL_PORTAFOGLIO,
        },
    ]

    , LOT_ASSET_TYPOLOGY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Immobiliare',
            value: LotAssetTypologyEnum.IMMOBILIARE,
        },
        {
            label: 'Mobiliare',
            value: LotAssetTypologyEnum.MOBILIARE,
        },
        {
            label: 'Shared',
            value: LotAssetTypologyEnum.SHARED,
        },
    ]

    , LOT_CUSTOMER_TYPOLOGY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Giudiziario',
            value: LotsCustomerTypologyEnum.GIUDIZIARIO,
        },
        {
            label: 'Finanziario',
            value: LotsCustomerTypologyEnum.FINANZIARIO,
        },
        {
            label: 'Captive',
            value: LotsCustomerTypologyEnum.CAPTIVE,
        },
        {
            label: 'Privato',
            value: LotsCustomerTypologyEnum.PRIVATO,
        },
        {
            label: 'Pubblica amministrazione',
            value: LotsCustomerTypologyEnum.PUBBLICA_AMMINISTRAZIONE,
        },
        {
            label: 'Nessun mandante',
            value: LotsCustomerTypologyEnum.NO_MANDANTE,
        },
    ]

    , LOT_SERVICE_TYPOLOGY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Pubblicità',
            value: LotsServiceTypologyEnum.PUBBLICITA,
        },
        {
            label: 'AF',
            value: LotsServiceTypologyEnum.AF,
        },
        {
            label: 'Vendita',
            value: LotsServiceTypologyEnum.VENDITA,
        },
        {
            label: 'Consulenza',
            value: LotsServiceTypologyEnum.CONSULENZA,
        },
        {
            label: 'Gestore vendita telematica',
            value: LotsServiceTypologyEnum.GESTORE_VENDITA_TELEMATICA,
        },
        {
            label: 'Rinnovo',
            value: LotsServiceTypologyEnum.RINNOVO,
        },
    ]

    , LOT_ENTRANCE_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Comune',
            value: LotsEntranceEnum.COMUNE,
        },
        {
            label: 'Indipendente',
            value: LotsEntranceEnum.INDIPENDENTE,
        },
    ]

    , LOT_GATE_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Manuale',
            value: LotsGateEnum.MANUALE,
        },
        {
            label: 'Automatico',
            value: LotsGateEnum.AUTOMATICO,
        },
    ]

    , LOT_LOCATION_QUALITY_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuno',
            value: LotsLocationQualityEnum.NESSUNO,
        },
        {
            label: '1',
            value: LotsLocationQualityEnum.VALUE_1,
        },
        {
            label: '2',
            value: LotsLocationQualityEnum.VALUE_2,
        },
        {
            label: '3',
            value: LotsLocationQualityEnum.VALUE_3,
        },
        {
            label: '4',
            value: LotsLocationQualityEnum.VALUE_4,
        },
        {
            label: '5',
            value: LotsLocationQualityEnum.VALUE_5,
        },
    ]

    , LOT_CONTEXT_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuno',
            value: LotsContextEnum.NESSUNO,
        },
        {
            label: 'Centro - Periferia',
            value: LotsContextEnum.CENTRO_PERIFERIA,
        },
        {
            label: 'Rurale',
            value: LotsContextEnum.RURALE,
        },
        {
            label: 'Produttivo',
            value: LotsContextEnum.PRODUTTIVO,
        },
        {
            label: 'Turistico',
            value: LotsContextEnum.TURISTICO,
        },
        {
            label: 'Direzionale',
            value: LotsContextEnum.DIREZIONALE,
        },
        {
            label: 'Altro',
            value: LotsContextEnum.ALTRO,
        },
    ]

    , LOT_PARKING_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuno',
            value: LotsParkingEnum.NESSUNO,
        },
        {
            label: 'Garage',
            value: LotsParkingEnum.GARAGE,
        },
        {
            label: 'Autorimessa',
            value: LotsParkingEnum.AUTORIMESSA,
        },
        {
            label: 'Scoperto',
            value: LotsParkingEnum.SCOPERTO,
        },
        {
            label: 'Coperto',
            value: LotsParkingEnum.COPERTO,
        },
    ]

    , LOT_EXTRA_SERVICES_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Idromassaggio',
            value: LotsExtraServicesEnum.IDROMASSAGGIO,
        },
        {
            label: 'Camino',
            value: LotsExtraServicesEnum.CAMINO,
        },
        {
            label: "Piscina all'aperto",
            value: LotsExtraServicesEnum.PISCINA_APERTO,
        },
        {
            label: 'Campo da tennis',
            value: LotsExtraServicesEnum.CAMPO_TENNIS,
        },
        {
            label: 'Portineria',
            value: LotsExtraServicesEnum.PORTINERIA,
        },
        {
            label: 'Piscina al chiuso',
            value: LotsExtraServicesEnum.PISCINA_CHIUSO,
        },
        {
            label: 'Solai carrabili',
            value: LotsExtraServicesEnum.SOLAI_CARRABILI,
        },
        {
            label: 'Cabina elettrica',
            value: LotsExtraServicesEnum.CABINA_ELETTRICA,
        },
        {
            label: 'Sala congressi',
            value: LotsExtraServicesEnum.SALA_CONGRESSI,
        },
        {
            label: 'Area produttiva riscaldata',
            value: LotsExtraServicesEnum.AREA_PRODUTTIVA_RISCALDATA,
        },
        {
            label: 'Spa',
            value: LotsExtraServicesEnum.SPA,
        },
        {
            label: 'Ristorante',
            value: LotsExtraServicesEnum.RISTORANTE,
        },
        {
            label: 'Bar',
            value: LotsExtraServicesEnum.BAR,
        },
    ]

    , LOT_COMPASS_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuno',
            value: LotsCompassEnum.NESSUNO,
        },
        {
            label: 'Nord',
            value: LotsCompassEnum.NORD,
        },
        {
            label: 'Ovest',
            value: LotsCompassEnum.OVEST,
        },
        {
            label: 'Sud',
            value: LotsCompassEnum.SUD,
        },
        {
            label: 'Est',
            value: LotsCompassEnum.EST,
        },
    ]

    , LOT_HEATING_SYSTEM_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Nessuno',
            value: LotsHeatingSystemEnum.NESSUNO,
        },
        {
            label: 'Assente',
            value: LotsHeatingSystemEnum.ASSENTE,
        },
        {
            label: 'Autonomo',
            value: LotsHeatingSystemEnum.AUTONOMO,
        },
        {
            label: 'Centralizzato',
            value: LotsHeatingSystemEnum.CENTRALIZZATO,
        },
        {
            label: 'Predisposizione',
            value: LotsHeatingSystemEnum.PREDISPOSIZIONE,
        },
    ]

    , LOT_ENERGETIC_CLASS_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'A4',
            value: LotsEnergeticClassEnum.A4,
        },
        {
            label: 'A3',
            value: LotsEnergeticClassEnum.A3,
        },
        {
            label: 'A2',
            value: LotsEnergeticClassEnum.A2,
        },
        {
            label: 'A1',
            value: LotsEnergeticClassEnum.A1,
        },
        {
            label: 'A',
            value: LotsEnergeticClassEnum.A,
        },
        {
            label: 'B',
            value: LotsEnergeticClassEnum.B,
        },
        {
            label: 'C',
            value: LotsEnergeticClassEnum.C,
        },
        {
            label: 'D',
            value: LotsEnergeticClassEnum.D,
        },
        {
            label: 'E',
            value: LotsEnergeticClassEnum.E,
        },
        {
            label: 'F',
            value: LotsEnergeticClassEnum.F,
        },
        {
            label: 'G',
            value: LotsEnergeticClassEnum.G,
        },
    ]

    , LOT_RIG_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Assente',
            value: LotsRigEnum.ASSENTE,
        },
        {
            label: 'Radiatori',
            value: LotsRigEnum.RADIATORI,
        },
        {
            label: 'Pavimento',
            value: LotsRigEnum.PAVIMENTO,
        },
        {
            label: 'Aria',
            value: LotsRigEnum.ARIA,
        },
        {
            label: 'Stufa',
            value: LotsRigEnum.STUFA,
        },
        {
            label: 'Ventilcovettori',
            value: LotsRigEnum.VENTILCOVETTORI,
        },
    ]

    , LOT_APE_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Si',
            value: LotsApeEnum.SI,
        },
        {
            label: 'No',
            value: LotsApeEnum.NO,
        },
        {
            label: 'Non necessaria',
            value: LotsApeEnum.NON_NECESSARIA,
        },
    ]

    , LOT_TRANSFER_OWNER_OPTIONS: GenericSelectOptionType[] = [
        {
            label: 'Atto notarile',
            value: LotsTransferOwnerEnum.ATTO_NOTARILE,
        },
        {
            label: 'Decreto trasferimento',
            value: LotsTransferOwnerEnum.DECRETO_TRASFERIMENTO,
        },
    ]

;

export {
    LOT_COMPLETION_OPTIONS,
    LOT_ENTRANCE_OPTIONS,
    LOT_DIMENSIONS_OPTIONS,
    LOT_GATE_OPTIONS,
    LOT_MOTIVATION_STATUS_OPTIONS,
    LOT_STATUS_OPTIONS,
    LOT_ASSET_TYPOLOGY_OPTIONS,
    LOT_CUSTOMER_TYPOLOGY_OPTIONS,
    LOT_SERVICE_TYPOLOGY_OPTIONS,
    LOT_CONTEXT_OPTIONS,
    LOT_PARKING_OPTIONS,
    LOT_EXTRA_SERVICES_OPTIONS,
    LOT_LOCATION_QUALITY_OPTIONS,
    LOT_COMPASS_OPTIONS,
    LOT_HEATING_SYSTEM_OPTIONS,
    LOT_ENERGETIC_CLASS_OPTIONS,
    LOT_RIG_OPTIONS,
    LOT_APE_OPTIONS,
    LOT_TRANSFER_OWNER_OPTIONS,
};
