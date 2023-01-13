const { Client } = require('pg');
const fs = require('fs');

let rawdata = fs.readFileSync('database.json');
let databaseInfo = JSON.parse(rawdata);

const datName = databaseInfo.dev.database;

const client = new Client({
  host: databaseInfo.dev.host,
  user: databaseInfo.dev.user,
  password: databaseInfo.dev.password,
  port: databaseInfo.dev.port,
});

const createDatabase = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE ' + datName);
    return true;
  } catch (error) {
    console.error(error.message +
      "\nDatabase creation therefore skipped.");
    return false;
  } finally {
    await client.end();
  }
};

createDatabase().then((result) => {
  if (result) {
    console.log('Database created');
  }
});