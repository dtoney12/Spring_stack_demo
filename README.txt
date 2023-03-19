INSTANTIATE DOCKER NETWORK LOCALLY
	docker network create spring_demo_net

INSTANTIATE DOCKER POSTGRES LOCALLY
	docker run --name db -p 5432:5432 --network spring_demo_net -v "$PWD:/var/lib/postgresql/data" -e POSTGRES_PASSWORD=password -d postgres:alpine

COMPILE MAVEN/JIB REMOTE DOCKERHUB
	./mvnw clean install jib:build -Djib.to.image=dtoney12/spring-react-fullstack:v2    

COMPILE MAVEN/JIB PROFILE TO REMOTE DOCKERHUB
	./mvnw clean install -P build-frontend -P jib-push-to-dockerhub -Dapp.image.tag=3 

VIEW DOCKER RUNNING CONTAINERS
	docker container ls

COMPILE MAVEN/JIB LOCAL DOCKER
	./mvnw compile jib:dockerBuild -Djib.to.image=springboot-react-fullstack:v3  	


RUN DOCKER IMAGE
	docker run --network=spring_demo_net --name fullstack -p 8080:8080 springboot-react-fullstack:v3
	docker run --name fullstack -p 8080:8080 fullstack:v3 --network=spring_demo_net   *** PROBABLY INVALID ***

CONNECT TO LOCAL POSTGRES THROUGH DOCKER PSQL
	docker run -it --rm --network=spring_demo_net postgres:alpine psql -h db -U postgres
	
CONNECT TO AWS POSTGRES THROUGH DOCKER PSQL
	docker run -it --rm postgres:alpine \                                            
	psql -h awseb-e-rzrqv5u5ad-stack-awsebrdsdatabase-w6lvtuleqfvy.cpxdvaypud4n.us-east-1.rds.amazonaws.com -U amigoscode -d postgre

testings
