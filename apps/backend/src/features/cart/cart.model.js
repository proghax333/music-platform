import { Schema, Types } from "mongoose";

export const createCartItemModel = ({ db }) => {
  const CartItemSchema = new Schema({
    profile: { type: Types.ObjectId, ref: "Profile" },
    variant: { type: Types.ObjectId, ref: "ProductVariant" },
    quantity: { type: Number },
  });
  const cartItem = db.model("CartItem", CartItemSchema);
  return cartItem;
};
