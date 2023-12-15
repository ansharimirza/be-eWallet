const {
    isEmpty
} = require('lodash');

const {
    ResponseError,
} = require('../../frameworks/common');

module.exports = dependencies => {
    const {usersRepository} = dependencies;
    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    const execute = async ({
        username
    }) => {
        
        const userExists = await usersRepository.getByusername(username);

        if(!isEmpty(userExists)) {
            return Promise.reject(new ResponseError({
                statusCode:409,
                statusMessage: 'Bad Requests',
                statusDescription: 'Username already exists',
            }));
        }

        return userExists;
    }

    return {
        execute
    }
}

