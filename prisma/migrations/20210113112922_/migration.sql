-- CreateTable
CREATE TABLE `pin` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `media` VARCHAR(191) NOT NULL,
    `media_type` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `coord` VARCHAR(191) NOT NULL,
    `id_ride` INT NOT NULL,
INDEX `pin_ride_FK`(`id_ride`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ride` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `start_coord` VARCHAR(191) NOT NULL,
    `id_user` INT NOT NULL,
INDEX `ride_user_FK`(`id_user`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pin` ADD FOREIGN KEY (`id_ride`) REFERENCES `ride`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ride` ADD FOREIGN KEY (`id_user`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
