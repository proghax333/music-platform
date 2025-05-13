import { createHttpError } from "../../lib/http.js";
import { resolver } from "../../lib/graphql.js";
import { paginate } from "../../lib/pagination.js";

export class OrderResolver {
  /** @type {import("mongoose").Model} */
  Order;
  /** @type {import("mongoose").Model} */
  CartItem;

  /** @type {import("dataloader")} */
  OrderDataLoader;

  constructor() {}

  static get deps() {
    return ["Order", "CartItem", "OrderDataLoader"];
  }

  createOrder = resolver(async (parent, args, context) => {
    const order = await this.Order.create(args.input);

    if (!order) {
      throw createHttpError(500, "Could not create the order.");
    }

    return {
      message: "Order created.",
      order,
    };
  });

  updateOrder = resolver(async (parent, args, context) => {
    const { id } = args;

    const order = await this.Order.findById(id);

    if (!order) {
      throw createHttpError(404, "Order not found.");
    }

    return {
      message: "Order updated.",
      order,
    };
  });

  deleteOrder = resolver(async (parent, args, context) => {
    const { id } = args;

    const order = await this.Order.findByIdAndDelete(id);

    if (!order) {
      throw createHttpError(404, "Order not found.");
    }

    return {
      message: "Order deleted.",
    };
  });

  getResolvers() {
    return {
      Query: {},
      Mutation: {
        createOrder: this.createOrder,
        updateOrder: this.updateOrder,
        deleteOrder: this.deleteOrder,
      },
    };
  }
}
