import createHttpError from "http-errors";
import { resolver } from "../../lib/graphql.js";
import { paginate } from "../../lib/pagination.js";

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
  /** @type {import("mongoose").Model} */
  Brand;
  /** @type {import("mongoose").Model} */
  Category;
  /** @type {import("mongoose").Model} */
  Review;

  /** @type {import("mongoose").Connection} */
  db;

  /** @type {import("dataloader")} */
  ProductDataLoader;
  /** @type {import("dataloader")} */
  ProductVariantDataLoader;
  /** @type {import("dataloader")} */
  ProductPostingDataLoader;
  /** @type {import("dataloader")} */
  ProfileDataLoader;
  /** @type {import("dataloader")} */
  UserDataLoader;
  /** @type {import("dataloader")} */
  BrandDataLoader;
  /** @type {import("dataloader")} */
  CategoryDataLoader;

  constructor() {}

  static get deps() {
    return [
      "Product",
      "ProductVariant",
      "ProductPosting",
      "Profile",
      "User",
      "Brand",
      "Category",

      "db",

      "ProductDataLoader",
      "ProductVariantDataLoader",
      "ProductPostingDataLoader",
      "ProfileDataLoader",
      "UserDataLoader",
      "BrandDataLoader",
      "CategoryDataLoader",
    ];
  }

  products = async (parent, args, context) => {
    const pipeline = this.Product.aggregate();

    const productConnection = await paginate(pipeline, args);
    return productConnection;
  };

  brands = async (parent, args, context) => {
    const pipeline = this.Brand.aggregate();
    const brandConnection = await paginate(pipeline, {
      ...args,
      all: true,
    });

    return brandConnection;
  };

  categories = async (parent, args, context) => {
    const pipeline = this.Category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "parent",
          as: "children",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              {
                children: {
                  $map: {
                    input: "$children",
                    as: "child",
                    in: "$$child._id",
                  },
                },
              },
            ],
          },
        },
      },
    ]);
    const categoryConnection = await paginate(pipeline, {
      ...args,
    });
    return categoryConnection;
  };

  allCategories = async (parent, args, context) => {
    let categories = await this.Category.find();
    categories = categories.map((x) => x.toObject());

    const roots = [];

    const categoryMap = {};
    for (const category of categories) {
      const { _id } = category;
      delete category.__v;

      const parent = category.parent;
      let currentEntry = categoryMap[_id];
      if (currentEntry) {
        Object.assign(currentEntry, category);
      } else {
        category.children = [];
        currentEntry = categoryMap[_id] = category;
      }

      if (!parent) {
        roots.push(category);
      } else {
        let parentEntry = categoryMap[parent];

        if (!parentEntry) {
          parentEntry = categoryMap[parent] = {
            _id: parent,
            children: [],
          };
        }

        parentEntry.children.push(currentEntry);
      }
    }

    return roots;
  };

  createProduct = resolver(async (parent, args, context, info) => {
    const {
      name,
      description,
      images,
      sku,
      features,
      price,
      category,
      brand,

      variants,
    } = args.input;

    const product = await this.Product.create({
      name,
      description,
      images,
      sku,
      features,
      price,
      category,
      brand,
    });

    const variantDocs = variants.map((variant) => {
      return {
        ...variant,
        product: product._id,
      };
    });

    await this.ProductVariant.create(variantDocs);
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

  createCategory = resolver(async (_parent, args, context) => {
    const { name, parent } = args.input;

    const category = await this.Category.create({
      name,
      parent,
    });

    if (!category) {
      throw new Error("Could not create category.");
    }

    return {
      message: "Category created successfully.",
      category: category.toObject(),
    };
  });

  updateCategory = resolver(async (_parent, args, context) => {
    const { name, parent } = args.input;
    const { id } = args;

    const category = await this.Category.findById(id);

    if (!category) {
      throw createHttpError(404, "Category not found.");
    }

    Object.assign(category, {
      name,
      parent,
    });

    await category.save();

    return {
      message: "Category updated successfully.",
      category: category.toObject(),
    };
  });

  deleteCategory = resolver(async (_parent, args, context) => {
    const { id } = args;

    const category = await this.Category.findById(id);
    if (!category) {
      throw createHttpError(404, "Category not found.");
    }

    const result = await this.Category.deleteOne({ _id: id });
    if (result.deletedCount < 1) {
      throw createHttpError(500, "Could not delete the category.");
    }

    return {
      message: "Category deleted successfully.",
    };
  });

  createBrand = resolver(async (parent, args, context) => {
    try {
      const data = args.input;
      const brand = await this.Brand.create({ name: data.name });
      return {
        message: "Brand created.",
        brand,
      };
    } catch (error) {
      throw new Error(`Failed to create brand: ${error.message}`);
    }
  });

  updateBrand = resolver(async (parent, args, context) => {
    try {
      const data = args.input;
      const { id } = args;
      const brand = await this.Brand.findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true }
      );
      if (!brand) {
        throw createHttpError(404, "Brand not found");
      }
      return {
        message: "Brand updated.",
        brand,
      };
    } catch (error) {
      throw new Error(`Failed to update brand: ${error.message}`);
    }
  });

  deleteBrand = resolver(async (parent, args, context) => {
    try {
      const { id } = args;
      const brand = await this.Brand.findByIdAndDelete(id);
      if (!brand) {
        throw createHttpError(404, "Brand not found");
      }
      return { message: "Brand deleted successfully" };
    } catch (error) {
      throw new Error(`Failed to delete brand: ${error.message}`);
    }
  });

  Product_brand = async (parent, args, context) => {
    const brand = await this.BrandDataLoader.load(parent.brand);
    return brand;
  };

  Product_category = async (parent, args, context) => {
    const category = await this.CategoryDataLoader.load(parent.category);
    return category;
  };

  Product_variants = async (parent, args, context) => {
    const { before, after, first, last, sort } = args;

    const pipeline = this.ProductVariant.aggregate().match({
      product: parent._id,
    });

    const productVariantConnection = await paginate(pipeline, {
      before,
      after,
      first,
      last,
      sort,
    });

    return productVariantConnection;
  };

  Product_productPostings = async (parent, args, context) => {
    const variants = await this.ProductVariant.find({
      product: parent._id,
    });

    const pipeline = this.ProductPosting.aggregate().match({
      variant: { $in: variants.map((x) => x._id) },
    });

    const productPostingConnection = await paginate(pipeline, args);
    return productPostingConnection;
  };

  ProductPosting_variant = async (parent, args, context) => {
    const variant = await this.ProductVariantDataLoader.load(parent.variant);
    return variant.toObject();
  };

  ProductVariant_product = async (parent, args, context) => {
    const product = await this.ProductDataLoader.load(parent.product);
    if (!product) {
      throw createHttpError(404, "Product not found.");
    }

    return product;
  };

  Category_children = async (parent, args, context) => {
    const children = await this.Category.find({
      parent: parent._id,
    });

    return children;
  };

  getResolvers = () => {
    return {
      Query: {
        products: this.products,
        brands: this.brands,
        categories: this.categories,
        allCategories: this.allCategories,
      },
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

        createCategory: this.createCategory,
        updateCategory: this.updateCategory,
        deleteCategory: this.deleteCategory,

        createBrand: this.createBrand,
        updateBrand: this.updateBrand,
        deleteBrand: this.deleteBrand,
      },
      Category: {
        children: this.Category_children,
      },
      Product: {
        brand: this.Product_brand,
        category: this.Product_category,

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
