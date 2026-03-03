first create backend folder (npm init -y)
install pacakages-npm install express mongoose dotenv nodemon
create server.js
create config->db.js->use mongodb url
create schema of user->user.js
create controller->authcontroller
our is not hashed till now so we install bcrypt and  then setup it 
after hashing of password then in res dont return password
make routes folder and add controller on which the route hit 
then add jwt authentication make middleware folder and then add jwt logic
now make internship model schema crud operation link user form intership.model->user.model