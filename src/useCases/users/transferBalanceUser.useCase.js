require('dotenv').config();

const {UserWallet} = require('../../entities');

const {
    Response,
    ResponseError,
    result,
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
        fromUsername,username,amount
    }) => {
        //tujuan
        const userTo = await usersRepository.getByusername(username);
        if (userTo == 0) {
            return Promise.reject(new ResponseError({
                statusCode:404,
                statusMessage: 'Bad Requests',
                statusDescription: 'Destination user not found'
            }));
        }
        const userWalletTo = await userWalletRepository.readBalanceUser(userTo[0].id);

        //from
        const userFrom = await usersRepository.getByusername(fromUsername);
        const userWalletFrom = await userWalletRepository.readBalanceUser(userFrom[0].id);
        
        //pengurangan
        const userBalanceFrom = userWalletFrom[0].balance - amount;
        if (userBalanceFrom <= 0) {
            let hasil= [];
            hasil.push(new result({
                errorCode: "14",
                errorMessage: "Insufficient balance"
            }));

            return Promise.reject(new Response({
                statusCode:400,
                statusMessage: 'Bad Requests',
                statusDescription: 'Request is invalid, missing parameters?',
                result:hasil
            }));
        }
        const updateUserWalletFrom = new UserWallet({
            user_id: userWalletFrom[0].id,
            balance: userBalanceFrom
        });
        await userWalletRepository.update(updateUserWalletFrom);

        //transfer
        const userBalanceTo = userWalletTo[0].balance + amount;
        const updateUserWalletTo = new UserWallet({
            user_id: userWalletTo[0].id,
            balance: userBalanceTo
        });
        await userWalletRepository.update(updateUserWalletTo);

        return new result({
            errorCode: '00',
            errorMessage: 'Success',
            data: 0
        });

    }

    return {
        execute
    }
}