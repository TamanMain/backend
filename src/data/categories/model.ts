import mongoose from "mongoose";

interface CategoryDocument extends mongoose.Document {
  name: string;
  displayName: string;
  icon: string;
  active: boolean;
  description?: string;
}

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  icon: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  description: { type: String },
});

const Category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default Category;
export { CategoryDocument };
