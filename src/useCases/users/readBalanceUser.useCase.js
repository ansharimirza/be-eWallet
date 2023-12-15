require('dotenv').config();

const {
    result,
    dataBalance
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {usersRepository,userWalletRepository} = dependencies;

    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    if (!userWalletRepository) {
        throw new Error('The user wallet repository should be exists in dependencies');
    }

    const execute = async({
        username,
    }) => {
        const user = await usersRepository.getByusername(username);

        const userWallet = await userWalletRepository.readBalanceUser(user[0].id);

        let balance = 0;
        if (userWallet.length != 0) {
            balance = userWallet[0].balance;
        }

        let dataBalances = [];
        dataBalances.push(new dataBalance({
            balance:balance,
        }));

        return new result({
            errorCode: '00',
            errorMessage: 'Successsss',
            data: dataBalances
        });

    }

    return {
        execute
    }
}