import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  id: Generated<number>;
};
export type AccountSettings = {
  id: Generated<number>;
  accountId: number;
};
export type Product = {
  id: Generated<number>;
  code: string;
  name: string;
  description: string;
};
export type ProductSellPosting = {
  id: Generated<number>;
  variantId: number;
  sellerId: number;
  sellingPrice: string;
  baseDiscount: string;
};
export type ProductVariantResource = {
  id: Generated<number>;
  variantId: number;
};
export type Profile = {
  id: Generated<number>;
  roleId: number;
  accountId: number;
  name: string;
  description: string;
  profilePicture: string;
};
export type ProfileSettings = {
  id: Generated<number>;
  profileId: number;
};
export type Role = {
  id: Generated<number>;
};
export type Test = {
  id: Generated<number>;
};
export type Variant = {
  id: Generated<number>;
  productId: number;
  name: string;
  description: string;
  type: string;
};
export type DB = {
  Account: Account;
  AccountSettings: AccountSettings;
  Product: Product;
  ProductSellPosting: ProductSellPosting;
  ProductVariantResource: ProductVariantResource;
  Profile: Profile;
  ProfileSettings: ProfileSettings;
  Role: Role;
  Test: Test;
  Variant: Variant;
};
