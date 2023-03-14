// Types
export enum LotGoodsCadastreEnum {
    TERRENI = 'terreni',
    FABBRICATI = 'fabbricati',
}

export enum LotGoodsPropertyEnum {
    DIRITTO_DI_SUPERFICIE = 'diritto_di_superficie',
    ENFITEUSI = 'enfiteusi',
    NUDA_PROPRIETA = 'nuda_proprieta',
    PROPRIETA = 'proprieta',
    PROPRIETA_GRAVATA_DA_DIRITTO_DI_ABITAZIONE = 'proprieta_gravata_da_diritto_di_abitazione',
    PROPRIETA_GRAVATA_DA_DIRITTO_USO = 'proprieta_gravata_da_diritto_uso',
    USUFRUTTO = 'usufrutto',
}

export enum LotGoodsCadastreCategoryEnum {
    BCNC = 'BCNC',
    T = 'T',
    A_1 = 'A/1',
    A_2 = 'A/2',
    A_3 = 'A/3',
    A_4 = 'A/4',
    A_5 = 'A/5',
    A_6 = 'A/6',
    A_7 = 'A/7',
    A_8 = 'A/8',
    A_9 = 'A/9',
    A_10 = 'A/10',
    A_11 = 'A/11',
    B_1 = 'B/1',
    B_2 = 'B/2',
    B_3 = 'B/3',
    B_4 = 'B/4',
    B_5 = 'B/5',
    B_6 = 'B/6',
    B_7 = 'B/7',
    B_8 = 'B/8',
    C_1 = 'C/1',
    C_2 = 'C/2',
    C_3 = 'C/3',
    C_4 = 'C/4',
    C_5 = 'C/5',
    C_6 = 'C/6',
    C_7 = 'C/7',
    D_1 = 'D/1',
    D_2 = 'D/2',
    D_3 = 'D/3',
    D_4 = 'D/4',
    D_5 = 'D/5',
    D_6 = 'D/6',
    D_7 = 'D/7',
    D_8 = 'D/8',
    D_9 = 'D/9',
    D_10 = 'D/10',
    E_1 = 'E/1',
    E_2 = 'E/2',
    E_3 = 'E/3',
    E_4 = 'E/4',
    E_5 = 'E/5',
    E_6 = 'E/6',
    E_7 = 'E/7',
    E_8 = 'E/8',
    E_9 = 'E/9',
    F_1 = 'F/1',
    F_2 = 'F/2',
    F_3 = 'F/3',
    F_4 = 'F/4',
    F_5 = 'F/5',
    F_6 = 'F/6',
    F_7 = 'F/7',
}

export type LotGoodsCadastralType = {
    idComune?: string,
    catasto?: `${ LotGoodsCadastreEnum }`,
    proprieta?: `${ LotGoodsPropertyEnum }`,
    quota?: number,
    perizia?: number,
    ipoteca?: number,
    sezione?: string,
    foglio?: string,
    mappale?: string,
    subalterno?: string,
    categoriaCatasto?: `${ LotGoodsCadastreCategoryEnum }`,
    idEsterno?: string,
    graffato?: boolean,
    noteGraffatura?: string,
};

export type LotGoodsPlatesType = {
    targa?: string,
    telaio?: string,
};

export type LotGoodsItemType = {
    assetClassNanoCategoria?: string,
    codiceBene?: string,
    datiCatastali: LotGoodsCadastralType,
    datiTargati: LotGoodsPlatesType,
    idBene?: string,
    idNanoCategoria?: string,
    nomeBene?: string,
    nomeNanoCategoria?: string,
    idLottoDestinazione?: string[],
};