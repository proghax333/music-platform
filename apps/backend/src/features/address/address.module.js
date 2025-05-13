import {
  createAddressDataLoader,
  createAddressModel,
} from "./address.model.js";
import { AddressResolver } from "./address.resolver.js";

export class AddressModule {
  /**
   * Registers services in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Address", createAddressModel);

    di.factory("AddressDataLoader", createAddressDataLoader);

    di.service("addressResolver", AddressResolver);
  }
}
