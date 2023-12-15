const {
    Response,
    ResponseError,
} = require('../common');

module.exports = (err,req,res,next) => {
    
    res.status(err.statusCode);
    
    if (err.result === undefined) {
        res.json(new ResponseError({
            statusCode: err.statusCode || 500,
            statusMessage: err.statusMessage || 'No MSG',
            statusDescription: err.statusDescription || 'Somebody failed',
        }));
    }
    
    res.json(new Response({
        statusCode: err.statusCode || 500,
        statusMessage: err.statusMessage || 'No MSG',
        statusDescription: err.statusDescription || 'Somebody failed',
        result: err.result
    }));
}