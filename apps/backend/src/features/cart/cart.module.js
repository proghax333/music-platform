import { createCartItemModel } from "./cart.model.js";
import { CartResolver } from "./cart.resolver.js";

export class CartModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("CartItem", createCartItemModel);
    di.service("cartResolver", CartResolver, ...CartResolver.deps);

    return di;
  }
}
