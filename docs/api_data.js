define({ "api": [
  {
    "type": "delete",
    "url": "/api/admin/del/:id",
    "title": "Delete User Row",
    "name": "Delete_User",
    "group": "Admin",
    "description": "<p>This endpoint is restricted to members with admin permissions and deletes the user row in the database.</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers",
            "description": "<p>This is the Request headers</p>"
          },
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers.Authorization",
            "description": "<p>This is the Autorization object within the headers</p>"
          },
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "headers.Authorization.token",
            "description": "<p>This is the Autorization token recieved and stored upon login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header-Example:",
          "content": " {\n   \"headers\": \"Authorizaton\": {\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"deleted\": true,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Response",
            "description": "<p>Response Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Response.updated",
            "description": "<p>Boolean Value Indicating successful User Update</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Failed to submit one or more REQUIRED field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   message: \"Internal Server Error, failed to delete User.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/routes/admin/adminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/api/users",
    "title": "Request All User Data",
    "name": "Get_Users",
    "description": "<p>This Endpoint is used by Authorized users with granted permissions to retrieve all stored users from the database</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "group": "Admin",
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers",
            "description": "<p>This is the Request headers</p>"
          },
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers.Authorization",
            "description": "<p>This is the Autorization object within the headers</p>"
          },
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "headers.Authorization.token",
            "description": "<p>This is the Autorization token recieved and stored upon login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header-Example:",
          "content": " {\n   \"headers\": \"Authorizaton\": {\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": 1,\n    \"username\": \"omar\",\n    \"password\": \"$2a$10$SQpZI3OokvrWR80bFmrlD.BNVSlqbHDGhZRgqhrWr8bhbHgyBH7Uq\",\n    \"role\": \"admin\"\n  },\n  {\n    \"id\": 2,\n    \"username\": \"adam\",\n    \"password\": \"$2a$10$BlMZckrdp5QBVSdW/ZfncOyTlBXRGoFjFZ5h9UOm4mfbH2Jbvuvn6\",\n    \"role\": \"user\"\n  },\n  {\n    \"id\": 3,\n    \"username\": \"victor\",\n    \"password\": \"$2a$10$hVJEKAlxlWAKHaBhDu7W9uxWouxNqO5wJS0tPPM65uYCzSpMgPcpC\",\n    \"role\": \"user\"\n  },\n  ...\n]",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Users",
            "description": "<p>Array of stored User Objects</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Users.User",
            "description": "<p>User Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "Users.User.id",
            "description": "<p>Users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Users.User.username",
            "description": "<p>Users Username</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Users.User.password",
            "description": "<p>Users hashed and salted password</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Users.User.role",
            "description": "<p>Users Permissions</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>You are not authorized to access this end point</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Bad Request\n{\n  \"message\": \"You are not authorized to access this end point\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/auth/authRoutes.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/users/:id",
    "title": "Update User Row",
    "name": "Update_User",
    "group": "Admin",
    "description": "<p>This endpoint is restricted to members with admin permissions and directly modifies the user row in the database. This can be used to grant additional permissions needed or update user details.</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "header": {
      "fields": {
        "Authorization": [
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers",
            "description": "<p>This is the Request headers</p>"
          },
          {
            "group": "Authorization",
            "type": "Object",
            "optional": false,
            "field": "headers.Authorization",
            "description": "<p>This is the Authorization object within the headers</p>"
          },
          {
            "group": "Authorization",
            "type": "String",
            "optional": false,
            "field": "headers.Authorization.token",
            "description": "<p>This is the Authorization token recieved and stored upon login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Header-Example:",
          "content": " {\n   \"headers\": \"Authorization\": {\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib21hciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Input ",
          "content": "{\n  \"username\": \"homer\"\n}\n\n| or | \n\n{\n  \"role\": \"admin\"\n}\n\n| or |\n\n{\n  \"username\": \"homer\",\n  \"role\": \"admin\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Updated-User",
            "description": "<p>User object with 1 or more optional field changed</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "User.username",
            "description": "<p>Updated username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "User.role",
            "description": "<p>Users Roles for permissions</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"updated\": true,\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Response",
            "description": "<p>Response Object</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Response.updated",
            "description": "<p>Boolean Value Indicating successful User Update</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Submission",
            "description": "<p>Failed to submit one or more REQUIRED field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n   message: \"Internal Server Error, failed to update User.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/routes/admin/adminRouter.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register New User",
    "name": "Register_User",
    "group": "Authentication",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": " {\n   \"username\": \"doe\",\n   \"password\": \"thisIsHashedAndSalted\",\n }\n\n| or |\n\n {\n   \"username\": \"doe\",\n   \"password\": \"thisIsHashedAndSalted\",\n   \"role\": \"Lead Dev\",\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "newUser",
            "description": "<p>New User</p>"
          },
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "newUser.id",
            "description": "<p>New user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newUser.password",
            "description": "<p>New Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "role",
            "optional": true,
            "field": "newUser.role",
            "defaultValue": "user",
            "description": "<p>Users Permissions</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"username\": \"doe\",\n  \"role\": \"user\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "newUser",
            "description": "<p>New User Object</p>"
          },
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "newUser.id",
            "description": "<p>New users id.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "newUser.username",
            "description": "<p>Users Username</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "newUser.role",
            "description": "<p>Users Permissions</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422-Unprocessable-entity",
            "description": "<p>Failed to submit one or more REQUIRED field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\":\"Please fill out a username & password before submitting\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/auth/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/Login",
    "title": "User Login",
    "name": "User_Login",
    "group": "Authentication",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "examples": [
        {
          "title": "Input ",
          "content": "{\n   \"username\": \"homer\",\n   \"password\": \"password\"\n }",
          "type": "json"
        }
      ],
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "User",
            "description": "<p>User</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "User.id",
            "description": "<p>user id.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "User.password",
            "description": "<p>Password.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n  \"message\": \"Hello homer\",\n  \"token\": \"eyJybGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijoib31hciIsInJvbGUiOiJhZG5pbiIsIilhdCI6MTU1NTMxMjg4MCwiZXhwIjoxNTg2ODQ4ODgwfQ.Utm5C1v-_9Ql5tDPq7GvtWVZhYYpCZUz3q8bVCU2OwM\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Response",
            "description": "<p>Response Object</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Response.message",
            "description": "<p>Greeting Message to User</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Response.token",
            "description": "<p>Authentication token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "422",
            "description": "<p>Failed to submit one or more REQUIRED field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"message\":\"Please fill out a username & password before submitting\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api/auth/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/main.js",
    "group": "C__Users_elper_Desktop_work_Project_III_simpsonsays_docs_main_js",
    "groupTitle": "C__Users_elper_Desktop_work_Project_III_simpsonsays_docs_main_js",
    "name": ""
  }
] });
