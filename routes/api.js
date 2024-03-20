import express from "express";
const router = express.Router();
import authRoutes from "../src/auth/auth.routes";
import productRoutes from "../src/product/product.routes";
import authenticateUser from "../src/common/middleware/authenticate-user";

router.use("/auth", authRoutes);
router.use("/product", authenticateUser, productRoutes);

export default router;
