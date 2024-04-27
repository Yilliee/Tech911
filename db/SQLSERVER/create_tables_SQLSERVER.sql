CREATE TABLE [User] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [user_name] nvarchar(255) UNIQUE NOT NULL,
  [display_name] nvarchar(255) NOT NULL,
  [address] int DEFAULT (null),
  [phone_no] char(11) NOT NULL,
  [bio] text DEFAULT (null)
)
GO

CREATE TABLE [Credential] (
  [user_id] int PRIMARY KEY,
  [email] nvarchar(255) UNIQUE NOT NULL,
  [pass_hash] nvarchar(255) NOT NULL,
  [pass_salt] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Admin] (
  [user_id] int PRIMARY KEY,
  [role_id] int NOT NULL
)
GO

CREATE TABLE [AdminRole] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [title] nvarchar(255) NOT NULL,
  [description] text DEFAULT (null)
)
GO

CREATE TABLE [ServicePackage] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [package_name] nvarchar(255) NOT NULL,
  [description] nvarchar(255)
)
GO

CREATE TABLE [LoyaltyBonusType] (
  [id] int PRIMARY KEY IDENTITY(1, 1),
  [points_threshold] int NOT NULL,
  [discount] float NOT NULL DEFAULT (0),
  [chat_support] bool NOT NULL DEFAULT (false),
  [call_support] bool NOT NULL DEFAULT (false)
)
GO

CREATE TABLE [Customer] (
  [user_id] int PRIMARY KEY,
  [service_package_id] int NOT NULL DEFAULT (0),
  [loyalty_points] int DEFAULT (0),
  [loyalty_type_id] int DEFAULT (null)
)
GO

CREATE TABLE [ServiceCenter] (
  [user_id] int PRIMARY KEY,
  [contact_email] nvarchar(255) DEFAULT (null),
  [verification_status] nvarchar(255) NOT NULL CHECK ([verification_status] IN ('Processing', 'Processed', 'Failed')),
  [rating] float DEFAULT (null)
)
GO

CREATE TABLE [ServiceListing] (
  [id] int PRIMARY KEY,
  [service_type_id] int,
  [service_title] nvarchar(255) NOT NULL,
  [service_description] text,
  [owned_by] int,
  [price] int NOT NULL,
  [thumbnail_id] int,
  [is_premium] bool NOT NULL DEFAULT (false)
)
GO

CREATE TABLE [ServiceListingPictures] (
  [picture_id] int PRIMARY KEY,
  [listing_id] int NOT NULL,
  [picture] blob NOT NULL
)
GO

CREATE TABLE [ServiceType] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ServiceOfferedFor] (
  [service_type_id] int NOT NULL,
  [device_type_id] int NOT NULL,
  PRIMARY KEY ([service_type_id], [device_type_id])
)
GO

CREATE TABLE [DeviceType] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Order] (
  [id] int PRIMARY KEY,
  [user_id] int NOT NULL,
  [order_timestamp] datetime NOT NULL
)
GO

CREATE TABLE [OrderDetails] (
  [order_id] int,
  [service_listing_id] int,
  [reservation_time] datetime,
  [quantity] int NOT NULL DEFAULT (1),
  [order_status_id] int,
  PRIMARY KEY ([order_id], [service_listing_id], [reservation_time])
)
GO

CREATE TABLE [OrderStatus] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255) NOT NULL,
  [details] nvarchar(255)
)
GO

CREATE TABLE [OrderReceipt] (
  [order_id] int PRIMARY KEY,
  [total_cost] int NOT NULL,
  [payment_method_id] int,
  [payment_proof] blob NOT NULL,
  [status] nvarchar(255) NOT NULL CHECK ([status] IN ('Processing', 'Processed', 'Failed')) NOT NULL
)
GO

CREATE TABLE [PaymentMethod] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255)
)
GO

CREATE TABLE [Review] (
  [id] int PRIMARY KEY,
  [rating] int NOT NULL,
  [order_id] int NOT NULL,
  [service_listing_id] int NOT NULL,
  [reservation_time] datetime NOT NULL,
  [thumbnail_id] int,
  [description] text,
  [reply_id] int
)
GO

CREATE TABLE [ReviewPictures] (
  [picture_id] int PRIMARY KEY,
  [review_id] int NOT NULL,
  [picture] blob NOT NULL
)
GO

CREATE TABLE [ReviewReply] (
  [id] int PRIMARY KEY,
  [review_id] int UNIQUE NOT NULL,
  [description] text
)
GO

CREATE UNIQUE INDEX [User_index_0] ON [User] ("id")
GO

CREATE UNIQUE INDEX [User_index_1] ON [User] ("user_name")
GO

CREATE UNIQUE INDEX [Credential_index_2] ON [Credential] ("user_id")
GO

CREATE UNIQUE INDEX [Credential_index_3] ON [Credential] ("email")
GO

