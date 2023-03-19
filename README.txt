This repo is composed of both a reactjs frontend client and a backend java api server.  The intended use is for demo and learning purposes only and is a step-for-step build based on the similarily named course from Amigoscode.   

The frontend react files can be found in src/frontend.
The backend java files can be found in src/main.


***********************************
***  IDE compile and run notes ****
***********************************

Frontend client
-----------
1. Make sure node is installed
2. From src/frontend directory, run "npm start" (or first "npm install" to generate dependencies)
3. Browse to localhost:3000

API server
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


