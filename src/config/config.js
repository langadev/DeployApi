require('dotenv').config();

module.exports = {

  "development": {
    "username": process.env.DB_USER,
    "password":process.env.DB_PASS ,
    "database":process.env.DB_NAME,
    "port":process.env.DB_PORT,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USER,
    "password":process.env.DB_PASS ,
    "database":process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": "ufljujnaqhyusltg",
    "password": 'J7lIhVbYe4mqFC8szuVD',
    "database": "bnbqqgqz5ukrlzogpeag",
    "host": "bnbqqgqz5ukrlzogpeag-mysql.services.clever-cloud.com",
    "dialect": "mysql"
  }
}
