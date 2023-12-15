const {
    Response
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {
        useCases: {
            user: {
                addUserUseCase,
                getUserByUsernameUseCase,
                getTokenUseCase
            }
        }
    } = dependencies;

    const addUser = async (req,res,next)  => {
        try {
            const {
                body = {}
            } = req;

            const {
                id,
                username,
            } = body;
            
            const getByusername = await getUserByUsernameUseCase(dependencies);
            await getByusername.execute({
                username,
            });

            const addUser = await addUserUseCase(dependencies);
            const response = await addUser.execute({
                id,
                username,
            });

            const getToken = await getTokenUseCase(dependencies);
            const responseToken = await getToken.execute({
                username,
            });

            const statusCode = 201
            res.status(statusCode);
            res.json(new Response({
                statusCode: statusCode,
                statusMessage: "Created",
                statusDescription: "Resource created",
                result: responseToken
            }));

            next();

        } catch (error) {
            next(error);
        }
    }

    return addUser;
}