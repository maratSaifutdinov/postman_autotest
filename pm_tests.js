// Authentication/Registration

// POST {{base_url}}/api/{{api_version}}/auth/by-phone | Аутентификация с помощью номера телефона

pm.test("Status code is 204", function () {
    pm.response.to.have.status(204);
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has("authorization")).to.be.true;
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
    pm.expect(pm.response.headers.get('Cache-Control')).to.eql('no-store, no-cache, must-revalidate');
    pm.expect(pm.response.headers.get('Access-Control-Allow-Methods')).to.eql('POST,OPTIONS');

});

pm.test("Token received", function () {
    pm.expect(pm.response.headers.get('Token')).to.be.a("string");
});

// POST {{base_url}}/api/{{api_version}}/auth/by-phone | Номер телефона не подтвержден

pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
    pm.expect(pm.response.headers.get('Cache-Control')).to.eql('no-store, no-cache, must-revalidate');
    pm.expect(pm.response.headers.get('Access-Control-Allow-Methods')).to.eql('POST,OPTIONS');
});

pm.test("Token header is not set in the response headers", function () {
    pm.expect(pm.response.headers.get('Token')).to.not.exist;
});

let schema = JSON.parse(pm.environment.get("notconfirmedPhoneNumber"));

pm.test('Schema is valid', function () {
  pm.response.to.have.jsonSchema(schema);
});

// GET {{base_url}}/api/{{api_version}}/product/{{id}} | Получение информации о товаре по ID
 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has string", () => {
    pm.response.to.have.status('OK');
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Request is made using HTTPS", function () {
    pm.expect(pm.request.url.protocol).to.eql('https');
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has('PHPSESSID')).to.be.true;
});

let schema = JSON.parse(pm.environment.get('BasicInformation'));

pm.test('Schema is valid', function () {
  pm.response.to.have.jsonSchema(schema);
});

pm.test("Expected ID", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.product.id).to.eql(******);
});

pm.test("Expected Type", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.product.type).to.eql('*******');
});

// GET {{http_url}}/api/{{api_version}}/product/{{id}} | Получение данных по незащищенному протоколу "HTTP"

pm.test("Status code is 307", function () {
    pm.response.to.have.status(307);
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers is vaild", function() {
pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
pm.expect(pm.response.headers.get('Location')).to.eql('http://***********************');
});

pm.test("Request by http", function() {
pm.expect(pm.request.url.protocol).to.eql("http")
});

// GET {{base_url}}/api/{{api_version}}/product/{{Non_existent_ID}}  | Получение информации о товаре по несуществующему ID

pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Status code name has string", () => {
    pm.response.to.have.status('Not Found');
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has('PHPSESSID')).to.be.true;
});

let schema = JSON.parse(pm.environment.get('notFound'));

pm.test('Schema is valid', function () {
    pm.response.to.have.jsonSchema(schema);
});

// GET {{base_url}}/api/{{api_version}}/product/article/{{article}} | Получение основной информации о товаре по артикулу

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has string", () => {
    pm.response.to.have.status("OK");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Request is made using HTTPS", function () {
    pm.expect(pm.request.url.protocol).to.eql("https");
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has("PHPSESSID")).to.be.true;
});

let schema = JSON.parse(pm.environment.get("InformationArticle"));

pm.test('Schema is valid', function () {
    pm.response.to.have.jsonSchema(schema);
});

pm.test("Expected Article", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData.data.product.article).to.eql('*********');
});

// GET {{base_url}}/api/{{api_version}}/product/article/{{nonExistentArticle}} | Получение информации о товаре по несуществующему артикулу

pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

pm.test("Status code name has string", () => {
    pm.response.to.have.status("Not Found");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has("PHPSESSID")).to.be.true;
});

let schema = JSON.parse(pm.environment.get("notFound"));

pm.test('Schema is valid', function () {
    pm.response.to.have.jsonSchema(schema);
});

// GET {{base_url}}/api/{{api_version}}/product/{{id}}/availabilities | Получение данных о наличие товара в магазине/на складах

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Status code name has string", () => {
    pm.response.to.have.status("OK");
});

pm.test("Response time is less than 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Request is made using HTTPS", function () {
    pm.expect(pm.request.url.protocol).to.eql("https");
});

pm.test("Headers are valid", function () {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json; charset=utf-8');
    pm.expect(pm.response.headers.get('Connection')).to.eql('keep-alive');
});

pm.test('Test Cookie', function () {
    pm.expect(pm.cookies.has("PHPSESSID")).to.be.true;
});

let schema = JSON.parse(pm.environment.get("areAvailable"));

pm.test('Schema is valid', function () {
  pm.response.to.have.jsonSchema(schema);
});

