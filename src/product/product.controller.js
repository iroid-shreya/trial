import Product from "../../model/product";
import ProductService from "./product.service";
class ProductController {
  static async index(req, res) {
    const { data, meta } = await ProductService.index(req.user, req.query);

    return res.send({ data, meta });
  }

  static async create(req, res) {
    const data = await ProductService.create(req.user, req.body);

    return res.status(data.status).send({ message: data.message });
  }

  static async update(req, res) {
    const data = await ProductService.update(req.user, req.params.id, req.body);
    return res.status(data.status).send({ message: data.message });
  }

  static async delete(req, res) {
    if (await Product.findOne({ _id: req.params.id })) {
      await Product.deleteOne({ _id: req.params.id });
    }

    return res.status(200).send({data : "product deleted successfully"});
  }
}

export default ProductController;
