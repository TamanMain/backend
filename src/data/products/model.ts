import mongoose from "mongoose";

interface ProductDocument extends mongoose.Document {
  seller: string;
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
}

const productSchema = new mongoose.Schema({
  seller: { type: String, required: false },
  name: { type: String, required: true },
  categories: { type: Array, required: false },
  availability: { type: Boolean, required: false },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  images: { type: Array, required: false },
  isDiscount: { type: Boolean, required: false },
  actualPrice: { type: Number, required: false },
  discount: { type: Number, required: false },
  stocks: { type: Number, required: false },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: false },
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
export { ProductDocument };
