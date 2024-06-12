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

module.exports = {
    addUser,
    verifyEmail,
    getUserDetails,
};
