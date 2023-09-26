const jwt = require('jsonwebtoken');
// const CustomAPIError = require('../errors/custom-error');
const { UnauthenticatedError } = require('../errors'); //something like destructuring!!!

const authenticationMiddleware = async (req, res, next) => {
    // console.log(req.headers.authorization);
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer')){
        throw new UnauthenticatedError('No Token provided');
    }

    const token = authHeaders.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //this method returns entire object contining all info about the item incase the token is valid/verified
        // console.log(decoded); //this will print all content of the object (like name, id, issued at, expires at etc)...
        const {id, username} = decoded //destructuring
        req.user = {id, username}
        next(); //this is imp since we want that once the token is checked for verification, the control is passed on to the dashboard post request, and does not stop here itself!
    } catch(error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }

    
}

module.exports = authenticationMiddleware;