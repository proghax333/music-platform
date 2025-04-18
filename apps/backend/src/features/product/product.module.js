import {
  createBrandModel,
  createCategoryModel,
  createProductModel,
  createProductPosting,
  createProductVariantModel,
  createBrandDataLoader,
  createCategoryDataLoader,
  createProductDataLoader,
  createProductPostingDataLoader,
  createProductVariantDataLoader,
} from "./product.model.js";
import { ProductResolver } from "./product.resolver.js";

export class ProductModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Product", createProductModel);
    di.factory("ProductPosting", createProductPosting);
    di.factory("ProductVariant", createProductVariantModel);
    di.factory("Brand", createBrandModel);
    di.factory("Category", createCategoryModel);

    di.factory("ProductDataLoader", createProductDataLoader);
    di.factory("ProductPostingDataLoader", createProductPostingDataLoader);
    di.factory("ProductVariantDataLoader", createProductVariantDataLoader);
    di.factory("BrandDataLoader", createBrandDataLoader);
    di.factory("CategoryDataLoader", createCategoryDataLoader);

    di.service("productResolver", ProductResolver);
  }
}
