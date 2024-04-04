# Project Name

PTITQuiz is a multiple choice quiz website with backend implementation using MySQL. 
This project is developed as an assignment for a web development course.

## Installation

To install follow these steps.

1. Clone the repository from GitHub:

    ```bash
   git clone https://github.com/PhamVHung/mcq-api-tesing.git
   
2. Navigate to the backend directory:

    ```bash
   cd test-api/backend
    ```
   
3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Set up the MySQL database:

   - Install MySQL if you haven't already.
   - Create a new MySQL database for the project or use the `script.sql` file.
   - Update the database configuration in `.env` file with your MySQL credentials.

5. Set up the environment:
    - Create a `.env` file in your root directory of your project
    - Add the necessary environment variables to the `.env` file
   
    ```
    PORT=8080

    DB_HOST="localhost"
    DB_PORT=3306
    DB_USER="your_db_username"
    DB_PASSWORD="your_db_password"
    DB_NAME="your_db_name"
    
    NODE_ENV="development"
    
    JWT_SECRET=your_jwt_secret
   ```

6. Start the `Express.js` server:
    ```bash
    npm start
   ```
   - You can customize the start command from `package.json`
    ```
   "type": "module",
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon backend/server.js"
    },
   ```
    


## Usage

Once the server is running, you can start testing the api 
