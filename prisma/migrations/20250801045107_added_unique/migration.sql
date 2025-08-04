/*
  Warnings:

  - A unique constraint covering the columns `[activation_link]` on the table `customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_activation_link_key" ON "public"."customer"("activation_link");
