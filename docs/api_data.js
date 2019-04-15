define({ "api": [
  {
    "type": "get",
    "url": "/api/users",
    "title": "Request All User Data",
    "name": "Get_Users",
    "permission": [
      {
        "name": "Admin"
      }
    ],
    "group": "Admin",
    "version": "0.0.0",
    "filename": "./api/auth/authRoutes.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login user",
    "name": "Login_User",
    "group": "Authentication",
    "version": "0.0.0",
    "filename": "./api/auth/authRoutes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Registers New User",
    "name": "Register_User",
    "group": "Authentication",
    "parameter": {
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"username\": \"doe\",\n  \"role\": \"user\"\n}.",
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
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": 1,\n  \"username\": \"doe\",\n  \"password\": \"password\"\n  \"role\": \"user\"\n}",
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
            "field": "Submission",
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
