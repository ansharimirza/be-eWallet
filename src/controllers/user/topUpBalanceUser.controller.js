const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            user: {
                topUpBalanceUserUseCase
            }
        }
    } = dependencies;

    const topUpBalanceUser = async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                amount,
            } = body;

            const username = req.user.username;
            const topUp = await topUpBalanceUserUseCase(dependencies);

            await topUp.execute({username,amount});

            const statusCode = 204;
            res.status(statusCode);
            res.json();
            next();

        } catch (error) {
            next(error);
        }
    }

    return topUpBalanceUser;
}