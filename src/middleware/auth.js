require('dotenv').config();

const {
    ResponseError
} = require('../frameworks/common');

module.exports = {
    verifyBasicAuth: (req, res,next) => {
        console.log(req.headers);
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const statusCode = 400;
        if(token != process.env.BASIC_AUTH_SECRET) {
            res.status(statusCode);
            res.json(new ResponseError({
                statusCode: statusCode,
                statusMessage: "Bad Requests",
                statusDescription: "Unauthorized user",
            }));
            return res;
        }

        next();
    }
}