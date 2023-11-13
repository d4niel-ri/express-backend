# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* Fs

---

## How to Run
```
npm start
```

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### GET /products

> Get all products

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [
    <list_of_products>
  ],
  "status": "Success"
}
```
  
---  
  
### GET /products?id=

> Get product by ID

_Request Queries_
```
?id=<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
  },
  "status": "Success"
}
```

_Response (404)_
```
{
  "message": "Data Not Found"
}
```

---

### POST /products

> Create product

_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <name>,
  "description": <description>,
  "price": <price>,
  "quantity_in_stock": <quantity_in_stock>, // optional
}
```

_Response (201)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{
  "status": "Validation Failed",
  "message": "\"description\" is required"
}
```

_Response (400 - Duplicate Name Product)_
```
{
  "message": "Data with this name already existed"
}
```

---

### PUT /products/:id

> Update product (except `quantity_in_stock`)

_Request Params_
```
/<id>
```
_Request Header_
```
not needed
```

_Request Body_
```
{
  "name": <name>, // optional
  "description": <description>, //optional
  "price": <price>, // optional
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{ 
  \"quantity_in_stock\" is not allowed
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (400 - Duplicate Name Product)_
```
{
  "message": "Data with this name already existed"
}
```

---

### PUT /products/:id/increase

> Increase stock of product

_Request Params_
```
/<id>
```
_Request Header_
```
not needed
```

_Request Body_
```
{
  "stock": <stock>
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{ 
  "status": "Validation Failed",
  "message": "\"stock\" must be a positive number"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "Data Not Found"
}
```

---

### PUT /products/:id/decrease

> Decrease stock of product

_Request Params_
```
/<id>
```
_Request Header_
```
not needed
```

_Request Body_
```
{
  "stock": <stock>
}
```

_Response (200)_
```
{
  "data": {
    "id": <id>
    "name": <name>,
    "description": <description>,
    "price": <price>,
    "quantity_in_stock": <quantity_in_stock>
  },
  "status": "Success"
}
```

_Response (400 - Validation Error)_
```
{ 
  "status": "Validation Failed",
  "message": "\"stock\" must be a positive number"
}
```

_Response (404 - Error Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (400 - Stock is lower than requested)_
```
{
  "message": "Stock is now lower than requested"
}
```

---

### DELETE /products/:id

> Delete product

_Request Params_
```
/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "data": [<list_of_products>],
  "message": "Success"
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```
  
---
