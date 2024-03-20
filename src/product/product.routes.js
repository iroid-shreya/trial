import express from "express";
import asyncHandler from "express-async-handler";
import ProductController from "./product.controller";
import validator from "../common/config/joi-validation";
import addProductDto from "./dtos/add-product.dto";

const router = express.Router();

router.get("/", asyncHandler(ProductController.index));

router.post("/", validator.body(addProductDto),asyncHandler(ProductController.create));

router.put("/:id", asyncHandler(ProductController.update));
router.delete("/:id", asyncHandler(ProductController.delete));

export default router;
