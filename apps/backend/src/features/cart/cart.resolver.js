import createHttpError from "http-errors";
import { resolver } from "../../lib/graphql.js";

export class CartResolver{
    /** @type {import("mongoose").Model} */
    CartItem;
    /** @type {import("mongoose").Model} */
    ProductVariant;

    constructor(CartItem, ProductVariant){
        this.CartItem = CartItem;
        this.ProductVariant = ProductVariant;
    }
    static get deps(){
        return["CartItem", "ProductVariant"];
    }
    creatCartItem= resolver(async (parent,args,context,info)=>{
        const {
            profile,
            variant,
            quantity,
        } = args.input;

        const result = await this.CartItem.create({
            profile,
            variant,
            quantity
        });

        return {
            message: "Cart item added.",
            cartItem: result
        }
    })

    CartItem_total = async (parent, args, context) => {
        const variant = await this.ProductVariant.findById(parent.variant);
        const { quantity } = parent;

        const total = Number(variant.price) * Number(quantity);
        return total.toFixed(2);
    }

    getResolvers = ()=>{
        return {
            Mutation : {
                createCartItem : this.creatCartItem
            },
            CartItem: {
                total: this.CartItem_total
            }
        }
    }
}