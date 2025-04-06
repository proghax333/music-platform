import { Schema , Types } from "mongoose";

const nonNullNonEmptyArray = (message) => {
    return {
        validator: function(arr) {
            return Array.isArray(arr) && arr.length > 0;
        },
        message: message || "array must be a non-empty array",
    };
}

export const createProductModel = ({db}) =>{

    const ProductSchema = new Schema(
        {
            name :{ type : String , required : true , trim : true },
            description : {type : String , required : true, trim : true},
            images : {
                type: [
                    {
                        id : {type:String},
                        url : {type : String , required : true}
                    }
                ],
                required: true,
                validate: nonNullNonEmptyArray("images must a non-empty array of objects")
            },
            sku : {type: String },
            features : {
                type: [
                    {
                        type: Object
                    }
                ],
                required: true,
                validate: nonNullNonEmptyArray("features must a non-empty array of objects")
            },
            price : {type: String , required :true},
        },
        {timestamps:true}
    );

    ProductSchema.virtual('variants', {
        ref: 'ProductVariant',
        localField: '_id',
        foreignField: 'product',
    });

    const Product = db.model("Product" , ProductSchema);
    return Product; 


}

export const createProductVariantModel = ({db})=>{
    const ProductVariantSchema = new Schema (
        {
            product: { type: Types.ObjectId, ref: "Product", required: true },
            name :{ type : String , required : true , trim : true },
            description : {type : String , required : true, trim : true},
            type : {type : String},
            images : [
                {
                    id : {type:String },
                    url : {type : String , required : true}
                }
            ],
            sku : {type: String },
            features : [
                {
                    type: Object
                }
            ],
            price : {type: String },
            
        }

    );
const Variant = db.model("ProductVariant", ProductVariantSchema);
return Variant;

        }


export const createProductPosting =({db})=>{
  const ProductPostingSchema = new Schema ({
    variant: { type: Types.ObjectId, ref: "Product", required: true },
    seller: { type: Types.ObjectId, ref: "Profile", required: true },
    price : {type: String, required :true}           
  }
);
const ProductPosting = db.model("ProductPosting", ProductPostingSchema);
return ProductPosting;

}