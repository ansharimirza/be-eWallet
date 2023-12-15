const repository = () => {
    //Model
    const UserWalletModel = require('../../models/knex/userWallet');

    //crud executables
    return {
        add: async user => {
            return await UserWalletModel.query().insert({ user_id: user.user_id, balance: user.balance});
        },
        readBalanceUser: async id => {
            return await UserWalletModel.query().where({
                user_id: id,
            });
        },
        update: async user => {
            const {
                user_id,
            } = user;

            return await UserWalletModel.query().patchAndFetchById(user_id, {
                ...user,
                updatedAt: new Date()
            });
        },
    }
}

module.exports = repository();