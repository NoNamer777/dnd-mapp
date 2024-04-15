-- CreateTable
CREATE TABLE `Skill` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `ability_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `unique_skill_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `ability_skill_fk` FOREIGN KEY (`ability_id`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
