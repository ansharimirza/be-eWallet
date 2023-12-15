const express = require('express');

const {
    userControllers
} = require('../../../controllers');

const {
    JWT,
    AUTH
} = require('../../middleware');

module.exports = dependencies =>{
    const {
        requests: {
            user: {
                addUserRequest,
                topUpBalanceUserRequest,
                transferBalanceUserRequest
            }
        }
    } = dependencies;

    const router  = express.Router();

    const {
        addUserController,
        readBalanceUserController,
        topUpBalanceUserController,
        transferBalanceUserController
    } = userControllers(dependencies);

    router.post('/create',addUserRequest.schemaAddUser,addUserRequest.validatereqAddUser,AUTH.verifyBasicAuth,addUserController); 
    router.get('/balance',JWT.verifyToken,readBalanceUserController); 
    router.post('/balance',topUpBalanceUserRequest.schemaTopUpBalanceUser,topUpBalanceUserRequest.validatereqTopUpBalanceUser,JWT.verifyToken,topUpBalanceUserController); 
    router.post('/transfer',transferBalanceUserRequest.schemaTransferBalanceUser,transferBalanceUserRequest.validatereqTransferBalanceUser,JWT.verifyToken,transferBalanceUserController); 

    return router;
}