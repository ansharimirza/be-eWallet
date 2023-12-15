module.exports.UserWallet = class UserWallet {
    constructor({
        user_id = null,
        balance = null,
    }) {
            this.user_id = user_id;
            this.balance = balance;
        }
}