import { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";
import { assertDirective } from "graphql";

const nonNullNonEmptyArray = (message) => {
  return {
    validator: function (arr) {
      return Array.isArray(arr) && arr.length > 0;
    },
    message: message || "array must be a non-empty array",
  };
};

export const createBrandModel = ({ db }) => {
  const BrandSchema = new Schema({
    name: { type: String, required: true },
  });

  const Brand = db.model("Brand", BrandSchema);
  return Brand;
};

export const createBrandDataLoader = ({ Brand }) => {
  return createFindDataLoader(Brand);
};

export const createCategoryModel = ({ db }) => {
  const CategorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "Category" },
  });

  const Category = db.model("Category", CategorySchema);
  return Category;
};

export const createCategoryDataLoader = ({ Category }) => {
  return createFindDataLoader(Category);
};

export const createProductModel = ({ db }) => {
  const ProductSchema = new Schema(
    {
      name: { type: String, required: true, trim: true },
      description: { type: String, required: true, trim: true },
      images: {
        type: [{ type: Schema.Types.ObjectId, ref: "File" }],
        required: true,
        validate: nonNullNonEmptyArray("images must a non-empty array of IDs"),
      },
      sku: { type: String },
      features: {
        type: [
          {
            type: Object,
          },
        ],
        required: true,
        validate: nonNullNonEmptyArray(
          "features must a non-empty array of objects"
        ),
      },
      price: { type: String, required: true },
      brand: { type: Types.ObjectId, ref: "Brand" },
      category: { type: Types.ObjectId, ref: "Category" },
    },
    { timestamps: true }
  );

  ProductSchema.virtual("variants", {
    ref: "ProductVariant",
    localField: "_id",
    foreignField: "product",
  });

  const Product = db.model("Product", ProductSchema);
  return Product;
};

export const createProductDataLoader = ({ Product }) => {
  return createFindDataLoader(Product);
};

export const createProductVariantModel = ({ db }) => {
  const ProductVariantSchema = new Schema({
    product: { type: Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    type: { type: String },
    images: [{ type: Schema.Types.ObjectId, ref: "File" }],
    sku: { type: String },
    features: [
      {
        type: Object,
      },
    ],
    price: { type: String },
  });
  const Variant = db.model("ProductVariant", ProductVariantSchema);
  return Variant;
};

export const createProductVariantDataLoader = ({ ProductVariant }) => {
  return createFindDataLoader(ProductVariant);
};

export const createProductPosting = ({ db }) => {
  const ProductPostingSchema = new Schema({
    variant: { type: Types.ObjectId, ref: "Product", required: true },
    seller: { type: Types.ObjectId, ref: "Profile", required: true },
    price: { type: String, required: true },
  });
  const ProductPosting = db.model("ProductPosting", ProductPostingSchema);
  return ProductPosting;
};

export const createProductPostingDataLoader = ({ ProductPosting }) => {
  return createFindDataLoader(ProductPosting);
};
