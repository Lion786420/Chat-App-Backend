require("dotenv").config();

const PORT = process.env.PORT;
const SECRET = process.env.secret;
const SALT_ROUNDS = +process.env.SALT_ROUNDS;
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = { PORT, SECRET, SALT_ROUNDS, MONGODB_URI };
