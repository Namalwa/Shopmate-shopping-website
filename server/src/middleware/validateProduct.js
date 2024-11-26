import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

function validateProduct(req, res, next) {
  const { title, price, description, category, productType, imageUrl } = req.body;


  if (!title) {
    return res.status(400).json({ message: "Product name is required" });
  }

  if (!price) {
    return res.status(400).json({ message: "Product price is required" });
  }

  if (price <= 0) {
    return res.status(400).json({ message: "Product price must be greater than 0" });
  }

  
  if (!description) {
    return res.status(400).json({ message: "Product description is required" });
  }


  if (!category) {
    return res.status(400).json({ message: "Product category is required" });
  }

 
  if (!productType) {
    return res.status(400).json({ message: "Product type is required" });
  }

  
  if (imageUrl && !isValidImageUrl(imageUrl)) {
    return res.status(400).json({ message: "Invalid image URL or format" });
  }

  
  next();
}


function isValidImageUrl(url) {

  const imageUrlPattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/i;
  return imageUrlPattern.test(url);
}

export default validateProduct;
 