/*
  Warnings:

  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedPassword]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `admin` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."admin_password_key";

-- AlterTable
ALTER TABLE "public"."admin" DROP COLUMN "password",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "admin_hashedPassword_key" ON "public"."admin"("hashedPassword");
