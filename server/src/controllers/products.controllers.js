import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createProduct(req, res) {
  try {
    const { title, description, price, imageUrl, category, productType } =
      req.body;

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

export async function getUserProducts(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    const products = await prisma.product.findMany({
      where: {
        createdById: userId,
      },
    });

    res.status(200).json(products);
  } catch (e) {
    console.error("Error fetching products:", e.message);
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later" });
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { title, description, price, imageUrl, category, productType } =
      req.body;

    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: { title, description, price, imageUrl, category, productType },
    });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { productId } = req.params;

    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function getProfile(req, res) {
  console.log("Request User ID:", req.userId);

  if (!req.userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const userProfile = await prisma.user.findUnique({
      where: { id: req.userId },
    });

    if (!userProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(userProfile);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching profile", error: err.message });
  }
}

export async function updateProfile(req, res) {
  console.log("Request User ID:", req.userId);

  if (!req.userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  const { firstname, lastname, email } = req.body;

  try {
    if (!firstname || !lastname || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        firstname,
        lastname,
        email,
      },
    });

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error updating profile:", err);

    if (err.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(500)
      .json({ message: "Error updating profile", error: err.message });
  }
}


export async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cart.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
      return res.status(200).json(updatedCartItem);
    } else {
      const newCartItem = await prisma.cart.create({
        data: {
          userId,
          productId,
          quantity,
          createdById: userId,
        },
        include: {
          product: true, 
        },
      });
      return res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({ message: "Error adding product to cart", error: error.message });
  }
}


export async function getCart(req, res) {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cartItems = await prisma.cart.findMany({
      where: {
        userId,
      },
      include: {
        product: {
          select: {
            title: true,
            description: true,
            price: true,
            imageUrl: true,
          },
        },
      },
    });

    if (cartItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
}





// controllers/products.controller.js


// Controller for handling the checkout process
export async function checkout(req, res) {
  const userId = req.userId;
  const { items } = req.body;

  try {
    // Here you can handle the checkout process, e.g., creating an order, processing payment, etc.
    // For simplicity, we'll just log the items and user ID

    console.log("Checkout items:", items);
    console.log("User ID:", userId);

    // Clear cart items for the user
    await prisma.cart.deleteMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ message: "Failed to checkout" });
  }
}

