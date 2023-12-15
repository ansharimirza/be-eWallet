const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            user: {
                transferBalanceUserUseCase
            }
        }
    } = dependencies;

    const transferBalanceUser = async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                username,
                amount,
            } = body;

            const fromUsername = req.user.username;
            const transfer = await transferBalanceUserUseCase(dependencies);

            await transfer.execute({fromUsername,username,amount});

            const statusCode = 204;
            res.status(statusCode);
            res.json();
            next();

        } catch (error) {
            next(error);
        }
    }

    return transferBalanceUser;
}