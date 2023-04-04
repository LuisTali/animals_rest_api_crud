import {config} from 'dotenv'
config();

export default {
    port: process.env.PORT || 5000,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    username: process.env.USER,
    dbport: process.env.DBPORT
}