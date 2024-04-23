CREATE TABLE `User` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(255) UNIQUE NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `address` int DEFAULT null,
  `phone_no` char(11) NOT NULL,
  `bio` text DEFAULT null
);

CREATE TABLE `Credential` (
  `user_id` int PRIMARY KEY,
  `email` varchar(255) UNIQUE NOT NULL COMMENT 'Kind of same as varchar',
  `pass_hash` varchar(255) NOT NULL,
  `pass_salt` varchar(255) NOT NULL
);

CREATE TABLE `Admin` (
  `user_id` int PRIMARY KEY,
  `role_id` int NOT NULL
);

CREATE TABLE `AdminRole` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT null
);

CREATE TABLE `ServicePackage` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `package_name` varchar(255) NOT NULL,
  `description` varchar(255)
);

CREATE TABLE `LoyaltyBonusType` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `points_threshold` int NOT NULL,
  `discount` float NOT NULL DEFAULT 0 COMMENT 'Values between 0 - 1 (inclusive)',
  `chat_support` bool NOT NULL DEFAULT false,
  `call_support` bool NOT NULL DEFAULT false
);

CREATE TABLE `Customer` (
  `user_id` int PRIMARY KEY,
  `service_package_id` int NOT NULL DEFAULT 0,
  `loyalty_points` int DEFAULT 0,
  `loyalty_type_id` int DEFAULT null
);

CREATE TABLE `ServiceCenter` (
  `user_id` int PRIMARY KEY,
  `contact_email` varchar(255) DEFAULT null,
  `is_verified` bool NOT NULL DEFAULT false,
  `rating` float DEFAULT null COMMENT 'Values between 0 - 5 (inclusive)',
  `is_premium` bool NOT NULL DEFAULT false
);

CREATE TABLE `ServiceListing` (
  `id` int PRIMARY KEY,
  `service_type_id` int,
  `service_description` text,
  `owned_by` int,
  `price` int NOT NULL
);

CREATE TABLE `ServiceListingPictures` (
  `picture_id` int PRIMARY KEY,
  `listing_id` int NOT NULL,
  `picture` blob NOT NULL
);

CREATE TABLE `ServiceType` (
  `id` int PRIMARY KEY,
  `type` varchar(255)
);

CREATE TABLE `ServiceOfferedFor` (
  `service_type_id` int NOT NULL,
  `device_type_id` int NOT NULL,
  PRIMARY KEY (`service_type_id`, `device_type_id`)
);

CREATE TABLE `DeviceType` (
  `id` int PRIMARY KEY,
  `type` varchar(255)
);

CREATE TABLE `Order` (
  `id` int PRIMARY KEY,
  `user_id` int NOT NULL,
  `order_timestamp` datetime NOT NULL
);

CREATE TABLE `OrderDetails` (
  `order_id` int,
  `service_listing_id` int,
  `reservation_time` datetime,
  `quantity` int NOT NULL DEFAULT 1,
  `order_status_id` int,
  PRIMARY KEY (`order_id`, `service_listing_id`, `reservation_time`)
);

CREATE TABLE `OrderStatus` (
  `id` int PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `details` varchar(255)
);

CREATE TABLE `OrderReceipt` (
  `order_id` int PRIMARY KEY,
  `total_cost` int NOT NULL,
  `payment_method_id` int,
  `is_paid` bool NOT NULL DEFAULT false
);

CREATE TABLE `PaymentMethod` (
  `id` int PRIMARY KEY,
  `type` varchar(255)
);

CREATE TABLE `Review` (
  `id` int PRIMARY KEY,
  `rating` float NOT NULL COMMENT 'Values between 0 - 5 (inclusive)',
  `order_id` int NOT NULL,
  `service_listing_id` int NOT NULL,
  `reservation_time` datetime NOT NULL,
  `description` text,
  `reply_id` int
);

CREATE TABLE `ReviewPictures` (
  `picture_id` int PRIMARY KEY,
  `review_id` int NOT NULL,
  `picture` blob NOT NULL
);

CREATE TABLE `ReviewReply` (
  `id` int PRIMARY KEY,
  `review_id` int UNIQUE NOT NULL,
  `description` text
);

CREATE UNIQUE INDEX `User_index_0` ON `User` (`id`);

CREATE UNIQUE INDEX `User_index_1` ON `User` (`user_name`);

CREATE UNIQUE INDEX `Credential_index_2` ON `Credential` (`user_id`);

CREATE UNIQUE INDEX `Credential_index_3` ON `Credential` (`email`);

CREATE UNIQUE INDEX `Customer_index_4` ON `Customer` (`user_id`);

CREATE UNIQUE INDEX `ServiceCenter_index_5` ON `ServiceCenter` (`user_id`);

CREATE UNIQUE INDEX `ServiceListing_index_6` ON `ServiceListing` (`id`);

CREATE INDEX `Order_index_7` ON `Order` (`id`);

CREATE UNIQUE INDEX `OrderReceipt_index_8` ON `OrderReceipt` (`order_id`);

CREATE UNIQUE INDEX `Review_index_9` ON `Review` (`id`);

CREATE UNIQUE INDEX `Review_index_10` ON `Review` (`order_id`, `service_listing_id`, `reservation_time`);

CREATE UNIQUE INDEX `ReviewReply_index_11` ON `ReviewReply` (`id`);

CREATE UNIQUE INDEX `ReviewReply_index_12` ON `ReviewReply` (`review_id`);

ALTER TABLE `Admin` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Admin` ADD FOREIGN KEY (`role_id`) REFERENCES `AdminRole` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Credential` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Customer` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Customer` ADD FOREIGN KEY (`service_package_id`) REFERENCES `ServicePackage` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE;

ALTER TABLE `Customer` ADD FOREIGN KEY (`loyalty_type_id`) REFERENCES `LoyaltyBonusType` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE;

ALTER TABLE `ServiceCenter` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ServiceListing` ADD FOREIGN KEY (`service_type_id`) REFERENCES `ServiceType` (`id`) ON DELETE SET DEFAULT ON UPDATE CASCADE;

ALTER TABLE `ServiceListing` ADD FOREIGN KEY (`owned_by`) REFERENCES `ServiceCenter` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ServiceListingPictures` ADD FOREIGN KEY (`listing_id`) REFERENCES `ServiceListing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ServiceOfferedFor` ADD FOREIGN KEY (`service_type_id`) REFERENCES `ServiceType` (`id`);

ALTER TABLE `ServiceOfferedFor` ADD FOREIGN KEY (`device_type_id`) REFERENCES `DeviceType` (`id`);

ALTER TABLE `Order` ADD FOREIGN KEY (`user_id`) REFERENCES `Customer` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`service_listing_id`) REFERENCES `ServiceListing` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `OrderDetails` ADD FOREIGN KEY (`order_status_id`) REFERENCES `OrderStatus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `OrderReceipt` ADD FOREIGN KEY (`order_id`) REFERENCES `Order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `OrderReceipt` ADD FOREIGN KEY (`payment_method_id`) REFERENCES `PaymentMethod` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `Review` ADD FOREIGN KEY (`order_id`, `service_listing_id`, `reservation_time`) REFERENCES `OrderDetails` (`order_id`, `service_listing_id`, `reservation_time`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Review` ADD FOREIGN KEY (`reply_id`) REFERENCES `ReviewReply` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `ReviewPictures` ADD FOREIGN KEY (`review_id`) REFERENCES `Review` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ReviewReply` ADD FOREIGN KEY (`review_id`) REFERENCES `Review` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
