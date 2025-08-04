/*
  Warnings:

  - You are about to drop the column `password` on the `manager` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `manager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `manager` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."admin_hashedPassword_key";

-- AlterTable
ALTER TABLE "public"."customer" ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ALTER COLUMN "hashedPassword" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."manager" DROP COLUMN "password",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedRefreshToken" TEXT,
ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "manager_email_key" ON "public"."manager"("email");
