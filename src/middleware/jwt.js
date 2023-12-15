const jwt = require('jsonwebtoken');
const { TokenExpiredError } = jwt;

const {
    ResponseError
} = require('../frameworks/common');

module.exports = {
    verifyToken: (req, res,next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const statusCode = 401;
        const catchError = (err, res) => {
        if (err instanceof TokenExpiredError) {
            res.status(statusCode);
            res.json(new ResponseError({
                statusCode: statusCode,
                statusMessage: "Bad Requests",
                statusDescription: "Unauthorized user",
            }));
            return res;
            }
        res.status(statusCode);
        res.json(new ResponseError({
            statusCode: statusCode,
            statusMessage: "Bad Requests",
            statusDescription: "Unauthorized user",
        }));
        return res;
        }
        if(token == null) {
            res.status(statusCode);
            res.json(new ResponseError({
                statusCode: statusCode,
                statusMessage: "Bad Requests",
                statusDescription: "Unauthorized user",
            }));
            return res;
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            req.user = decoded;
            next();
        })
    }
}