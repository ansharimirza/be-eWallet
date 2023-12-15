const {User} = require('../../entities');

module.exports = dependencies => {
    const {usersRepository} = dependencies;

    if (!usersRepository) {
        throw new Error('The user repository should be exists in dependencies');
    }

    const execute = ({
        username,
    }) => {

        const user = new User({
            username,
        });

        return usersRepository.add(user);
    }

    return {
        execute
    }
}

