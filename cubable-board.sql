-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.31-0ubuntu0.22.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table cubable_board_dev.SequelizeMeta
CREATE TABLE IF NOT EXISTS `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table cubable_board_dev.SequelizeMeta: ~8 rows (approximately)
INSERT INTO `SequelizeMeta` (`name`) VALUES
	('20221123112604-create-board.js'),
	('20221123112747-create-board-item.js'),
	('20221123112903-create-board-item-field.js'),
	('20221123113024-create-field-type.js'),
	('20221123113156-create-field.js'),
	('20221123154929-add-association-board-item.js'),
	('20221123160434-add-association-field-type.js'),
	('20221123161000-add-association-board-item-field.js');

-- Dumping structure for table cubable_board_dev.tbl_board
CREATE TABLE IF NOT EXISTS `tbl_board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_dev.tbl_board: ~2 rows (approximately)
INSERT INTO `tbl_board` (`id`, `title`, `createdAt`, `updatedAt`) VALUES
	(1, 'Board 1', '2022-11-24 02:33:26', '2022-11-24 02:33:26'),
	(2, 'Board 2', '2022-11-24 02:33:26', '2022-11-24 02:33:26');

-- Dumping structure for table cubable_board_dev.tbl_board_item
CREATE TABLE IF NOT EXISTS `tbl_board_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `boardId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_board_item_boardId_foreign_idx` (`boardId`),
  CONSTRAINT `tbl_board_item_boardId_foreign_idx` FOREIGN KEY (`boardId`) REFERENCES `tbl_board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_dev.tbl_board_item: ~2 rows (approximately)
INSERT INTO `tbl_board_item` (`id`, `name`, `createdAt`, `updatedAt`, `boardId`) VALUES
	(1, 'Item 1', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 2),
	(2, 'Item 2', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 2);

-- Dumping structure for table cubable_board_dev.tbl_board_item_field
CREATE TABLE IF NOT EXISTS `tbl_board_item_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `boardItemId` int NOT NULL,
  `fieldId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_board_item_field_fieldId_foreign_idx` (`fieldId`),
  KEY `idx_boardItemId_fieldId` (`boardItemId`,`fieldId`),
  CONSTRAINT `tbl_board_item_field_boardItemId_foreign_idx` FOREIGN KEY (`boardItemId`) REFERENCES `tbl_board_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tbl_board_item_field_fieldId_foreign_idx` FOREIGN KEY (`fieldId`) REFERENCES `tbl_field` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_dev.tbl_board_item_field: ~4 rows (approximately)
INSERT INTO `tbl_board_item_field` (`id`, `value`, `createdAt`, `updatedAt`, `boardItemId`, `fieldId`) VALUES
	(1, 'demo b2-i1-f1', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 1, 1),
	(2, 'demo b2-i1-f2', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 1, 2),
	(3, 'demo b2-i2-f1', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 2, 1),
	(4, 'demo b2-i2-f2', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 2, 2);

-- Dumping structure for table cubable_board_dev.tbl_field
CREATE TABLE IF NOT EXISTS `tbl_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fieldTypeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tbl_field_fieldTypeId_foreign_idx` (`fieldTypeId`),
  CONSTRAINT `tbl_field_fieldTypeId_foreign_idx` FOREIGN KEY (`fieldTypeId`) REFERENCES `tbl_field_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_dev.tbl_field: ~2 rows (approximately)
INSERT INTO `tbl_field` (`id`, `name`, `createdAt`, `updatedAt`, `fieldTypeId`) VALUES
	(1, 'Field 1', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 1),
	(2, 'Field 2', '2022-11-24 02:33:26', '2022-11-24 02:33:26', 1);

-- Dumping structure for table cubable_board_dev.tbl_field_type
CREATE TABLE IF NOT EXISTS `tbl_field_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_dev.tbl_field_type: ~2 rows (approximately)
INSERT INTO `tbl_field_type` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Text', '2022-11-24 02:33:26', '2022-11-24 02:33:26'),
	(2, 'Checkbox', '2022-11-24 02:33:26', '2022-11-24 02:33:26');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
