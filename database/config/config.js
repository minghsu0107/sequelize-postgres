require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        define: {
            schema: "public"
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
