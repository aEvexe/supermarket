/*
  Warnings:

  - Added the required column `is_approved` to the `manager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."manager" ADD COLUMN     "is_approved" BOOLEAN NOT NULL;