CREATE UNIQUE INDEX [Customer_index_4] ON [Customer] ("user_id")
GO

CREATE UNIQUE INDEX [ServiceCenter_index_5] ON [ServiceCenter] ("user_id")
GO

CREATE UNIQUE INDEX [ServiceListing_index_6] ON [ServiceListing] ("id")
GO

CREATE INDEX [Order_index_7] ON [Order] ("id")
GO

CREATE UNIQUE INDEX [OrderReceipt_index_8] ON [OrderReceipt] ("order_id")
GO

CREATE UNIQUE INDEX [Review_index_9] ON [Review] ("id")
GO

CREATE UNIQUE INDEX [Review_index_10] ON [Review] ("order_id", "service_listing_id", "reservation_time")
GO

CREATE UNIQUE INDEX [ReviewReply_index_11] ON [ReviewReply] ("id")
GO

CREATE UNIQUE INDEX [ReviewReply_index_12] ON [ReviewReply] ("review_id")
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Values between 0 - 1 (inclusive)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'LoyaltyBonusType',
@level2type = N'Column', @level2name = 'discount';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Values between 0 - 5 (inclusive)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'ServiceCenter',
@level2type = N'Column', @level2name = 'rating';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Picture of payment proof',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'OrderReceipt',
@level2type = N'Column', @level2name = 'payment_proof';
GO

EXEC sp_addextendedproperty
@name = N'Column_Description',
@value = 'Values between 0 - 5 (inclusive)',
@level0type = N'Schema', @level0name = 'dbo',
@level1type = N'Table',  @level1name = 'Review',
@level2type = N'Column', @level2name = 'rating';
GO

ALTER TABLE [Admin] ADD FOREIGN KEY ([user_id]) REFERENCES [User] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Admin] ADD FOREIGN KEY ([role_id]) REFERENCES [AdminRole] ([id]) ON DELETE RESTRICT ON UPDATE CASCADE
GO

ALTER TABLE [Credential] ADD FOREIGN KEY ([user_id]) REFERENCES [User] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Customer] ADD FOREIGN KEY ([user_id]) REFERENCES [User] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Customer] ADD FOREIGN KEY ([service_package_id]) REFERENCES [ServicePackage] ([id]) ON DELETE SET DEFAULT ON UPDATE CASCADE
GO

ALTER TABLE [Customer] ADD FOREIGN KEY ([loyalty_type_id]) REFERENCES [LoyaltyBonusType] ([id]) ON DELETE SET DEFAULT ON UPDATE CASCADE
GO

ALTER TABLE [ServiceCenter] ADD FOREIGN KEY ([user_id]) REFERENCES [User] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ServiceListing] ADD FOREIGN KEY ([service_type_id]) REFERENCES [ServiceType] ([id]) ON DELETE SET DEFAULT ON UPDATE CASCADE
GO

ALTER TABLE [ServiceListing] ADD FOREIGN KEY ([owned_by]) REFERENCES [ServiceCenter] ([user_id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ServiceListing] ADD FOREIGN KEY ([thumbnail_id]) REFERENCES [ServiceListingPictures] ([picture_id]) ON DELETE SET NULL
GO

ALTER TABLE [ServiceListingPictures] ADD FOREIGN KEY ([listing_id]) REFERENCES [ServiceListing] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ServiceOfferedFor] ADD FOREIGN KEY ([service_type_id]) REFERENCES [ServiceType] ([id])
GO

ALTER TABLE [ServiceOfferedFor] ADD FOREIGN KEY ([device_type_id]) REFERENCES [DeviceType] ([id])
GO

ALTER TABLE [Order] ADD FOREIGN KEY ([user_id]) REFERENCES [Customer] ([user_id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([service_listing_id]) REFERENCES [ServiceListing] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([order_id]) REFERENCES [Order] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [OrderDetails] ADD FOREIGN KEY ([order_status_id]) REFERENCES [OrderStatus] ([id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [OrderReceipt] ADD FOREIGN KEY ([order_id]) REFERENCES [Order] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [OrderReceipt] ADD FOREIGN KEY ([payment_method_id]) REFERENCES [PaymentMethod] ([id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([order_id], [service_listing_id], [reservation_time]) REFERENCES [OrderDetails] ([order_id], [service_listing_id], [reservation_time]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([thumbnail_id]) REFERENCES [ReviewPictures] ([picture_id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [Review] ADD FOREIGN KEY ([reply_id]) REFERENCES [ReviewReply] ([id]) ON DELETE SET NULL ON UPDATE CASCADE
GO

ALTER TABLE [ReviewPictures] ADD FOREIGN KEY ([review_id]) REFERENCES [Review] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO

ALTER TABLE [ReviewReply] ADD FOREIGN KEY ([review_id]) REFERENCES [Review] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
GO
