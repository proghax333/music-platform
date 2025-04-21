import createHttpError from "http-errors";
import { resolver } from "../../lib/graphql.js";
import { Decimal } from "../../lib/decimal.js";

export class CartResolver {
  /** @type {import("mongoose").Model} */
  CartItem;
  /** @type {import("mongoose").Model} */
  ProductVariant;
  /** @type {import("mongoose").Model} */
  Profile;

  /** @type {import("dataloader")} */
  ProductVariantDataLoader;
  /** @type {import("dataloader")} */
  ProfileDataLoader;

  constructor() {}

  static get deps() {
    return [
      "CartItem",
      "ProductVariant",
      "Profile",

      "ProductVariantDataLoader",
      "ProfileDataLoader",
    ];
  }

  cartItems = async (parent, args, context) => {
    const { profile } = args;

    const cartItems = await this.CartItem.find({
      profile,
    });

    return cartItems;
  };

  createCartItem = resolver(async (parent, args, context, info) => {
    const { profile, variant, quantity } = args.input;

    if (isNaN(quantity) || quantity <= 0) {
      throw createHttpError(400, "Quantity must be greater than 1.");
    }

    const existingItem = await this.CartItem.findOne({
      profile,
      variant,
    });

    if (existingItem) {
      // update existing item.
      const updatedItem = await this.CartItem.findOneAndUpdate(
        { profile, variant },
        { $inc: { quantity } },
        { new: true }
      );

      return {
        message: "Cart item updated.",
        cartItem: updatedItem,
      };
    }

    const result = await this.CartItem.create({
      profile,
      variant,
      quantity,
    });

    return {
      message: "Cart item added.",
      cartItem: result,
    };
  });

  updateCartItem = resolver(async (parent, args, context, info) => {
    const { quantity } = args.input;
    const { id } = args;

    if (isNaN(quantity) || quantity <= 0) {
      throw createHttpError(400, "Quantity must be greater than 1.");
    }

    const result = await this.CartItem.findByIdAndUpdate(
      id,
      {
        quantity,
      },
      { new: true }
    );

    if (!result) {
      throw createHttpError(404, "Cart item not found");
    }

    return {
      message: "Cart item updated.",
      cartItem: result,
    };
  });

  deleteCartItem = resolver(async (parent, args, context, info) => {
    const { id } = args;

    const result = await this.CartItem.findByIdAndDelete(id);

    if (!result) {
      throw createHttpError(404, "Cart item not found");
    }

    return {
      message: "Cart item deleted.",
    };
  });

  CartItem_total = async (parent, args, context) => {
    const variant = await this.ProductVariantDataLoader.load(parent.variant);
    let { quantity } = parent;

    const price = new Decimal(variant.price);
    const q = new Decimal(quantity);
    const total = price.mul(q);

    return total.toFixed(2, Decimal.ROUND_UP);
  };

  CartItem_variant = async (parent, args, context) => {
    const result = await this.ProductVariantDataLoader.load(parent.variant);
    return result;
  };

  CartItem_profile = async (parent, args, context) => {
    const result = await this.ProfileDataLoader.load(parent.profile);
    return result;
  };

  getResolvers = () => {
    return {
      Query: {
        cartItems: this.cartItems,
      },
      Mutation: {
        createCartItem: this.createCartItem,
        updateCartItem: this.updateCartItem,
        deleteCartItem: this.deleteCartItem,
      },
      CartItem: {
        total: this.CartItem_total,
        variant: this.CartItem_variant,
        profile: this.CartItem_profile,
      },
    };
  };
}
