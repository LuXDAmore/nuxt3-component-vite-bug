// Types
import type { LotCategoryEnum } from '~/types';

// Enum
// FIXME: Le categorie non hanno il valore SHARED (shared è dentro l'affidamento), ma sono IMMATERIALE per le categorie
enum CategoryTypologyEnum {
    ASSET = 'ASSET_CLASS',
    MICRO = 'MICRO',
    NANO = 'NANO',
}

// Types
type CategoryItemType = {
    id: string,
    nome: string,
    tipologia: CategoryTypologyEnum,
    id_padre?: string | null
};

type CategoryTreeItemType = {
    children: CategoryTreeItemType[],
    idCategoria: string,
    nomeCategoria: ( string | LotCategoryEnum ),
};

type CategoryTreeType = {
    [ CategoryTypologyEnum.ASSET ]?: CategoryTreeItemType,
    [ CategoryTypologyEnum.MICRO ]?: CategoryTreeItemType,
    [ CategoryTypologyEnum.NANO ]?: CategoryTreeItemType,
};

// Exports
export { CategoryTypologyEnum };
export type {
    CategoryTreeType,
    CategoryItemType,
    CategoryTreeItemType,
};
