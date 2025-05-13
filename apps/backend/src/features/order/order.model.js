import mongoose, { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

const OrderItemSchema = new Schema({
  sku: String,
  name: String,
  seller: Object,
  productPosting: { type: Schema.Types.ObjectId, ref: "ProductPosting" },
  price: String,
  quantity: Number,
  total: String,
});

const Order_offerSchema = new Schema({
  type: String,
  name: String,
  code: String,
  discount: String,
});

const OrderDetails_addressSchema = new Schema({
  line1: String,
  line2: String,
  lines: [String],
  landmark: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
});

const OrderDetailsSchema = new Schema({
  billingAddress: OrderDetails_addressSchema,
  shippingAddress: OrderDetails_addressSchema,
  contacts: [String],
});

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createOrderModel = ({ db }) => {
  const OrderSchema = new Schema(
    {
      profile: { type: Schema.Types.ObjectId, ref: "Profile" },
      details: OrderDetailsSchema,
      items: [OrderItemSchema],
      offers: [Order_offerSchema],
      total: String,
      status: String,
    },
    { timestamps: true }
  );

  return db.model("Order", OrderSchema);
};

/**
 * @param {{ Order: mongoose.Model }} params
 */
export const createOrderDataLoader = ({ Order }) => {
  return createFindDataLoader(Order);
};
