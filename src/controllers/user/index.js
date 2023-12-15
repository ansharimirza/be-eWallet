const addUserController = require('./addUser.controller');
const readBalanceUserController = require('./readBalanceUser.controller');
const topUpBalanceUserController = require('./topUpBalanceUser.controller');
const transferBalanceUserController = require('./transferBalanceUser.controller');

module.exports = dependencies => {
    return {
        addUserController: addUserController(dependencies),
        readBalanceUserController: readBalanceUserController(dependencies),
        topUpBalanceUserController: topUpBalanceUserController(dependencies),
        transferBalanceUserController: transferBalanceUserController(dependencies),
    }
}