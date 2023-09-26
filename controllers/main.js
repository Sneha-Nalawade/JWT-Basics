// check username, password in post(login) request
//if exists, create new JWT
//send back to front-end

//setup authentication so only the request with JWT can access the dashboard

// const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors');
 
const login = async(req, res) => {
    const {username, password} = req.body;
    //now, if either or both of these parameters are blank, a new JWT should not be created...and access to dashboard data must not be granted
    //so, we need to validate the entries as user can also input null string "" inplaceof username and/or password
    //diff ways to validate -> 1) use validation in mongoose (while defining each schema-property as object)
    //2)using Joi package (a complete diff layer for validation)
    //3)check in the controller (we'll use this method) :-

   if(!username || !password){
    throw new BadRequestError('Please provide email and password');
   }

   //we're assigning the value for userID manually just for demo, normally however, it is provided by DB!
   const id = new Date().getDate();

   //try to keep payload small (For better user experience; since heavy payloads take time to load and may not load properly incase of weak internet connectivity)
   const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:'30d'}); //this token expires in 30 days  //DO NOT INCLUDE THE PASSWORD AND SIMILAR CONFIDENTIAL INFO WITHIN THIS!
   //3 parts inside the parenthesis of jwt.sign()->: payload, secret, options
   //we only provide the resources that belong to that user

   //see the secret string's value in .env file ->
   //REMEMBER: this is just for demo...in production, use long, complex and unguessable string valuess!!!

    res.status(200).json({msg: `user created`, token});  

//   res.send(`Fake Login/Register/SignUp Route`);

}

const dashboard = async(req, res) => {
    // console.log(req.headers);
    // const authHeaders = req.headers.authorization;

    // if(!authHeaders || !authHeaders.startsWith('Bearer')){
    //     throw new CustomAPIError('No Token provided', 401);
    // }

    // const token = authHeaders.split(' ')[1];
    // console.log(token);

    console.log(req.user);

    const luckyNumber = Math.floor(Math.random()*100)  //range-> 0 to 99 in this case
    // res.status(200).json({msg: `Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});

} 

module.exports = {login, dashboard};

//there are two types of routes-> a) public routes: accessible by anyone (eg, the login route in this program)
//b) restricted routes: the access to the routes is restricted and allowed only if the user has a valid signed JWT (eg, dashboard in this program)

//JWT is just a way to exchange data between two parties, and probably the most common example for such pair of parties is the frontend app and our API.
//using JWT as against any random string is advisable since JWT has a security feature, and this helps us ensure integrity of data

//HTTP is 'STATELESS':- that means the server does not remember/identify any of the previous requests of any client

//more about JWT:- JSON Web Token-> this info can be verified & trusted coz it is digitally signed(this is done using the 'secret' and the algorithm)
//(and hence can also be displayed publicly)

//Authorization: Bearer <token>

//out of the many options available, we're using JWT to sign and debug our tokens