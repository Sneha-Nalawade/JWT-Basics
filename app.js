require('dotenv').config();
require('express-async-errors');

const express = require('express'); //while using express.js, http protocols are handled bt it directly, so we need not explicitly require 'hhtp' module then..
const app = express();

const mainRouter = require('./routes/main');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.static('./public')) //This line of code sets up Express.js middleware for serving static files from the "./public" directory. Static files can include things like HTML, CSS, JavaScript, images, and more. When a client makes a request for a static file, Express will look in the "./public" directory and serve the file if it exists.
app.use(express.json()); //This line of code sets up middleware to parse incoming JSON data in HTTP requests. It is used to handle JSON payloads in HTTP request bodies. When a client sends a request with a JSON payload, this middleware will parse the JSON data and make it available in the request.body property for further processing in your route handlers.

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try{
    //no db in this program
    app.listen(port, () => console.log(`Server is listening on port ${port}...`)); //we have used callback fn so that this msg will only be displayed on console once the server(app.js) starts listening to requests successfully
    }
    catch(error)
    {
        console.log(error);
    }
};

start();


//JWT -> to ensure authorized access to certain data and parts in our program, so that only the authorized ones can access specific routes

//what does jwt.verify() return?? ->
//=> Successful Verification: If the token is valid, jwt.verify() returns the payload of the JWT, which is typically a JavaScript object containing the claims and data encoded in the JWT. This payload is often referred to as the "decoded token."
//=> Verification Error: If the token is invalid, expired, or doesn't match the expected signature, jwt.verify() throws an error. You should handle this error in your code to manage authentication and authorization accordingly. The error usually provides information about the reason for the verification failure.