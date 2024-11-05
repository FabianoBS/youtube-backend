import * as mysql from 'mysql';
import { config } from 'dotenv';
config();

const pool = mysql.createPool({
    "user": process.env.USER_DATABASE,
    "password": process.env.PASSWORD_DATABASE,
    "database": process.env.DATABASE,
    "host": process.env.HOST_DATABASE,
    "port": Number(process.env.PORT_DATABASE)
});

export { pool };

// import mysql from 'mysql';

// const pool = mysql.createPool({
//     "user":"root",
//     "password":"password",
//     "database":"api-yt-project",
//     "host":"localhost",
//     "port":3306
// })
