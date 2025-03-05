# Nodejs-mysql2-library-DataBase-Connection
Connecting Database to the server using mysql2 library in Nodejs


This project demonstrates how to connect to a MySQL database using `mysql2`, build a simple Express API, and perform basic operations like retrieving and inserting data into a `users` table in the database. The API includes the following routes:

- **GET /database**: Retrieves data from the `users` table.
- **POST /postdata**: Inserts a hardcoded user record into the `users` table.

## Prerequisites

Before using this project, ensure that you have the following installed:

- **Node.js**: The backend server is built with Node.js.
- **MySQL**: A MySQL server where the database and the `users` table are hosted.

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. **Install dependencies**:
   Run the following command to install the required npm packages:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory of the project and add the following database credentials:

   ```
   HOST=your-database-host
   USER=your-database-username
   PASSWORD=your-database-password
   DATABASE=your-database-name
   ```

   Make sure to replace the values with your actual MySQL database details.

4. **Run the application**:
   Start the server by running:
   ```bash
   node app.js
   ```

   The server will listen on port `3000`.

## Code Explanation

### 1. **Database Connection**

The following code creates a MySQL connection using the `mysql2` library:

```js
let sql = require('mysql2');

let connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log('failed to connect');
    } else {
        console.log('database connection established');
    }
});

module.exports = connection;
```

- The `mysql2` package is used to establish a connection to the MySQL database using the credentials from the `.env` file.
- The `connection.connect()` function attempts to establish a connection. If successful, it logs `"database connection established"`. If there is an error, it logs `"failed to connect"`.

### 2. **Express Server**

The Express server is created using the following code:

```js
let express = require('express');
let connection = require('./database');
let app = express();
app.use(express.json());
```

- The `express` package is imported, and an instance of the Express app is created.
- The `express.json()` middleware is used to parse incoming requests with JSON payloads.

### 3. **API Routes**

- **GET /database**: This route fetches all the data from the `users` table.

    ```js
    app.get('/database', (req, res) => {
        let qry = 'SELECT * FROM users';
        connection.query(qry, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    });
    ```

    - A SQL query (`SELECT * FROM users`) is executed to retrieve all records from the `users` table.
    - If the query is successful, the result is sent as a response. If there is an error, it is returned in the response.

- **POST /postdata**: This route inserts a hardcoded user record into the `users` table.

    ```js
    app.post('/postdata', (req, res) => {
        let qry = `INSERT INTO users(name, mobile, email, password, token) VALUES('goutham', '9867542310', 'sample@gmail.com', '123456', 'sampleToken')`;
        connection.query(qry, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Data inserted successfully');
            }
        });
    });
    ```

    - A SQL query (`INSERT INTO users(...) VALUES(...)`) is used to insert a hardcoded user record into the database.
    - The response indicates if the insertion was successful or if there was an error.

### 4. **Starting the Server**

The server is started by listening on port `3000`:

```js
app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('server started');
    }
});
```

- The server starts and listens on port `3000`. If there is an error, it is logged; otherwise, it logs `"server started"`.

## Testing the API

1. **Get data**: You can test the `GET /database` route by sending a GET request to:
   ```
   http://localhost:3000/database
   ```

2. **Post data**: You can test the `POST /postdata` route by sending a POST request with any HTTP client (e.g., Postman, curl) to:
   ```
   http://localhost:3000/postdata
   ```

   This will insert a hardcoded user into the `users` table.

## Troubleshooting

- **Database connection errors**: If you see the message `"failed to connect"`, double-check your `.env` file for correct MySQL credentials and ensure that the database is running.
- **Query errors**: If there are issues with SQL queries, verify that the `users` table exists and has the appropriate columns (`name`, `mobile`, `email`, `password`, `token`).
