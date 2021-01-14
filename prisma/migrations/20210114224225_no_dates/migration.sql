/*
  Warnings:

  - You are about to drop the column `date` on the `pin` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `ride` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `ride` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[email]` on the table `user`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE `pin` DROP COLUMN `date`;

-- AlterTable
ALTER TABLE `ride` DROP COLUMN `start_date`,
    DROP COLUMN `end_date`;

-- CreateIndex
CREATE UNIQUE INDEX `user.email_unique` ON `user`(`email`);
