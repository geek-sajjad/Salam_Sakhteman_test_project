# REST API using express.js and mongodb

## How to install and run project
### create .env file
#### add mongodb databse url to .env file
#### add strong secret key string for JWT tokens
```
DATABASE_URL={DATABASE_URL_HERE}
JWT_TOKEN={SECRET_KEY}
```
### Run npm install and start
```
npm install
```
```
npm start
```


### API Endpoints
                    
URL  | Method | Action
------------- | ------------- | -------------
/product  | GET | Get list of products
/product  | POST | Create new Product 
/product | PATCH | Update existing product
/product | DELETE | Delete existing product
/login | POST | login using JWT token
/signup | POST | signup using JWT token

### Login and signup
####  Login
by default when running project admin user created for the firsttime:
credentails : email: user@me.com, password: 123456
for login make POST request to this url

[note: for security change this credintail after first login]

##### URL : http://localhost:3000/login
request body in json format:
```json
{
    "email":"user@me.com",
    "password":"123456"
}
```

response json format:
```json
{
    "id": "6261539be497a679f359535b",
    "name": "admin",
    "email": "user@me.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxNTM5YmU0OTdhNjc5ZjM1OTUzNWIiLCJpYXQiOjE2NTA3MDY2NTAsImV4cCI6MTY1MTMxMTQ1MH0.5JD4rYK7lccyZo-kInqJmZtaHxi7NNIRFQw5Z_-i2-E"
}
```
####  Signup
for signup use this url and POST method

[note: by default role for new users is USER]

##### URL : http://localhost:3000/singup
request body in json format:
```json
{
    "email":"new@me.com",
    "password":"123456",
    "name": "new"
}
```

response json format:
```json
{
    "name": "new",
    "email": "new@me.com",
    "id": "6263c9591430dd81804b491b",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYzYzk1OTE0MzBkZDgxODA0YjQ5MWIiLCJpYXQiOjE2NTA3MDY3NzcsImV4cCI6MTY1MTMxMTU3N30.6lCSmXyPD12ndEJ3e6THx3lGsyBHY0EkoY1_w6TJWGw"
}
```
### CRUD Operation Example
#### -  Serach and filter and GET list of all products
you can use query param for filtering data, (note: you can use only data in details object for filtering products list)
example:
method: GET
##### URL : http://localhost:3000/product?size:29&color=red
response example:
```json
[
	{
		"_id": "626167482b45b589eafad2cf",
		"name": "name",
		"imageUrl": "exmaple.com/image",
		"price": 112.554,
		"details": {
		  "size": 29,
		  "رنگ": "red"
		},
		"__v": 0
	  },
]
```
#### -  Create new Product
you can use query param for filtering data, (note: you can use only data in details object for filtering products list)
example:
method: POST
##### URL : http://localhost:3000/product
for operation CREATE, DELETE, UPDATE you need logedin as admin user using jwt tokens:
for geting admin toekn , first login as a admin user using auth urls.

include your jwt token in header like this:
```json
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxNDcyYjk5NDdlNWQ2NzEzZTc1YzIiLCJpYXQiOjE2NTA1NDM5MDYsImV4cCI6MTY1MTE0ODcwNn0.0ZZySC02OjXRJAgrcOmAF1HeAsvmN_qIrp8O3hr3KZ4"
}
```


request body in json format:
```json
{
	"name": "تیشرت نایکی",
	"imageUrl": "http//example.com",
	"price" : 215.99,
	"details": {
		"color: "red",
		"size" : 32
	}
}
```
you can add as much data in details object as a key value pairs as you want.
for example:
```json
{
	"name": "تیشرت نایکی",
	"imageUrl": "http//example.com",
	"price" : 215.99,
	"details": {
		"new-data": "data",
		"anotherData": 29,
		"anotherData2": "newData"
	}
}
```
#### -  update existing product
you can update existing product using productId
example:
method: PATCH
##### URL : http://localhost:3000/product
you need to add jwt token in header section
```json
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxNDcyYjk5NDdlNWQ2NzEzZTc1YzIiLCJpYXQiOjE2NTA1NDM5MDYsImV4cCI6MTY1MTE0ODcwNn0.0ZZySC02OjXRJAgrcOmAF1HeAsvmN_qIrp8O3hr3KZ4"
}
```
request body:
```json
{
    "id": "6261674c2b45b589eafad2d5",
    "name": "new Name",
    "price": 45
}
```

#### -  delete existing product
you can delete existing product using productId
example:
method: DELETE
##### URL : http://localhost:3000/product
you need to add jwt token in header section
```json
{
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYxNDcyYjk5NDdlNWQ2NzEzZTc1YzIiLCJpYXQiOjE2NTA1NDM5MDYsImV4cCI6MTY1MTE0ODcwNn0.0ZZySC02OjXRJAgrcOmAF1HeAsvmN_qIrp8O3hr3KZ4"
}
```

request body:
```json
{
    "id": "6261674d2b45b589eafad2d8"
}
```

### Translating Product details object key
for translating Product details object key use "dictionares/product.js" and edit the file:
example:
```js
module.exports = {
  color: 'رنگ',
  size: "اندازه"
}
```
