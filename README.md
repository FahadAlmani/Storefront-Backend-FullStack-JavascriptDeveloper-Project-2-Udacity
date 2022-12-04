# Storefront Backend Project

## How to setup and connect to the database

1- run (npm i) to install all dependencies.

2- Rename the file "env.example" to ".env".

3- Enter your information into the ".env" file.

4- In the "package.json" file, there is a script called "seed script" that must be filled out with the postgres username and dev database.

5- Import the "RESTful_API.json" file into any API testing tool to use the APIs.

_Note:_ Please keep in mind that the PEPPER and SECRET TOKEN I used are 123.

## npm scripts

1- (npm run dev) run typescript code.

2- (npm run build) compile typescript to javascript.

3- (npm run start) run javascript code.

4- (npm run buildDB) run migration and seeders to contract the dev database.

5- (npm run test): do all nesear configurations and run the test files.
