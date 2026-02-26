first create backend folder (npm init -y)
install pacakages-npm install express mongoose dotenv nodemon
create server.js
create config->db.js->use mongodb url
create schema of user->user.js
create controller->authcontroller
our is not hashed till now so we install bcrypt and  then setup it 
after hashing of password then in res dont return password