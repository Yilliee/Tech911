const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
const serverUtils = require('./serverUtils');

// Database connection details
const config = {
    user: process.env.DBUser,
    password: process.env.DBPass,  // Replace with your password
    host: process.env.DBhost,
    database: process.env.DBName
};

// Website link for CORS 
const website_link = process.env.WebsiteHost;
// API port
const api_port = process.env.APIPort;

console.log(website_link)
console.log(api_port)
// create a session management system
const sessionConfig = {
    secret: crypto.randomBytes(20).toString('hex'),
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(
        {
            ...config,
            createDatabaseTable: false,
            schema: {
                tableName: 'SessionStorage',
                columnNames: {
                    session_id: 'session_id',
                    expires: 'expires',
                    data: 'data'
                }
            }
        }
    ),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        secure: false, // Set to true if using HTTPS
        httpOnly: true // Prevent client-side access to cookies
    }
};

const app = express();

app.use((req, res, next) => { // Modified req for readability
    res.setHeader('Access-Control-Allow-Origin', website_link);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
    next();
});

app.use(session(sessionConfig));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());

// Middleware to check if user is authenticated
const authenticateUser = (req, res, next) => {
    if (req.session.userID) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

app.post('/verifyEmail',
    async (req, res) => {
        const { email, accountType } = req.body;

        const emailExists = await serverUtils.verifyEmail(config, email, accountType);

        res.json({ emailExists });
    }
);

app.post('/verifyCredentials',
    async (req, res) => {
        const { email, pass } = req.body;

        const userDetails = await serverUtils.getUserDetails(config, email, pass);

        if ( userDetails ) {
            req.session.userID = userDetails.id;

            res.json({
                username: userDetails.username,
                display_name: userDetails.display_name,
                profile_pic: userDetails.profile_pic ? userDetails.profile_pic.toString('base64') : null
            });;

            return;
        }
        res.status(401).json({ message: 'Invalid credentials' });
    }
);

app.get('/authenticate', authenticateUser, async (_, res) => {
    res.json({ message: 'Authenticated' });
});

app.put('/addUser',
    async (req, res) => {
        const { username, displayName, address, phone, email, password, accountType } = req.body;

        const status = await serverUtils.addUser(config, accountType, username, displayName, email, password, phone, null, address, null);

        if (status) {
            res.json({ message: 'Adding user successful' });
        } else {
            res.status(500).json({ message: 'Adding user unsuccessful' });
        }
    }
);

app.post('/getListings',
    async (req, res) => {
        const { featured_only, count } = req.body;

        const listings = await serverUtils.getListings(config, featured_only, count);

        res.json(listings)
    }
);

app.post('/getReviews',
    async (req, res) => {
        const { count, listing_id } = req.body;

        const top_reviews = await serverUtils.getReviews(config, listing_id, count);

        res.json(top_reviews)
    }
);

app.get('/getServiceTypes',
    async (_, res) => {
        const services_list = await serverUtils.getServiceTypes(config);

        res.json({
            service_type_list: services_list
        });
    }
);

app.get('/getDeviceTypes',
    async (_, res) => {
        const devices_list = await serverUtils.getDeviceTypes(config);

        res.json({
            device_type_list: devices_list
        });
    }
);

app.listen(api_port,
    () => console.log('Server is running on port 3000')
);
