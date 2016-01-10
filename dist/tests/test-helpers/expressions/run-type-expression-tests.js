var assert = require("assert");
function runTypeExpressionTests(typeExpression, name) {
    if (typeExpression == null) {
        throw "Type should not be null.";
    }
    it("should have a type of " + name, function () {
        assert.equal(typeExpression.text, name);
    });
}
exports.runTypeExpressionTests = runTypeExpressionTests;

//# sourceMappingURL=run-type-expression-tests.js.map
