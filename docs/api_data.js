define({ "api": [
  {
    "type": "post",
    "url": "/auth/",
    "title": "POST /auth/",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "code",
            "description": "<p>The request code we get from 1st part of explicit Oauth2</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "ErrorResponse(OneAuth Server Error: POST)",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"code\": \"500\",\n  \"error\": {\n      \"message\": \"Could not post data to OneAuth API(OneAuth Server POST Error).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "ErrorResponse(Database Error: FIND)",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"code\": \"500\",\n  \"error\": {\n      \"message\": \"Could not find in OneAuth Table(Database Error: FIND).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "ErrorResponse(OneAuth Server Error: GET)",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"code\": \"500\",\n  \"error\": {\n      \"message\": \"Could not get details from OneAuth API(OneAuth Server Error: GET).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "ErrorResponse(Database Error: CREATE)",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"success\": false,\n  \"code\": \"500\",\n  \"error\": {\n      \"message\": \"Could not create in OneAuth Table(Database Error: CREATE).\"\n  }\n}",
          "type": "json"
        },
        {
          "title": "ErrorResponse(Unauthorized)",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"success\": false,\n  \"code\": \"500\",\n  \"error\": {\n      \"message\": \"Accessible to only CB employees(Unauthorized)\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "SuccessResponse(User Exists)",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"code\": \"200\",\n  \"token\": \"Random Token\"\n\n}",
          "type": "json"
        },
        {
          "title": "SuccessResponse(New User)",
          "content": "HTTP/1.1 201 Created\n{\n  \"success\": true,\n  \"code\": \"201\",\n  \"token\": \"Random Token\"\n\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routers/api/auth.js",
    "groupTitle": "Auth",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/auth/"
      }
    ]
  },
  {
    "type": "get",
    "url": "/leads/",
    "title": "GET /leads/",
    "name": "GetLeads",
    "group": "Leads",
    "version": "0.0.0",
    "filename": "src/routers/api/leads.js",
    "groupTitle": "Leads",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/leads/"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/add",
    "title": "POST /users/add",
    "name": "AddUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "contact",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "centre",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/api/users.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/users/add"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "DELETE /users/:id",
    "name": "DeleteUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/api/users.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/users/:id"
      }
    ]
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "PUT /users/:id",
    "name": "EditUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "contact",
            "description": "<p>Phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "centre",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/api/users.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "GET /users/:id",
    "name": "GetUserById",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routers/api/users.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/users/:id"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "GET /users/",
    "name": "GetUsers",
    "group": "Users",
    "version": "0.0.0",
    "filename": "src/routers/api/users.js",
    "groupTitle": "Users",
    "sampleRequest": [
      {
        "url": "https://cb-leadtracker.herokuapp.com/api/users/"
      }
    ]
  }
] });
