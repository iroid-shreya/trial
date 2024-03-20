import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const Product = mongoose.model("products", productSchema);

export default Product;
