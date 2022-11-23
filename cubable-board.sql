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

-- Dumping structure for table cubable_board_test.tbl_board
CREATE TABLE IF NOT EXISTS `tbl_board` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `numberOfRows` int DEFAULT '0',
  `colorId` int DEFAULT NULL,
  `isPin` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_test.tbl_board: ~0 rows (approximately)

-- Dumping structure for table cubable_board_test.tbl_board_item
CREATE TABLE IF NOT EXISTS `tbl_board_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `boardId` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Unnamed',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `uniqueCode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statusId` int DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isLock` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `url` (`url`),
  KEY `FK_tbl_board_item_tbl_board` (`boardId`),
  CONSTRAINT `FK_tbl_board_item_tbl_board` FOREIGN KEY (`boardId`) REFERENCES `tbl_board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_test.tbl_board_item: ~0 rows (approximately)

-- Dumping structure for table cubable_board_test.tbl_board_item_field
CREATE TABLE IF NOT EXISTS `tbl_board_item_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `boardItemId` int DEFAULT NULL,
  `fieldId` int DEFAULT NULL,
  `isHidden` enum('Y','N') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  `isCustom` enum('Y','N') COLLATE utf8mb4_unicode_ci DEFAULT 'N',
  PRIMARY KEY (`id`),
  KEY `FK_tbl_board_item_field_tbl_board_item` (`boardItemId`),
  KEY `FK_tbl_board_item_field_tbl_field` (`fieldId`),
  CONSTRAINT `FK_tbl_board_item_field_tbl_board_item` FOREIGN KEY (`boardItemId`) REFERENCES `tbl_board_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_tbl_board_item_field_tbl_field` FOREIGN KEY (`fieldId`) REFERENCES `tbl_field` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_test.tbl_board_item_field: ~0 rows (approximately)

-- Dumping structure for table cubable_board_test.tbl_field
CREATE TABLE IF NOT EXISTS `tbl_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fieldTypeId` int DEFAULT NULL,
  `boardId` int DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_tbl_field_tbl_board` (`boardId`),
  KEY `FK__tbl_field_type` (`fieldTypeId`) USING BTREE,
  CONSTRAINT `FK__tbl_field_type` FOREIGN KEY (`fieldTypeId`) REFERENCES `tbl_field_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_tbl_field_tbl_board` FOREIGN KEY (`boardId`) REFERENCES `tbl_board` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_test.tbl_field: ~0 rows (approximately)

-- Dumping structure for table cubable_board_test.tbl_field_type
CREATE TABLE IF NOT EXISTS `tbl_field_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iconUrl` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table cubable_board_test.tbl_field_type: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
