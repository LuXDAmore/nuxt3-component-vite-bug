// FIXME: da controllare i valori di tutti gli ENUM
// Enum
enum LotsDimensionEnum {
    XS = 'XS',
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
}

enum LotsLocationQualityEnum {
    NESSUNO = 'nessuno',
    VALUE_1 = 1,
    VALUE_2 = 2,
    VALUE_3 = 3,
    VALUE_4 = 4,
    VALUE_5 = 5,
}

enum LotsContextEnum {
    NESSUNO = 'nessuno',
    CENTRO_PERIFERIA= 'centro_periferia',
    RURALE= 'rurale',
    PRODUTTIVO= 'produttivo',
    TURISTICO= 'turistico',
    DIREZIONALE= 'direzionale',
    ALTRO= 'altro',
}

enum LotsCompletionEnum {
    FULL = 'full',
    LIGHT = 'light',
}

enum LotsEntranceEnum {
    COMUNE = 'comune',
    INDIPENDENTE = 'indipendente',
}

enum LotsGateEnum {
    NESSUNO = 'nessuno',
    MANUALE = 'manuale',
    AUTOMATICO = 'automatico',
}

enum LotsParkingEnum {
    NESSUNO = 'nessuno',
    GARAGE = 'garage',
    AUTORIMESSA = 'autorimessa',
    SCOPERTO = 'scoperto',
    COPERTO = 'scoperto',
}

enum LotsExtraServicesEnum {
    IDROMASSAGGIO = 'idromassaggio',
    CAMINO = 'camino',
    PISCINA_APERTO = 'piscina_aperto',
    CAMPO_TENNIS = 'campo_tennis',
    PORTINERIA = 'portineria',
    PISCINA_CHIUSO = 'piscina_chiuso',
    SOLAI_CARRABILI = 'solai_carrabili',
    CABINA_ELETTRICA = 'cabina_elettrica',
    SALA_CONGRESSI = 'sala_congressi',
    AREA_PRODUTTIVA_RISCALDATA = 'area_produttiva_riscaldata',
    SPA = 'spa',
    RISTORANTE = 'ristorante',
    BAR = 'bar',
}

enum LotsTransferOwnerEnum {
    ATTO_NOTARILE = 'atto_notarile',
    DECRETO_TRASFERIMENTO = 'decreto_trasferimento',
}

enum LotsApeEnum {
    SI = 'si',
    NO = 'no',
    NON_NECESSARIA = 'non_necessaria',
}

enum LotsRigEnum {
    ASSENTE = 'assente',
    RADIATORI = 'radiatori',
    PAVIMENTO = 'pavimento',
    ARIA = 'aria',
    STUFA = 'stufa',
    VENTILCOVETTORI = 'ventilcovettori',
}

enum LotsHeatingSystemEnum {
    NESSUNO = 'nessuno',
    ASSENTE = 'assente',
    AUTONOMO = 'autonomo',
    CENTRALIZZATO = 'centralizzato',
    PREDISPOSIZIONE = 'predisposizione',
}

enum LotsEnergeticClassEnum {
    A4 = 'A4',
    A3 = 'A3',
    A2 = 'A2',
    A1 = 'A1',
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
    E = 'E',
    F = 'F',
    G = 'G',
}

enum LotsCompassEnum {
    NESSUNO = 'nessuno',
    NORD = 'nord',
    OVEST = 'ovest',
    SUD = 'sud',
    EST = 'est',
}

// FIXME: da controllare i valori di questi ENUM
// FIXME: Le categorie non hanno il valore SHARED (shared è dentro l'affidamento), ma sono IMMATERIALE per le categorie
enum LotAssetTypologyEnum {
    IMMOBILIARE = 'immobiliare',
    MOBILIARE = 'mobiliare',
    SHARED = 'shared_asset_deals'
}
enum LotCategoryEnum {
    IMMOBILIARE = 'immobiliare',
    MOBILIARE = 'mobiliare',
    IMMATERIALE = 'immateriale'
}

