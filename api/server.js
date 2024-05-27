const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);

// Database connection details
const config = {
    user: process.env.DBUser,
    password: process.env.DBPass,  // Replace with your password
    host: process.env.DBhost,
    database: process.env.DBName
};

// Website link for CORS & API port
const website_link = "http://localhost:4173";
const api_port = 3000;

const app = express();

app.use((req, res, next) => { // Modified req for readability
    res.setHeader('Access-Control-Allow-Origin', website_link);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, credentials'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
    next();
});

app.use(express.json());

app.listen(api_port,
    () => console.log('Server is running on port 3000')
);

console.log(config)
