import { IProductCategory } from 'app/shared/model/product-category.model';
import { Talla } from 'app/shared/model/enumerations/talla.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  talla?: Talla;
  imageContentType?: string | null;
  image?: string | null;
  productCategory?: IProductCategory;
}

export const defaultValue: Readonly<IProduct> = {};
