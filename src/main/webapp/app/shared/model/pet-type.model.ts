import { IPet } from 'app/shared/model/pet.model';

export interface IPetType {
  id?: number;
  name?: string;
  pets?: IPet[] | null;
}

export const defaultValue: Readonly<IPetType> = {};
