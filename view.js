import * as readline from 'node:readline/promises';

const rl = readline.createInterface(process.stdin, process.stdout);
const confirmQuestion = " Enter 'y' to confirm, any key to decline.\n"

function formatUser(user) {
    return `Userame: ${user.username} \n` +
        `ID: ${user.id} \n` +
        `Location: ${user.location} \n` +
        `Name: ${user.name} \n` +
        `~~~~~~~~~//~~~~~~~~~`
}

export function helpCommand() {
    console.log("Currently implemented commands: \n" +
        "\t node . help \n" +
        "\t node . displayAll \n" + 
        "\t node . displayOne {username} | Example: node . displayOne designated-t \n" +
        "\t node . displayByLocal {location} | Example: node . displayByLocal 'Dublin, Ireland' \n" +
        "\t node . fetch {username} | Example: node . fetch designated-t \n");
}

export function displayView(data) {
    console.log("~~~~~~~~~//~~~~~~~~~");
    data.forEach(user => console.log(formatUser(user))
    )
}

export async function getInput(user, output) {
    console.log("User info:")
    console.log(user);
    const question = output + confirmQuestion;
    let answer = await rl.question(question);
    if (answer === 'y') {
        return true;
    }
    return false;
}