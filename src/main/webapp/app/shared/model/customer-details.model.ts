import { IUser } from 'app/shared/model/user.model';
import { IShoppingCart } from 'app/shared/model/shopping-cart.model';
import { IPet } from 'app/shared/model/pet.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ICustomerDetails {
  id?: number;
  gender?: Gender;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string | null;
  city?: string;
  country?: string;
  user?: IUser;
  carts?: IShoppingCart[] | null;
  pet?: IPet;
}

export const defaultValue: Readonly<ICustomerDetails> = {};
