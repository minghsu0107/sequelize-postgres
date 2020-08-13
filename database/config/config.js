require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        define: {
            schema: "public"
        },
        pool: {
            max: 5,
            min: 1,
            idle: 10000 // Remove a connection after the connection has been idle for 10s
        }
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        define: {
            schema: "public"
        }
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
        define: {
            schema: "public"
        }
    },
}
