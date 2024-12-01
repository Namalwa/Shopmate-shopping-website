import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { registerUser } from "./controllers/users.controllers.js";
import { logginUsers } from "./controllers/auth.controllers.js";
import {
  createProduct,
  fetchAllProducts,
  fetchSingleProduct,
  getUserProducts,
  updateProduct,
  deleteProduct,
  getProfile,
  updateProfile,
  addToCart,
  getCart,
} from "./controllers/products.controllers.js";
import validateUserInformation from "./middleware/validateUserInformation.js";
import verifyToken from "./middleware/verifyToken.js";

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());

const upload = multer({ dest: "uploads/" });

app.post("/users", validateUserInformation, registerUser);
app.post("/auth/login", logginUsers);
app.post("/products", upload.single("image"), verifyToken, createProduct);
app.get("/products/user", verifyToken, getUserProducts);
app.get("/products/:id", fetchSingleProduct);
app.get("/products", fetchAllProducts);
app.delete("/products/:productId", deleteProduct);
app.put("/products/:id", verifyToken, updateProduct);
app.get("/profile/user", verifyToken, getProfile);
app.put("/profile/user", verifyToken, updateProfile);
app.post("/cart", verifyToken, addToCart);
app.get("/cart", verifyToken, getCart);





app.listen(4000, () => {
  console.log("Server running on port 4000...");
});
