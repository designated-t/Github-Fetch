import pkg from 'pg-promise';
import fs from 'fs';

let rawdata = fs.readFileSync('database.json');
let databaseInfo = JSON.parse(rawdata);

const { PreparedStatement: PS } = pkg;
const pgp = pkg({})

const cn = `postgres://${databaseInfo.dev.user}:${databaseInfo.dev.password}@${databaseInfo.dev.host}:5432/${databaseInfo.dev.database}`;
const database = pgp(cn);

const findUser = new PS({name: 'find-user', text: 'SELECT * FROM users WHERE username = $1'});

export async function findAll() {
    const findAll = new PS({name: 'find-all', text: 'SELECT * FROM users'})
    return await database.many(findAll)
        .catch(error => {
            console.log('ERROR:', error.detail);
        })
}

export async function findOneByName(username) {
    findUser.values = [username];
    return await database.many(findUser)
        .catch(error => {
            console.log('ERROR:', error.message);
        })
}

export async function findAllByLocal(location) {
    const findAllLocal = new PS({name: 'find-all-by-local', text: 'SELECT * FROM users WHERE location = $1'});
    findAllLocal.values = [location]
    return await database.many(findAllLocal)
        .catch(error => {
            console.log('ERROR:', error.message);
        })
}

export async function checkDatabase(username) {
    findUser.values = [username]
    return await database.any(findUser, [username])
        .catch(error =>
            console.log('ERROR:', error.message)
        )
}

export async function storeUser(user) {
    const addUser = new PS({name: 'add-user', text: 'INSERT INTO users(username, id, name, location) VALUES($1, $2, $3, $4) RETURNING id'});
    addUser.values = [user.user, user.id, user.name, user.location]
    await database.one(addUser)
        .then(data =>
            console.log("Stored under ID number: " + data.id)
        )
        .catch(error =>
            console.log('ERROR:', error.detail)
        )
}