-- CreateTable
CREATE TABLE `Token` (
    `jti` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `session_id` VARCHAR(191) NOT NULL,
    `type` ENUM('Access', 'Refresh') NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `not_before` DATETIME(3) NOT NULL,
    `issued_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`jti`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `user_token_fk` FOREIGN KEY (`subject`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `session_token_fk` FOREIGN KEY (`session_id`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
