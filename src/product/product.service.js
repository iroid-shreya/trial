import Product from "../../model/product";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

class ProductService {
  static async index(authUser, reqData) {
    const currentPage = reqData.page || 1;
    const perPage = reqData.perPage || 25;
    const skip = +((currentPage - 1) * perPage);
    const limit = +perPage;
    const search = reqData.search ? reqData.search : '';

    const pipline = [
      {
        $match: {
          userId: new ObjectId(authUser._id),
          name: { $regex: search, $options: "i" },
        },
      },
    ];
    const total = await Product.aggregate(pipline);
    const products = await Product.aggregate([
      ...pipline,
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    return {
      data: products,
      meta: {
        total: total.length,
        get latPage() {
          return this.total ? Math.ceil(+this.total / this.perPage) : 0;
        },
        perPage: +perPage,
        currentPage: +currentPage,
      },
    };
  }
  static async create(authUser, reqData) {
    if (
      await Product.findOne({
        name: reqData.name,
        userId: authUser._id,
      })
    ) {
      return { message: "Product already exist", status: 409 };
    } else {
      reqData.userId = authUser._id;
      await Product.create(reqData);

      return { message: "Product added", status: 200 };
    }
  }

  static async update(authUser, id, reqData) {
    if (await Product.findOne({ _id: id })) {
      await Product.updateOne({ _id: id }, reqData);

      return { message: "Product updated", status: 200 };
    } else {
      return { message: "Product not found", status: 404 };
    }
  }
}

export default ProductService;
