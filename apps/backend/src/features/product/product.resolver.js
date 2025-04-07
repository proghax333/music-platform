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

        const productObject = await product.tedoObject();


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

    createProductPosting = resolver(async (parent, args, context , info)=>{
        const{
            variant,
            seller,
            price
        } = args.input;

        const productPosting = await this.ProductPosting.create({
            variant,
            seller,
            price
        });

        const productPostingObject = await productPosting.tedoObject();

        return{
            message: "Product has been posted",
            productPosting: productPostingObject
        }
    })


    getResolvers = () => {
        return {
            Mutation: {
                createProduct: this.createProduct,
                createProductPosting: this.createProductPosting

            },
            Product: {
                variants: this._ProductVariant
            }
        };
    }



}


