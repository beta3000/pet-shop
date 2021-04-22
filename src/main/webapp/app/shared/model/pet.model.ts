import { IPetType } from 'app/shared/model/pet-type.model';

export interface IPet {
  id?: number;
  name?: string;
  petType?: IPetType;
}

export const defaultValue: Readonly<IPet> = {};
