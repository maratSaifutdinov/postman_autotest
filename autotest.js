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

// GET http://send-request.me/api/companies/ 
// Получение данных по незащищенному протоколу "http" 


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
