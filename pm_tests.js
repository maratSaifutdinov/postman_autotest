// GET {{base_url}}/api/{{api_version}}/product/{{id}} | Получение информации о товаре по ID
 
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

let schema = JSON.parse(pm.environment.get("BasicInformation"));

pm.test('Schema is valid', function () {
  pm.response.to.have.jsonSchema(schema);
});
