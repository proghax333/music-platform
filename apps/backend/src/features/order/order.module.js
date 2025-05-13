import { createOrderDataLoader, createOrderModel } from "./order.model.js";
import { OrderResolver } from "./order.resolver.js";

export class OrderModule {
  /**
   * Registers services in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Order", createOrderModel);

    di.factory("OrderDataLoader", createOrderDataLoader);

    di.service("orderResolver", OrderResolver);
  }
}
