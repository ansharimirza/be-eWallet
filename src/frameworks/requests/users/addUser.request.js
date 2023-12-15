const { body, validationResult } = require('express-validator');

const {
    ResponseError
} = require('../../common');

const schemaAddUser = [
    body('username')
    .notEmpty()
    .withMessage('username tidak boleh kosong')
    .isString()
    .withMessage('Username harus karakter')
];


const validatereqAddUser = async (req,res,next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    let errors = validationResult(req);
    var message = errors.array().map(function (errors) {
        return errors.msg
    });


    if (!errors.isEmpty()) {
        const statusCode = 403;
        res.status(statusCode);

        res.json(new ResponseError({
            statusCode: statusCode,
            statusMessage: "Bad Requests",
            statusDescription: "Invalid parameters",
        }));

        return res;
    }

    next();
}


module.exports = {
    schemaAddUser,
    validatereqAddUser,
}