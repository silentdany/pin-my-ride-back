/*
  Warnings:

  - You are about to alter the column `coord` on the `pin` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- AlterTable
ALTER TABLE `pin` MODIFY `coord` JSON NOT NULL;
