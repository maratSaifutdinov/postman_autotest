// GET {{baseUrl}}/api/companies

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

let DataJson = pm.response.json().data;

pm.test("Length of JSON with default limit", function () {
    let countLenData = Object.keys(DataJson).length;
    pm.expect(countLenData).to.eql(3);
});

pm.test("Verify offset", function () {
    pm.expect(DataJson[0].company_id).to.eql(1);
});

let schema = {
    "type": "object",
    "properties": {
        "data": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "company_id": {
                        "type": "integer"
                    },
                    "company_name": {
                        "type": "string"
                    },
                    "company_address": {
                        "type": "string"
                    },
                    "company_status": {
                        "type": "string",
                        "enum": ["ACTIVE", "CLOSED", "BANKRUPT"]
                    }
                },
                "required": [
                    "company_id",
                    "company_name",
                    "company_address",
                    "company_status"
                ]
            }
        },
        "meta": {
            "type": "object",
            "properties": {
                "limit": {
                    "type": "integer"
                },
                "offset": {
                    "type": "integer"
                },
                "total": {
                    "type": "integer"
                }
            },
            "required": [
                "total"
            ]
        }
    },
    "required": [
        "data",
        "meta"
    ]
};

pm.test('Response body matches schema', function () {
    pm.response.to.have.jsonSchema(schema);
});

pm.test("Request is made using HTTPS", function () {
    pm.expect(pm.request.url.protocol).to.eql("https");
});

// GET http://send-request.me/api/companies/ | получение данных по незащищенному протоколу "http" 


pm.test("Status code is 301", function () {
    pm.response.to.have.status(301);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers is vaild", function() {
pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
pm.expect(pm.response.headers.get('Location')).to.eql('https://send-request.me/api/companies/');
});

pm.test("Request by http", function() {
pm.expect(pm.request.url.protocol).to.eql("http")
});

// GET {{baseUrl}}/api/companies?status=ACTIVE

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers is valid", function() {
pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive')
});

pm.test("Verify status ACTIVE", function(){
    for(let company of pm.response.json().data){
    pm.expect(company.company_status).to.be.eql("ACTIVE");
    }
});

// GET {{baseUrl}}/api/companies?status=CLOSED

pm.test("Verify status CLOSED", function(){
    for(let company of pm.response.json().data){
    pm.expect(company.company_status).to.be.eql("CLOSED");
    }
});

// GET {{baseUrl}}/api/companies?status=BANKRUPT

pm.test("Verify status BANKRUPT", function(){
    for(let company of pm.response.json().data){
    pm.expect(company.company_status).to.be.eql("BANKRUPT");
    }
});

// GET {{baseUrl}}/api/companies?status=1 | invalid query params status = integer

pm.test("Status code is 422", function () {
    pm.response.to.have.status(422);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("Unprocessable Entity");
});

let schema =  {
  
  "type": "object",
  "properties": {
    "detail": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "loc": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "string"
                }
              ]
            },
            "msg": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "loc",
            "msg",
            "type"
          ]
        }
      ]
    }
  },
  "required": [
    "detail"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

// GET {{baseUrl}}/api/companies/1

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("OK");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Response when correct Accept-languege", function() {
    pm.expect(pm.response.json()).to.have.any.keys("description", "description_lang")
});

if(pm.response.json().description_lang){
    pm.test("description_lang === EN", function() {
        pm.expect(pm.response.json().description_lang[0].translation_lang).to.eql("EN")}
    )};

pm.test("Headers is valid", function() {
pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive')
pm.expect(pm.request.headers.get('Accept-Language')).to.eql('RU')
});


let schema =
{

  "type": "object",
  "properties": {
    "company_id": {
      "type": "integer"
    },
    "company_name": {
      "type": "string"
    },
    "company_address": {
      "type": "string"
    },
    "company_status": {
      "type": "string"
    },
    "description": {
      "type": "string"
    }
  },
  "required": [
    "company_id",
    "company_name",
    "company_address",
    "company_status",
    "description"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

// GET {{baseUrl}}/api/companies/abc | invalid id 

pm.test("Status code is 422", function () {
    pm.response.to.have.status(422);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("Unprocessable Entity");
});

let schema = {

  "type": "object",
  "properties": {
    "detail": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "loc": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "string"
                }
              ]
            },
            "msg": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "loc",
            "msg",
            "type"
          ]
        }
      ]
    }
  },
  "required": [
    "detail"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

// GET {{baseUrl}}/api/companies/123 | несуществующий ID

pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("Not Found");
});

let schema = {
  
  "type": "object",
  "properties": {
    "detail": {
      "type": "object",
      "properties": {
        "reason": {
          "type": "string"
        }
      },
      "required": [
        "reason"
      ]
    }
  },
  "required": [
    "detail"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

// POST {{baseUrl}}/api/users/

pm.collectionVariables.set("user_id", pm.response.json().user_id);
pm.collectionVariables.set("first_name", pm.response.json().first_name);
pm.collectionVariables.set("last_name", pm.response.json().last_name);
pm.collectionVariables.set("company_id", pm.response.json().company_id);

let schema = {
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string",
      "enum": ["Игнат"]
    },
    "last_name": {
      "type": "string",
      "enum": ["Игнат"]
    },
    "company_id": {
      "type": "integer",
      "enum": [1]
    },
    "user_id": {
      "type": "integer"
    }
  },
  "required": [
    "last_name",
    "user_id"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("Created");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// GET {{baseUrl}}/api/users/?limit=10&offset=5

pm.test("Status code is 201", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("OK");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

let schema =
{
  "type": "object",
  "properties": {
    "meta": {
      "type": "object",
      "properties": {
        "limit": {
          "type": "integer"
        },
        "offset": {
          "type": "integer"
        },
        "total": {
          "type": "integer"
        }
      },
      "required": [
        "limit",
        "offset",
        "total"
      ]
    },
    "data": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "first_name": {
              "type": "string"
            },
            "last_name": {
              "type": "string"
            },
            "company_id": {
              "type": "null"
            },
            "user_id": {
              "type": "integer"
            }
          },
          "required": [
            "first_name",
            "last_name",
            "company_id",
            "user_id"
          ]
        }
      ]
    }
  },
  "required": [
    "meta",
    "data"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});

pm.test("required keys", function() {
    pm.expect(pm.response.json()).to.have.any.keys("meta", "data")
});

let DataJson = pm.response.json().data;

pm.test("Length of JSON with default limit", function () {
    let countLenData = Object.keys(DataJson).length;
    pm.expect(countLenData).to.eql(10);
});

pm.test("Verify offset", function () {
    pm.expect(DataJson[0].user_id).to.eql(5);
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

// GET {{baseUrl}}/api/users/abc | invalid id

pm.test("Status code is 422", function () {
    pm.response.to.have.status(422);
});

pm.test("Status code name has string", () => {
  pm.response.to.have.status("Unprocessable Entity");
});

let schema =  {
  
  "type": "object",
  "properties": {
    "detail": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "loc": {
              "type": "array",
              "items": [
                {
                  "type": "string"
                },
                {
                  "type": "string"
                }
              ]
            },
            "msg": {
              "type": "string"
            },
            "type": {
              "type": "string"
            }
          },
          "required": [
            "loc",
            "msg",
            "type"
          ]
        }
      ]
    }
  },
  "required": [
    "detail"
  ]
}

pm.test('Schema is valid', function() {
pm.response.to.have.jsonSchema(schema);
});
