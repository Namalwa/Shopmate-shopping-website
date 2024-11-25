import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { registerUser } from "./controllers/users.controllers.js";
import { logginUsers } from "./controllers/auth.controllers.js";
import { createProduct } from "./controllers/products.controllers.js";
import validateUserInformation from "./middleware/validateUserInformation.js";
import verifyToken from "./middleware/verifyToken.js";

dotenv.config();

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], credentials: true }));
app.use(cookieParser());

const upload = multer({ dest: "uploads/" });

app.post("/users", validateUserInformation, registerUser);
app.post("/auth/login", logginUsers);

app.post("/products", upload.single("image"), verifyToken, createProduct);

app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        createdBy: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

app.listen(4000, () => {
  console.log("Server running on port 4000...");
});
