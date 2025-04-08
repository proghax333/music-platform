import createHttpError from "http-errors";
import { resolver } from "../../lib/graphql.js";

export class ProductResolver {
  /** @type {import("mongoose").Model} */
  Product;
  /** @type {import("mongoose").Model} */
  ProductVariant;
  /** @type {import("mongoose").Model} */
  ProductPosting;
  /** @type {import("mongoose").Model} */
  Profile;
  /** @type {import("mongoose").Model} */
  User;

  constructor(Product, ProductVariant, ProductPosting, Profile, User) {
    this.Product = Product;
    this.ProductVariant = ProductVariant;
    this.ProductPosting = ProductPosting;
    this.Profile = Profile;
    this.User = User;
  }

  static get deps() {
    return ["Product", "ProductVariant", "ProductPosting", "Profile", "User"];
  }

  createProduct = resolver(async (parent, args, context, info) => {
    const {
      name,
      description,
      images,
      sku,
      features,
      price,

      variants,
    } = args.input;

    console.log(args.input);

    const product = await this.Product.create({
      name,
      description,
      images,
      sku,
      features,
      price,
    });

    for (const variant of variants) {
      const result = await this.ProductVariant.create({
        ...variant,
        product: product._id,
      });
    }

    const productObject = await product.toObject();

    return {
      message: "Product created successfully",
      product: productObject,
    };
  });

  updateProduct = resolver(async (parent, args, context, info) => {
    const { id } = args.input;
    const { variants, ...newData } = args.input;

    const updatedProduct = await this.Product.findByIdAndUpdate(id, newData, {
      new: true,
    });

    for (const variant of variants) {
      const result = await this.ProductVariant.findByIdAndUpdate(
        variant._id,
        variant,
        {
          new: true,
        }
      );
      if (!result) {
        throw createHttpError(404, "Product variant not found.");
      }
    }

    const productObject = await this.Product.findById(id);

    return {
      message: "Product updated successfully",
      product: productObject,
    };
  });

  deleteProduct = resolver(async (parent, args, context, info) => {
    const { id } = args.input;

    const result = await this.Product.findByIdAndDelete(id);
    if (!result) {
      throw createHttpError(404, "Product not found.");
    }

    return {
      message: "Product deleted successfully",
    };
  });

  createProductVariant = resolver(async (parent, args, context, info) => {
    const { name, description, type, images, sku, features, price, product } =
      args.input;

    const productVariant = await this.ProductVariant.create({
      name,
      description,
      type,
      images,
      features,
      sku,
      price,
      product,
    });

    const productVariantObject = await productVariant.toObject();

    return {
      message: "Product variant created successfully",
      productVariant: productVariantObject,
    };
  });

  updateProductVariant = resolver(async (parent, args, context, info) => {
    const { id } = args.input;
    const updatedProductVariant = await this.ProductVariant.findByIdAndUpdate(
      id,
      args.input,
      {
        new: true,
      }
    );

    if (!updatedProductVariant) {
      throw createHttpError(404, "Product variant not found.");
    }

    return {
      message: "Product variant updated successfully",
      productVariant: updatedProductVariant.toObject(),
    };
  });

  deleteProductVariant = resolver(async (parent, args, context, info) => {
    const { id } = args.input;

    const result = await this.ProductVariant.findByIdAndDelete(id);

    if (!result) {
      throw createHttpError(404, "Product variant not found.");
    }

    return {
      message: "Product variant deleted",
    };
  });

  createProductPosting = resolver(async (parent, args, context, info) => {
    const { variant, seller, price } = args.input;

    const productPosting = await this.ProductPosting.create({
      variant,
      seller,
      price,
    });

    const productPostingObject = await productPosting.toObject();

    return {
      message: "Product has been posted",
      productPosting: productPostingObject,
    };
  });

  updateProductPosting = resolver(async (parent, args, context, info) => {
    const { id } = args.input;

    const updatedProductPosting = await this.ProductPosting.findByIdAndUpdate(
      id,
      args.input,
      {
        new: true,
      }
    );

    if (!updatedProductPosting) {
      throw createHttpError(404, "Product posting not found.");
    }

    return {
      message: "Product posting has been updated",
      productPosting: updatedProductPosting.toObject(),
    };
  });

  deleteProductPosting = resolver(async (parent, args, context, info) => {
    const { id } = args.input;

    const result = await this.ProductPosting.findByIdAndDelete(id);

    if (!result) {
      throw createHttpError(404, "Product posting not found.");
    }

    return {
      message: "Product posting deleted successfully",
    };
  });

  Product_variants = async (parent, args, context) => {
    const variants = await this.ProductVariant.find({
      product: parent._id,
    });

    return variants.map((x) => x.toObject());
  };

  Product_productPostings = async (parent, args, context) => {
    const variants = await this.ProductVariant.find({
      product: parent._id,
    });

    const productPostings = await this.ProductPosting.find({
      variant: { $in: variants.map((x) => x._id) },
    });

    return productPostings.map((x) => x.toObject());
  };

  ProductPosting_variant = async (parent, args, context) => {
    const variant = await this.ProductVariant.findById(parent.variant);
    return variant.toObject();
  };

  ProductVariant_product = async (parent, args, context) => {
    const product = await this.Product.findById(parent.product);
    if (!product) {
      throw createHttpError(404, "Product not found.");
    }

    return product.toObject();
  };

  getResolvers = () => {
    return {
      Mutation: {
        createProduct: this.createProduct,
        updateProduct: this.updateProduct,
        deleteProduct: this.deleteProduct,

        createProductVariant: this.createProductVariant,
        updateProductVariant: this.updateProductVariant,
        deleteProductVariant: this.deleteProductVariant,

        createProductPosting: this.createProductPosting,
        updateProductPosting: this.updateProductPosting,
        deleteProductPosting: this.deleteProductPosting,

        createProductPosting: this.createProductPosting,
      },
      Product: {
        variants: this.Product_variants,
        productPostings: this.Product_productPostings,
      },
      ProductVariant: {
        product: this.ProductVariant_product,
      },
      ProductPosting: {
        variant: this.ProductPosting_variant,
      },
    };
  };
}
