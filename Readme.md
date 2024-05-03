# Twitter Clone 2024

This project is a simplified clone of Twitter, built for educational purposes. It allows users to register, login, post messages, and like/dislike posts. The project is built using Node.js, Express, MongoDB, and Pug for server-side rendering.

## Tech Stack

Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express: A fast, unopinionated, minimalist web framework for Node.js.
MongoDB: A source-available cross-platform document-oriented database program.
Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
Pug: A high-performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.
Argon2: A password-hashing function that summarizes the state of the art in the design of memory-hard functions and can be used to hash passwords for credential storage, key derivation, or other applications.
Express-Session: A session middleware for Express.
Body-Parser: Node.js body parsing middleware.
Dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.

## Setup

Clone the repository to your local machine.
Navigate to the project directory.
Run npm install to install all the dependencies.

Create a .env file in the root directory. The .env file should contain the following variables:
SESSION_SECRET: Your session secret.
DB_URL: Your MongoDB connection string.
PORT: The port on which the server will run (default is 5000).

Run npm start to start the server. The server will start on the port specified in the .env file or port 5000 if no port is specified.

## Contribution

Feel free to contribute to this project. Any contributions you make are greatly appreciated. Please ensure your code adheres to the existing style to maintain consistency across the codebase.

## Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
Please note that this project is released with a Contributo

Written by Egecan
