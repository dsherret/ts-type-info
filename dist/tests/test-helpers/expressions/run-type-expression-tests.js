var assert = require("assert");
function runTypeExpressionTests(typeExpression, structure) {
    it("should have a type of " + structure.text, function () {
        assert.equal(typeExpression.text, structure.text);
    });
}
exports.runTypeExpressionTests = runTypeExpressionTests;

//# sourceMappingURL=run-type-expression-tests.js.map
