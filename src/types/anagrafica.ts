import { ColorsEnum } from '~/types/colors';
import { GenericSelectOptionType } from '~/types/input';

export enum TipologiaAnagraficaEnum {
  CURATORE = 'CURATORE',
  GIUDICE = 'GIUDICE',
  AGENTE = 'AGENTE',
  ASSET_MANAGER = 'ASSET_MANAGER',
}

export enum StatoAnagraficaEnum {
  RICERCABILE ='RICERCABILE',
  NON_RICERCABILE = 'NON_RICERCABILE'
}

export type AnagraficaItemType = {
  idAnagrafica: string;
  nome: string;
  cognome: string;
  ragioneSociale?: string;
  email: string;
  pec?: string;
  tipologia: TipologiaAnagraficaEnum;
  codiceFiscale?: string;
  partitaIva?: string;
  cellulare?: string;
  stato: StatoAnagraficaEnum;
  dataCreazione?: string,
};

export type AnagraficaStatusTypes = {
  color?: ColorsEnum,
} & GenericSelectOptionType<StatoAnagraficaEnum>;
