import { resolver } from "../../lib/graphql.js";

export class ProductResolver{
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
    
    constructor(Product,ProductVariant,ProductPosting , Profile, User){
        this.Product = Product;
        this.ProductVariant= ProductVariant;
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

            variants
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
        
        for(const variant of variants) {
            const result = await this.ProductVariant.create({
                ...variant,
                product: product._id
            });
        }

        console.log(product);

        const productObject = await product.toObject();


        return {
            message: "Product created successfully",
            product: productObject,
        }
    });

    _ProductVariant = async (parent, args, context) => {
        const variants = await this.ProductVariant.find({
            product: parent._id
        });

        return variants.map(x => x.toObject());
    }

    getResolvers = () => {
        return {
            Mutation: {
                createProduct: this.createProduct
            },
            Product: {
                variants: this._ProductVariant
            }
        };
    }
}