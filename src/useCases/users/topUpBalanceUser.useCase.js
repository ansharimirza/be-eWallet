require('dotenv').config();

const {UserWallet} = require('../../entities');

const {
    Response,
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
        username,amount
    }) => {
        
        if(amount >= 10000000) {
            let hasil = [];
            hasil.push(new result({
                errorCode: "13",
                errorMessage: "Invalid topup amount"
            }));

            return Promise.reject(new Response({
                statusCode:400,
                statusMessage: 'Bad Requests',
                statusDescription: "Request is invalid, missing parameters?",
                result:hasil
            }));
        }
        
        const userExist = await usersRepository.getByusername(username);

        const userWallet = await userWalletRepository.readBalanceUser(userExist[0].id);

        const newUserWallet = new UserWallet({
            user_id: userExist[0].id,
            balance: amount
        });

        let topUp = null;
        if (userWallet.length != 0) {
            topUp = await userWalletRepository.update(newUserWallet);
        }else{
            topUp = await userWalletRepository.add(newUserWallet);
        }

        let dataBalances = [];
        dataBalances.push(new dataBalance({
            balance:topUp.balance,
        }));

        return new result({
            errorCode: '00',
            errorMessage: 'Success',
            data: dataBalances
        });

    }

    return {
        execute
    }
}