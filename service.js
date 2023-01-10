import axios from "axios";
import * as dao from "./dao.js"
import * as view from "./view.js"

const saveQuestion = "Would you like to save this user to the database?";
const fetchQuestion = "Would you like to fetch this user?";

export async function bodyAction() {
    switch (process.argv[2]) {
        case "fetch":
            await fetchBody();
            break;
        case "displayAll":
            const users = await dao.findAll();
            view.displayView(users);
            break;
        case "displayOne":
            const user = await dao.findOneByName(process.argv[3]);
            if (user) {
                view.displayView(user);
                break;
            }
            console.log("No users by this username exist in the database!")
            if (await view.getInput(process.argv[3], fetchQuestion)) {
                await fetchBody();
            }
            break;
        case "displayByLocal":
            const usersLocal = await dao.findAllByLocal(process.argv[3]);
            if (usersLocal) {
                view.displayView(usersLocal);
            }
            console.log("No users by this location exist yet in the database!")
            break;
        case "help":
            view.helpCommand();
            break;
        default:
            console.log("Unrecognised command-line args. For a list of commands, run: 'node . help'");
            break;
    }
}

async function fetchBody() {
    const response = await dao.checkDatabase(process.argv[3]);
    if (!response.length) { //if length is 0, evaluates to falsie, if 1, evaluates to truthy
        const user = await fetchCommand(process.argv[3]);
        if (user) { //undefined turns to falsie
            if (await view.getInput(user, saveQuestion)) {
                await dao.storeUser(user)
                return;
            }
            console.log("Noted. User not saved to database!");
            return;
        }
        return;
    }
    console.log("A user by this GitHub ID already exists within the database!")
}

async function fetchCommand(username) {
    console.log("Fetching Username:", username);
    const user = await axios.get("https://api.github.com/users/" + username)
        .then(res => constructUser(res))
        .catch(error => {
            if (error.response) {
                //response status is an error code
                console.log(error.response.status + ": No user by this username was found!");
            }
            else if (error.request) {
                //response not received though the request was sent
                console.log(error.request);
            }
            else {
                //an error occurred when setting up the request
                console.log(error.message);
            }
        });
    return user;
}

function constructUser(response) {
    const resUser = response.data
    const endUser = {
        user: resUser.login,
        id: resUser.id,
        name: resUser.name,
        location: resUser.location
    }
    return endUser;
}