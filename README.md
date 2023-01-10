# Git Fetch

Git Fetch is a command-line application that allows fetching of a given user from Github, and storing it in a PostgreSQL database, with the added bonus of being able to query the database.

## Installation

If you do not have Postgres, Install it here: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

If you do not have NPM, install it here: [https://docs.npmjs.com/downloading-and-installing-node-js-and-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
It is a requirement.

### Clone the repo, and follow these instructions:

#### 1 - Change some initial configs:

&nbsp;&nbsp;In ./database.json, change the "changethis" field to your PostgreSQL master password.

&nbsp;&nbsp;You can also change other settings should they differ, though I recommend this for advanced users only.

#### 2 - Open the main folder of the repository in command-line and type:

````
node .\configs\init.cjs
````

&nbsp;&nbsp;This will create your database. If there is an error, make sure you installed Postgres.

&nbsp;&nbsp;After that, your database is created. We can proceed to create the table via the following command:

````
db-migrate up
````
This will create your table where users will be stored. It utilizes the .sql file ending with "up" in ./migrations/sqls/, so should you wish to add anything to the creation, you can. I would recommend this for advanced users only.

#### All set! Go down to usage to learn how it works.

## Usage

Output all currently implemented commands to the console:
````
node . help
````
Output all users currently stored in the database:
````
node . displayAll
````
Output a single user that matches the given argument:
````
node . displayOne {username}
````
Output all users that match the given argument:
````
node . displayByLocal {location}
````
And finally, fetches a user from the GitHub API and stores it to the database:
````
node . fetch {username}
````
For any concerns, please reach out. I am cronically online!

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.