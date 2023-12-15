const { Model } = require('objection');
const {connect} = require('../../database/knex');
const visibilityPlugin = require('objection-visibility').default;
Model.knex(connect());

class UsersModel extends visibilityPlugin(Model) {
    static get tableName() {
        return 'users';
    }

    static get hidden () {
        return ['updatedAt','deletedAt']
    }
    

    $beforeInsert() {
        this.createdAt = new Date();
    }
    
    $beforeUpdate() {
        this.updatedAt = new Date();
    }
}

module.exports = UsersModel;