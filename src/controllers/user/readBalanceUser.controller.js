const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            user: {
                readBalanceUserUseCase
            }
        }
    } = dependencies;

    const readBalanceUser = async (req,res,next)  => {
        try {
            const username = req.user.username;
            const balance = await readBalanceUserUseCase(dependencies);
            const response = await balance.execute({username});


            const statusCode = 201
            res.status(statusCode);
            res.json(new Response({
                statusCode: statusCode,
                statusMessage: "Created",
                statusDescription: "Resource created",
                result: response
            }));

            next();

        } catch (error) {
            next(error);
        }
    }

    return readBalanceUser;
}