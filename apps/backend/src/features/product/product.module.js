import { createProductModel,createProductPosting,createProductVariantModel } from "./product.model.js";
import { ProductResolver } from "./product.resolver.js";

export class ProductModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
    static async registerProductModule(di){
        di.factory("Product" ,createProductModel);
        di.factory("ProductPosting" , createProductPosting);
        di.factory("ProductVariant" , createProductVariantModel);
        di.service("productResolver", ProductResolver, ...ProductResolver.deps);
    }
}