// import { PrismaClient } from "@prisma/client";
// const client = new PrismaClient();

// function validateProduct(req, res, next) {
//   const { title, price, description, category,productType, image } = req.body;

//   if (!title)
//     return res.status(400).json({ message: "Product name is required" });
//   if (!price)
//     return res.status(400).json({ message: "Product price is required" });
//   if (!description)
//     return res.status(400).json({ message: "Product description is required" });
//   if (!category)
//     return res.status(400).json({ message: "Product category is required" });
//   if (!productType)
//     return res.status(400).json({ message: "Product type is required" });

//   if (price <= 0)
//     return res
//       .status(400)
//       .json({ message: "Product price must be greater than 0" });

//   if (image && !isValidImageUrl(image)) {
//     return res.status(400).json({ message: "Invalid image URL or format" });
//   }

//   next();
// }

// function isValidImageUrl(url) {
//   return /\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
// }

// export default validateProduct;
// import { PrismaClient } from "@prisma/client";
// const client = new PrismaClient();

// function validateProduct(req, res, next) {
//   const { title, price, description, category, productType, imageUrl } = req.body;

//   if (!title) {
//     return res.status(400).json({ message: "Product name is required" });
//   }
//   if (!price) {
//     return res.status(400).json({ message: "Product price is required" });
//   }
//   if (price <= 0) {
//     return res.status(400).json({ message: "Product price must be greater than 0" });
//   }
//   if (!description) {
//     return res.status(400).json({ message: "Product description is required" });
//   }
//   if (!category) {
//     return res.status(400).json({ message: "Product category is required" });
//   }
//   if (!productType) {
//     return res.status(400).json({ message: "Product type is required" });
//   }

//   // Validate imageUrl only if it is provided
//   if (imageUrl && !isValidImageUrl(imageUrl)) {
//     return res.status(400).json({ message: "Invalid image URL or format" });
//   }

//   next();
// }

// // Improved image URL validation
// function isValidImageUrl(url) {
//   // Check for valid image file extension and ensure it's a URL format
//   return /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/i.test(url);
// }

// export default validateProduct;
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

function validateProduct(req, res, next) {
  const { title, price, description, category, productType, imageUrl } = req.body;

  // Validate product title
  if (!title) {
    return res.status(400).json({ message: "Product name is required" });
  }

  // Validate product price
  if (!price) {
    return res.status(400).json({ message: "Product price is required" });
  }

  if (price <= 0) {
    return res.status(400).json({ message: "Product price must be greater than 0" });
  }

  // Validate product description
  if (!description) {
    return res.status(400).json({ message: "Product description is required" });
  }

  // Validate product category
  if (!category) {
    return res.status(400).json({ message: "Product category is required" });
  }

  // Validate product type
  if (!productType) {
    return res.status(400).json({ message: "Product type is required" });
  }

  // Validate image URL (only if it is provided)
  if (imageUrl && !isValidImageUrl(imageUrl)) {
    return res.status(400).json({ message: "Invalid image URL or format" });
  }

  // If all validations pass, move to the next middleware
  next();
}

// Improved image URL validation function
function isValidImageUrl(url) {
  // Regex to check for valid image URL with common image file extensions
  const imageUrlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/i;
  return imageUrlPattern.test(url);
}

export default validateProduct;
 