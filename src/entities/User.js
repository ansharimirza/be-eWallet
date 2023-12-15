module.exports.User = class User {
    constructor({
        id, 
        username = null,
    }) {
            this.id = id;
            this.username = username;
        }
}