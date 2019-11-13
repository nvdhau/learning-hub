const createPool = () => {
    try {
        const mysql = require('mysql2');
        const pool = mysql.createPool({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USER,
            password : process.env.DB_PASS,
            database : process.env.DB_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
  
        const promisePool = pool.promise();
        return promisePool;
    } catch (error) {
        return console.log(`Could not connect - ${error}`);
    }
}
  
const pool = createPool();
  
module.exports = {
    connection: async () => pool.getConnection(),
    execute: (...params) => pool.execute(...params)
};