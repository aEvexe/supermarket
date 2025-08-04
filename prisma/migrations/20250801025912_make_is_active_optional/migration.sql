-- AlterTable
ALTER TABLE "public"."customer" ALTER COLUMN "is_active" DROP NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT false;
