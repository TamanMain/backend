import mongoose, { Schema } from "mongoose";

interface ProductDocument extends mongoose.Document {
  seller: string;
  sellerId: string;
  name: string;
  categories: string[];
  availability: boolean;
  price: number;
  thumbnail: string;
  images: string[];
  isDiscount: boolean;
  actualPrice: number;
  discount: number;
  stocks: number;
  quantity: number;
  unit: string;
  description: string;
  statistics: {
    created_at?: Date;
    expired_at?: Date;
    views: number;
    favorites?: number;
  };
}

const productSchema = new Schema({
  seller: { type: String, required: true },
  sellerId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  categories: { type: Array },
  availability: { type: Boolean, required: true, default: false },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  images: { type: Array, required: true },
  isDiscount: { type: Boolean },
  actualPrice: { type: Number },
  discount: { type: Number },
  stocks: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: false },
  statistics: {
    created_at: { type: Date, default: new Date() },
    expired_at: { type: Date },
    views: { type: Number, required: true, default: 0 },
    favorites: { type: Number, default: 0 },
  },
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
export { ProductDocument };
