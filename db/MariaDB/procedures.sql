CREATE VIEW ViewCustomerDetails
AS
    SELECT User.id, user_name AS username, display_name AS 'Display Name', phone_no AS 'Phone No.', LENGTH(profile_pic) AS 'Profile pic. size (bytes)', address, bio, package_name AS 'Service Package', description AS 'Service Package Description', chat_support AS 'Chat Support', call_support AS 'Call Support', loyalty_points AS 'Points', discount
    FROM User
    JOIN Customer AS Cust ON User.id = Cust.user_id
    JOIN ServicePackage AS Pkg ON Cust.service_package_id = Pkg.id
    LEFT JOIN LoyaltyBonusType AS LBT ON Cust.loyalty_type_id = LBT.id;


DELIMITER //

CREATE PROCEDURE AddUser(
    IN username         VARCHAR(255),
    IN displayname      VARCHAR(255),
    IN email            VARCHAR(255),
    IN password_hash    VARCHAR(255),
    IN phone_no         CHAR(11),
    IN profile_pic      MEDIUMBLOB,
    IN address          VARCHAR(255),
    IN bio              TEXT,
    IN accountType      VARCHAR(255)
)
BEGIN
    DECLARE new_user_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;

        RESIGNAL;
    END;

    START TRANSACTION;

        INSERT INTO `User` (`user_name`, `display_name`, `phone_no`, `profile_pic`, `address`, `bio`)
        VALUES (username, displayname, phone_no, profile_pic, address, bio);

        SET new_user_id = LAST_INSERT_ID();

        INSERT INTO `Credential` (`user_id`, `email`, `pass_hash`)
        VALUES (new_user_id, email, password_hash);

        IF accountType = 'Admin' THEN
            INSERT INTO `Admin` (`user_id`)
            VALUES (new_user_id);
        ELSEIF accountType = 'Customer' THEN
            INSERT INTO `Customer` (`user_id`)
            VALUES (new_user_id);
        ELSE
            INSERT INTO `ServiceCenter` (`user_id`)
            VALUES (new_user_id);
        END IF;

    COMMIT;
END //


CREATE PROCEDURE MakePurchase(
    IN userID           INT,
    IN listingID        INT,
    IN reservation_time DATETIME,
    IN quantity         INT,
    IN total_cost       INT,
    IN payment_proof    MEDIUMBLOB,
)
BEGIN
    DECLARE order_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;

        RESIGNAL;
    END;

    START TRANSACTION;

        INSERT INTO `Order`(`user_id`, `order_timestamp`)
        VALUES (userID, NOW());

        SET order_id = LAST_INSERT_ID();

        INSERT INTO `OrderDetails` (`order_id`, `service_listing_id`, `reservation_time`, `quantity`)
        VALUES (order_id, listingID, reservation_time, quantity);

        INSERT INTO OrderReceipt(`order_id`, `total_cost`, `payment_method_id`, `payment_proof`)
        VALUES (order_id, total_cost, 3, payment_proof);

    COMMIT;
END //

CREATE PROCEDURE UpdateProfilePicture(
    IN profile_pic_blob MEDIUMBLOB,
    IN userID INT
)
BEGIN
    UPDATE `User`
    SET `profile_pic` = profile_pic_blob
    WHERE `id` = userID;
END //

CREATE PROCEDURE CreateNewListing(
    IN userID           INT,
    IN title            VARCHAR(255),
    IN description      VARCHAR(512),
    IN price            INT,
    IN service_type_id  INT,
    IN device_type_id   INT,
    IN is_premium       BOOLEAN,
    IN thumbnail        MEDIUMBLOB,
    OUT new_listing_id  INT
)
BEGIN
    DECLARE new_thumbnail_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;

        RESIGNAL;
    END;

    START TRANSACTION;
        INSERT INTO `ServiceListing`(`service_type_id`, `device_type_id`, `service_title`,
            `service_description`, `owned_by`, `price`, `thumbnail_id`, `is_premium`)
        VALUES (service_type_id, device_type_id, title, description, userID, price,
            null, is_premium);

        SET new_listing_id = LAST_INSERT_ID();

        INSERT INTO `ServiceListingPictures`(`listing_id`, `picture`)
        VALUES (new_listing_id, thumbnail);

        SET new_thumbnail_id = LAST_INSERT_ID();

        UPDATE `ServiceListing`
        SET `thumbnail_id` = new_thumbnail_id
        WHERE `id` = new_listing_id;

    COMMIT;

END //

CREATE PROCEDURE AddReview(
    order_id            INT,
    rating              INT,
    description         VARCHAR(255),
    service_listing_id  INT,
    reservation_time    DATETIME,
    thumbnail           MEDIUMBLOB
)
BEGIN
   DECLARE new_review_id INT;
   DECLARE new_thumbnail_id INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;

        RESIGNAL;
    END;

    START TRANSACTION;

        INSERT INTO `Review`(`order_id`, `rating`, `description`, `service_listing_id`, `reservation_time`, `thumbnail_id`)
        VALUES (order_id, rating, description, service_listing_id,  CONVERT_TZ(reservation_time, 'UTC', @@session.time_zone), null);

        IF thumbnail IS NOT NULL THEN
            SET new_review_id = LAST_INSERT_ID();

            INSERT INTO `ReviewPictures`(`review_id`, `picture`)
            VALUES (new_review_id, thumbnail);

            SET new_thumbnail_id = LAST_INSERT_ID();

            UPDATE `Review`
            SET `thumbnail_id` = new_thumbnail_id
            WHERE `id` = new_review_id;
        END IF;

    COMMIT;

END //

CREATE PROCEDURE UpdateLoyaltyPoints(
    IN orderID INT
)
BEGIN
    DECLARE userID          INT;
    DECLARE increment       INT;

    DECLARE old_points      INT;
    DECLARE loyalty_type_id INT;

    SET userID = (SELECT `user_id` FROM `Order` WHERE `id` = orderID);
    SET increment = 0.10 * (SELECT `total_cost` FROM `OrderReceipt` WHERE `order_id` = orderID);

    SET old_points = (SELECT `loyalty_points` FROM `Customer` WHERE `user_id` = userID);
    SET loyalty_type_id = (SELECT `id` FROM `LoyaltyBonusType` WHERE `points_threshold` <= old_points + increment ORDER BY `points_threshold` DESC LIMIT 1);

    UPDATE `Customer`
    SET `loyalty_points` = `loyalty_points` + increment, `loyalty_type_id` = loyalty_type_id
    WHERE `user_id` = userID;

END //

DELIMITER ;
