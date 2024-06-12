const mariadb = require('mariadb');
const bcryptjs = require('bcryptjs');


async function addUser(config, accountType, username, displayname, email, password, phone_no, profilePic = null, address = null, bio = null) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const hashedPassword = await hashPassword(password);
        if ( ! hashedPassword)
            return false;

        await conn.query(
            "CALL AddUser(?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [username, displayname, email, hashedPassword, phone_no, profilePic, address, bio, accountType]
        );

        console.log('User added successfully!');

        return true;

    } catch (err) {
        console.error('Error adding user:', err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}

async function verifyEmail(config, email, accountType) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);

        let tableName = '';
        if (accountType.toLowerCase() === 'admin') {
            tableName = 'Admin';
        } else if (accountType.toLowerCase() === 'service center') {
            tableName = 'ServiceCenter';
        } else if (accountType.toLowerCase() === 'customer') {
            tableName = 'Customer';
        } else {
            console.error('Invalid account type:', accountType);
            return false;
        }

        const results = await conn.query(
            `SELECT user_id FROM Credential WHERE email = ? 
             AND user_id IN (SELECT user_id FROM ${tableName})`,
            [email]
        );

        return (results.length > 0); // True if the email exists, False otherwise
    } catch (err) {
        console.error('Error verifying email: ', err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}

async function getUserDetails(config, email, password) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);

        const creds = await conn.query(
            `SELECT user_id, email, pass_hash AS password_hash
             FROM Credential WHERE email = ?`,
            [email]
        );

        if (creds.length === 0 || ! (await bcryptjs.compare(password, creds[0].password_hash)) )
            return null;

        const details = await conn.query(
            `SELECT id, user_name AS username, display_name, profile_pic
             FROM User WHERE id = ?`,
             [creds[0].user_id]
        );

        // details should always have 1 column only as User.id = PK
        // & Credentail.user_id is FK taking reference from User.id
        return details[0];
    } catch (err) {
        console.error('Error verifying email: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

function hashPassword(password) {
    const saltRounds = 10;

    return new Promise((resolve, reject) => {
        bcryptjs.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcryptjs.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
}

async function getListings(config, featured_only, count) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT
             SL.id, SLP.picture AS thumbnail, SL.service_title AS title,
             SL.price, ST.type AS serviceType, DT.type AS deviceType,
             SL.is_premium AS isFeatured
             FROM
             (Select * FROM ServiceListing
                ${featured_only ? 'WHERE is_premium = True' : ''}
                ${count ? 'LIMIT ?' : ''}) AS SL
             JOIN ServiceListingPictures AS SLP ON SL.thumbnail_id = SLP.picture_id
             JOIN ServiceType AS ST ON ST.id = SL.service_type_id
             JOIN DeviceType AS DT ON DT.id = SL.device_type_id`,
             count
        );

        return results;
    } catch (err) {
        console.error('Error getting pictures: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function getReviews(config, listing_id, count = 10) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT R.id, U.display_name AS 'name', R.rating, RP.picture AS thumbnail, R.description
             FROM (Select id, rating, description, thumbnail_id, order_id
                    FROM Review LIMIT ?) AS R
             LEFT JOIN ReviewPictures AS RP ON R.thumbnail_id = RP.picture_id
             JOIN \`Order\` AS Ord ON R.order_id = Ord.id
             JOIN OrderDetails AS OD ON Ord.id = OD.order_id
             JOIN User AS U ON Ord.user_id = U.id
             ${listing_id ? 'WHERE OD.service_listing_id = ?' : ''}
            `,
            [count, listing_id]
        );

        return results;
    } catch (err) {
        console.error('Error getting reviews: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function getServiceTypes(config) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT * FROM ServiceType`
        );

        return results;
    } catch (err) {
        console.error('Error getting service types: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function getDeviceTypes(config) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT * FROM DeviceType`
        );

        return results;
    } catch (err) {
        console.error('Error getting service types: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function updateUserDetails(config, userID, display_name, address, phone_no, bio, profile_pic_base64) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);

        const updatedList =
            (display_name ? `display_name = "${display_name}", ` : '') +
            (address ? `address = "${address}", ` : '') +
            (phone_no ? `phone_no = "${phone_no}", ` : '') +
            (bio ? `bio = "${bio}", ` : '')
        ;

        if ( updatedList.length > 0 ) {
            await conn.query(
                `UPDATE User
                SET ${updatedList.slice(0, updatedList.length - 2)}
                WHERE id = ${userID}`
            );
        }

        if ( profile_pic_base64 ) {
            await conn.query(
                `CALL UpdateProfilePicture(?, ?)`,
                [Buffer.from(profile_pic_base64, 'base64'), userID]
            );
        }

        return true;
    } catch (err) {
        console.error('Error updating user details: ', err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}

async function getSelectedServicePackage(config, userID) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT service_package_id FROM Customer WHERE user_id = ?`,
            [userID]
        );

        return results[0];
    } catch (err) {
        console.error('Error getting selected service package: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function getServicePackagesList(config) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT id, package_name, description, chat_support, call_support
             FROM ServicePackage`
        );

        return results;
    } catch (err) {
        console.error('Error getting service packages: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function updateServicePackage(config, userID, new_package) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        await conn.query(
            `UPDATE Customer
             SET service_package_id = ?
             WHERE user_id = ?`,
            [new_package, userID]
        );

        return true;
    } catch (err) {
        console.error('Error updating service package: ', err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}

async function getExtraUserDetails(config, userID) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT address, phone_no, bio FROM User WHERE id = ?`,
            [userID]
        );

        return results[0];
    } catch (err) {
        console.error('Error getting extra user details: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
};

async function getVerificationStatus(config, userID) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const results = await conn.query(
            `SELECT verification_status
             FROM ServiceCenter
             WHERE user_id = ?`,
             [userID]
        );

        return results[0];
    } catch (err) {
        console.error('Error getting verification status: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

async function updateVerificationRequestStatus(config, userID, status) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        await conn.query(
            `UPDATE ServiceCenter
             SET verification_status = ?
             WHERE user_id = ?`,
            [status, userID]
        );

        return true;
    } catch (err) {
        console.error('Error updating verification request status: ', err);
        return false;
    } finally {
        if (conn) conn.end();
    }
}

async function getListingsDetails(config, listingID) {
    let conn;
    try {
        conn = await mariadb.createConnection(config);
        const listingDetails = await conn.query(
            `SELECT
             SL.id, SL.thumbnail_id, SL.service_title AS title,
             SL.service_description AS description, SCU.display_name AS owner_title,
             SC.verification_status AS owner_verification_status, price
            FROM
                ServiceListing AS SL
            JOIN User AS SCU on SL.owned_by = SCU.id
            JOIN ServiceCenter AS SC ON SL.owned_by = SC.user_id
            WHERE SL.id = ?`,
            [listingID]
        );
        if ( ! listingDetails ) return null;

        const picturesList = await conn.query(
            `SELECT picture_id, picture
             FROM ServiceListingPictures
             WHERE listing_id = ?`,
    [listingID]
        );

        return {
            ...listingDetails[0],
            pictures: picturesList
        };
    } catch (err) {
        console.error('Error getting Listing Details: ', err);
        return null;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    addUser,
    verifyEmail,
    getUserDetails,
    getListings,
    getReviews,
    getServiceTypes,
    getDeviceTypes,
    updateUserDetails,
    getSelectedServicePackage,
    getServicePackagesList,
    updateServicePackage,
    getExtraUserDetails,
    getVerificationStatus,
    updateVerificationRequestStatus,
    getListingsDetails,
};
