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

    console.log(product);

    const productObject = await product.toObject();

    return {
      message: "Product created successfully",
      product: productObject,
    };
  });

  Product_variants = async (parent, args, context) => {
    const variants = await this.ProductVariant.find({
      product: parent._id,
    });

    return variants.map((x) => x.toObject());
  };

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
        createProductPosting: this.createProductPosting,
      },
      Product: {
        variants: this.Product_variants,
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
