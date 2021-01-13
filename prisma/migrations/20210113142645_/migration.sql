/*
  Warnings:

  - You are about to alter the column `start_coord` on the `ride` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- AlterTable
ALTER TABLE `ride` MODIFY `start_coord` JSON NOT NULL;
