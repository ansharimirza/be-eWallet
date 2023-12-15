const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
    connect: () => {
        const environment = process.env.NODE_ENV;
        const config = require('../../../../knexfile')[environment];
        const mysql = require("knex")(config);

        mysql.raw("SELECT 1").then(() => {
            console.log("Mysql connected");
        })
        .catch((e) => {
            console.log("Mysql not connected");
            console.error(e);
        });

        return mysql;
    },
}