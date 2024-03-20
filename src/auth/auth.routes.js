import express from "express";
import asyncHandler from "express-async-handler";
import AuthController from "./auth.controller";
import storeFile from "../common/middleware/storeFile";
import validator from "../common/config/joi-validation";
import registerDto from "./dtos/register.dto";
import loginDto from "./dtos/login.dto";
// const upload = multer();

const router = express.Router();

const registerFields = [
  { name: "profile", destination: "mediaData/profile", maxCounts: 1 },
  { name: "images", destination: "mediaData/other", maxCounts: 5 },
];
router.post(
  "/register",
  asyncHandler(storeFile(registerFields)),
  validator.body(registerDto),
  asyncHandler(AuthController.register)
);

router.post(
  "/login",
  validator.body(loginDto),
  asyncHandler(AuthController.login)
);

export default router;
