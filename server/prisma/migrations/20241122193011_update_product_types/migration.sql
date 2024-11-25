/*
  Warnings:

  - Added the required column `category` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ACCESSORIES', 'BEAUTY', 'KIDS', 'MEN', 'WOMEN');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('BAGS', 'JEWELRY', 'STOCKINGS', 'MAKEUP', 'LOTION', 'SERUM', 'KIDS_SHOES', 'KIDS_DRESSES', 'KIDS_TOYS', 'MEN_SHOES', 'MEN_SHIRTS', 'WOMEN_SHOES', 'WOMEN_DRESSES');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "productType" "ProductType" NOT NULL;
