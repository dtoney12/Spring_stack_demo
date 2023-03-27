# Spring Stack Demo

This repo is composed of both a reactjs frontend client and a backend java api server.  The intended use is for demo and learning purposes only.



<a href="http://springbootreactfullstack-env.eba-33w2fs3q.us-east-1.elasticbeanstalk.com/">See the live demo!</a>

<img width="1440" alt="Screen Shot 2023-03-25 at 8 17 43 PM" src="https://user-images.githubusercontent.com/24409524/228086711-7213d708-4f23-4c23-9b14-985836eb89a9.png">



***********************************
***  IDE compile and run notes ****
***********************************

Frontend client (The frontend react files can be found in src/frontend)
-----------
1. Make sure node is installed
2. From src/frontend directory, run "npm start" (or first "npm install" to generate dependencies)
3. Browse to localhost:3000

API server (The backend java files can be found in src/main)
-----------
1. Make sure postgresql is running
2. create database amigoscode
3. Test db connection to confirm that src/main/resources/application.properties/spring.datasource.url is set to postgresql database url (jdbc:postgresql://localhost:5432/amigoscode)
4. Build maven dependencies in IDE or via command line "./mvnw package" in project root directory (Mac)
5. Confirm that .jar file has been compiled in (root directory)/target
6. Run in IDE or via command line "java -jar (jar file)" in (root directory)/target folder (Mac)
7. Connect to localhost:8080/api/v1/students to test server


Test functionality
----------------
From frontend (localhost:3000), add a student via "Add Student" button.

From API server (localhost:8080/api/v1/students), refresh page to fetch newly added students output as JSON objects (as reflected in the database)


