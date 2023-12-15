const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
    local: {
        client: "mysql2",
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: 3306,
            host: process.env.DB_HOST
        },
        migrations: {
            directory: './db/migrations'
        },
        seeds: {
            directory: './db/seeds'
        },
    }
};