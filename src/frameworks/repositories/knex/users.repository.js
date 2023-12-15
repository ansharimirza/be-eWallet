const repository = () => {
    //Model
    const UsersModel = require('../../models/knex/users');

    //crud executables
    return {
        add: async user => {
            return await UsersModel.query().insert(user);
        },
        update: async user => {
            const {
                id
            } = user;

            return await UsersModel.query().patchAndFetchById(id, {
                ...user,
                updatedAt: new Date()
            });
        },
        delete: async user => {
            const {
                id
            } = user;

            return await UsersModel.query().patchAndFetchById(id, {
                ...user,
                deletedAt: new Date()
            });
        },
        getByusername: async username => {
            return await UsersModel.query().where({
                username: username,
            });
        }
    }
}

module.exports = repository();