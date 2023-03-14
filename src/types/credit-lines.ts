// Enums
import { CustomerTypologyEnum, LotAssetTypologyEnum, ServiceTypologyEnum } from '~/types';

// Types
type CreditLinesItemType = {
    idAffidamento: string,
    codice_contratto?: string,
    codiceAffidamento?: string,
    data_affido?: string,
    tipologia_asset?: LotAssetTypologyEnum,
    tipologia_servizio?: ServiceTypologyEnum
    tipologia_cliente?: CustomerTypologyEnum,
    codice_mandante?: string,
    nome_mandante?: string,
    id_tribunale?: string,
    numero_rg?: string,
    anno_rg?: string,
    stato?: string,
};

// Exports
export type { CreditLinesItemType };
