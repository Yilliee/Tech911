CREATE VIEW ViewCustomerDetails
AS
    SELECT User.id, user_name AS username, display_name AS [Display Name], phone_no AS [Phone No.], LEN(profile_pic) AS [Profile pic. size (bytes)], address, bio, package_name AS [Service Package], description AS [Service Package Description], chat_support AS [Chat Support], call_support AS [Call Support], loyalty_points AS [Points], discount
    FROM [User]
    JOIN Customer AS Cust ON User.id = Cust.user_id
    JOIN ServicePackage AS Pkg ON Cust.service_package_id = Pkg.id
    LEFT JOIN LoyaltyBonusType AS LBT ON Cust.loyalty_type_id = LBT.id;


CREATE PROCEDURE AddUser
    @username         VARCHAR(255),
    @displayname      VARCHAR(255),
    @email            VARCHAR(255),
    @password_hash    VARCHAR(255),
    @phone_no         VARCHAR(11),
    @profile_pic      VARBINARY(MAX),
    @address          VARCHAR(255),
    @bio              TEXT,
    @accountType      VARCHAR(255)
AS
BEGIN
    DECLARE @new_user_id INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [User] (user_name, display_name, phone_no, profile_pic, address, bio)
        VALUES (@username, @displayname, @phone_no, @profile_pic, @address, @bio);

        SET @new_user_id = SCOPE_IDENTITY();

        INSERT INTO Credential (user_id, email, pass_hash)
        VALUES (@new_user_id, @email, @password_hash);

        IF @accountType = 'Admin'
        BEGIN
            INSERT INTO Admin (user_id)
            VALUES (@new_user_id);
        END
        ELSE IF @accountType = 'Customer'
        BEGIN
            INSERT INTO Customer (user_id)
            VALUES (@new_user_id);
        END
        ELSE
        BEGIN
            INSERT INTO ServiceCenter (user_id)
            VALUES (@new_user_id);
        END;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK;
        END;

        THROW;
    END CATCH;
END;


CREATE PROCEDURE MakePurchase
    @userID           INT,
    @listingID        INT,
    @reservation_time DATETIME2,
    @quantity         INT,
    @total_cost       INT,
    @payment_proof    VARBINARY(MAX)
AS
BEGIN
    DECLARE @order_id INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Order] (user_id, order_timestamp)
        VALUES (@userID, GETDATE());

        SET @order_id = SCOPE_IDENTITY();

        INSERT INTO OrderDetails (order_id, service_listing_id, reservation_time, quantity)
        VALUES (@order_id, @listingID, @reservation_time, @quantity);

        INSERT INTO OrderReceipt (order_id, total_cost, payment_method_id, payment_proof)
        VALUES (@order_id, @total_cost, 3, @payment_proof);

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK;
        END;

        THROW;
    END CATCH;
END;


CREATE PROCEDURE UpdateProfilePicture
    @profile_pic_blob VARBINARY(MAX),
    @userID INT
AS
BEGIN
    UPDATE [User]
    SET profile_pic = @profile_pic_blob
    WHERE id = @userID;
END;


CREATE PROCEDURE CreateNewListing
    @userID           INT,
    @title            VARCHAR(255),
    @description      VARCHAR(512),
    @price            INT,
    @service_type_id  INT,
    @device_type_id   INT,
    @is_premium       BIT,
    @thumbnail        VARBINARY(MAX),
    @new_listing_id  INT OUTPUT
AS
BEGIN
    DECLARE @new_thumbnail_id INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO ServiceListing (service_type_id, device_type_id, service_title,
            service_description, owned_by, price, thumbnail_id, is_premium)
        VALUES (@service_type_id, @device_type_id, @title, @description, @userID, @price,
            null, @is_premium);

        SET @new_listing_id = SCOPE_IDENTITY();

        INSERT INTO ServiceListingPictures (listing_id, picture)
        VALUES (@new_listing_id, @thumbnail);

        SET @new_thumbnail_id = SCOPE_IDENTITY();

        UPDATE ServiceListing
        SET thumbnail_id = @new_thumbnail_id
        WHERE id = @new_listing_id;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK;
        END;

        THROW;
    END CATCH;
END;


CREATE PROCEDURE AddReview
    @order_id            INT,
    @rating              INT,
    @description         VARCHAR(255),
    @service_listing_id  INT,
    @reservation_time    DATETIME2,
    @thumbnail           VARBINARY(MAX)
AS
BEGIN
    DECLARE @new_review_id INT;
    DECLARE @new_thumbnail_id INT;

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Review (order_id, rating, description, service_listing_id, reservation_time, thumbnail_id)
        VALUES (@order_id, @rating, @description, @service_listing_id, @reservation_time, null);

        IF @thumbnail IS NOT NULL
        BEGIN
            SET @new_review_id = SCOPE_IDENTITY();

            INSERT INTO ReviewPictures (review_id, picture)
            VALUES (@new_review_id, @thumbnail);

            SET @new_thumbnail_id = SCOPE_IDENTITY();

            UPDATE Review
            SET thumbnail_id = @new_thumbnail_id
            WHERE id = @new_review_id;
        END;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK;
        END;

        THROW;
    END CATCH;
END;


CREATE PROCEDURE UpdateLoyaltyPoints
    @orderID INT
AS
BEGIN
    DECLARE @userID          INT;
    DECLARE @increment       INT;
    DECLARE @old_points      INT;
    DECLARE @loyalty_type_id INT;

    SET @userID = (SELECT user_id FROM [Order] WHERE id = @orderID);
    SET @increment = 0.10 * (SELECT total_cost FROM OrderReceipt WHERE order_id = @orderID);

    SET @old_points = (SELECT loyalty_points FROM Customer WHERE user_id = @userID);
    SET @loyalty_type_id = (SELECT id FROM LoyaltyBonusType WHERE points_threshold <= @old_points + @increment ORDER BY points_threshold DESC OFFSET 0 ROWS FETCH NEXT 1 ROWS ONLY);

    UPDATE Customer
    SET loyalty_points = loyalty_points + @increment, loyalty_type_id = @loyalty_type_id
    WHERE user_id = @userID;
END;
