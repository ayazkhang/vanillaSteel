# Project Setup Guide

This guide will walk you through setting up and running a project, both with and without Docker. The project involves a Node.js application, a PostgreSQL database, Sequalize ORM, MUI, Redux, and providing API endpoints.

## Setting Up With Docker

1. **Prerequisites:**
- Ensure you have Docker installed on your system.
- Make sure that ports 5000, 5432, 3000, and 8080 are available.

2. **Build and Start Docker Containers:**
- cd root
    ```bash
    docker-compose up
    ```

3. **Accessing pgAdmin:**
- After starting the Docker containers or if you have a locally installed PostgreSQL database, visit:
      `http://localhost:8080`

Once the setup is complete, interact with the project's API endpoints hosted at:
`http://localhost:5000/`


### 4. API Endpoints:

#### 4.1. Get all Inventories (GET):
- No parameters required.

    ```bash
    http://localhost:5000/api/inventory
    ```


#### 4.2. create new Inventory (POST):
- Pass the below in formdata or raw json 
    productNumber: number;
    material: string;
    form: string;
    choice: string;
    grade: string;
    surface: string;
    finish: string;
    quantity: number;
    weight: number;
    length?: number;
    width?: number;
    height?: number;
    thickness?: number;
    outerDiameter?: number;
    wallThickness?: number;
    webThickness?: number;
    flangeThickness?: number;
    certificates?: string;
    location: string;
    ```bash
    http://localhost:5000/api/inventory
    ```   


#### 5. Prefences Matching (GET):
- CSV file is required.
file: CSV File
    ```bash
    http://localhost:5000/api/preferences/upload
    ```

## Setting Up Without Docker

6. **Prerequisites:**
- Ensure you have PostgreSQL installed on your system.
- Setup the database credentials for the PostgreSQL setup.

7. **Navigate to the project's root directory:**
    ```bash
    cd root/back-end
    ```

8. **Database Setup:**
    ```bash
    cd root/config
    ```
    
- Change the database config as per your setup:
    - Host: localhost
    - User: postgres
    - Password: postgres
    - Database: postgres
    - Port: 5432

9. **Install Dependencies:**
    ```bash
    npm install
    ```

10. **Create Build:**
    ```bash
    npm run build

11. **Run Migrations for creating tarrif table:**
- Make sure that you have database postgres connected with the app
    ```bash
    npx sequelize-cli db:migrate
    ```

12. **Run Seeders for inserting dummy data**
    ```bash
    npx sequelize-cli db:seed:all
    ```

13. **Run the test:**
    ```bash
    npm run test
    ```

14. **Run the project:**
    ```bash
    npm run start
    ```


15. **Setting React:**
    ```bash
    cd front-end 
    ```

16. **Install the project's dependencies by running:**
- cd front-ent
    ```bash
    npm install
    ```

17. **Run the project:**
    ```bash
    npm run start
    ```    
Thank you for your consideration. Follow these instructions to set up and run the project successfully.
    