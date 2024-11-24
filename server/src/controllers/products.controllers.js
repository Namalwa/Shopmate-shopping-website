import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    const { title, description, price, imageUrl, category, productType } = req.body;

    const userId = req.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        category,
        productType,
        createdById: userId,
      },
    });

    res.status(201).json(newProduct);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: e.message });
  }
}



export async function fetchAllProducts(req, res) {
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
}

export async function fetchSingleProduct(req, res) {
  try {
    const { id } = req.params;

    console.log("Fetching product with ID:", id);

    if (!id) {
      return res.status(400).json({ message: "Product ID is required!" });
    }

    
    const product = await prisma.product.findUnique({
      where: { id },
   
      include: { createdBy: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
}







   
    