enum LotsMotivationStatusEnum {
    NESSUNA_MOTIVAZIONE = 'nessuna_motivazione',
    CREDITO_CEDUTO = 'credito_ceduto',
    ESTINZIONE = 'estinzione',
    INCARICO_REVOCATO = 'incarico_revocato',
    INCARICO_SCADUTO = 'incarico_scaduto',
    RILOTTIZZATO = 'rilottizzato',
    VENDUTO = 'venduto',
}

enum LotsStatusEnum {
    BOZZA = 'bozza',
    IN_ATTESA_DI_SOPRALLUOGO = 'in_attesa_di_sopralluogo',
    IN_LAVORAZIONE = 'in_lavorazione',
    ATTIVO = 'attivo',
    FINALIZZAZIONE_IN_CORSO = 'finalizzazione_in_corso',
    USCITO_DAL_PORTAFOGLIO = 'uscito_dal_portafoglio',
}

enum LotsCustomerTypologyEnum {
    GIUDIZIARIO = 'giudiziario',
    FINANZIARIO = 'finanziario',
    CAPTIVE = 'captive',
    PRIVATO = 'privato',
    PUBBLICA_AMMINISTRAZIONE = 'pubblica_amministrazione',
    NO_MANDANTE = 'no_mandante',
}

enum LotsServiceTypologyEnum {
    PUBBLICITA = 'pubblicita',
    AF = 'auction_facilitation',
    VENDITA = 'vendita',
    CONSULENZA = 'consulenza',
    GESTORE_VENDITA_TELEMATICA = 'gestore_vendita_telematica',
    RINNOVO = 'rinnovo',
}

// Types
type LotItemType = {
    idLotto: string,
    annoRG?: string,
    codiceAffidamento?: string,
    codiceContratto?: string,
    codiceLotto?: string,
    codiceMandante?: string,
    dataAffido?: string,
    dataCreazione?: string,
    dimensione?: `${ LotsDimensionEnum }`,
    idAffidamento?: string,
    idAffidamentiAggiuntivi?: string[],
    idAssetManagerMandante?: string,
    idGestoreBroker?: string,
    idNanoCategoria: string,
    idReferentePropMandante?: string,
    idSalesman?: string,
    idTag?: string,
    idTribunale?: string,
    idEsternoLotto?: string,
    infoAggiuntive?: Record<string, string> | Record<string, never>,
    listaTag?: { idTag: string, nomeTag: string }[],
    listaIdTag?: string[],
    livelloCompletamento?: `${ LotsCompletionEnum }`,
    motivazioneStato?: `${ LotsMotivationStatusEnum }`,
    nomeLotto: {
        it: string,
        en?: string,
        es?: string,
    },
    nomeAssetManagerMandante?: string,
    nomeGestoreBroker?: string,
    nomeMandante?: string,
    nomeNanoCategoria?: string,
    nomeReferentePropMandante?: string,
    nomeSalesman?: string,
    nomeTribunale?: string,
    numeroRG?: string,
    statoLotto?: `${ LotsStatusEnum }`,
    tipologiaAsset?: `${ LotAssetTypologyEnum }`,
    tipologiaCliente?: string,
    tipologiaServizio?: string,
    // TODO: Da verificare i nomi
    sorgente?: string,
    affidamentiAggiuntivi?: { idAffidamento: string, codiceAffidamento: string }[],
    assetManagerMandante?: string,
    referenteProprietaMandante?: string,
    gestoreBroker?: string,
};

type LotStatusTypes = {
    label: string,
    value: `${ LotsStatusEnum }`,
    color?: string,
    destinations: `${ LotsStatusEnum }`[],
};

// Export
export {
    LotsDimensionEnum,
    LotsMotivationStatusEnum,
    LotsCompletionEnum,
    LotsStatusEnum,
    LotAssetTypologyEnum,
    LotsCustomerTypologyEnum,
    LotsServiceTypologyEnum,
    LotsLocationQualityEnum,
    LotsContextEnum,
    LotsEntranceEnum,
    LotsGateEnum,
    LotsParkingEnum,
    LotsExtraServicesEnum,
    LotsCompassEnum,
    LotsHeatingSystemEnum,
    LotsEnergeticClassEnum,
    LotsRigEnum,
    LotsApeEnum,
    LotsTransferOwnerEnum,
    LotCategoryEnum,
};

export type {
    LotItemType,
    LotStatusTypes,
};
