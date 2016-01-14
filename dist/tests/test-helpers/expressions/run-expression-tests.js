var assert = require("assert");
function runExpressionTests(expression, structure) {
    it("should have the text " + structure.text, function () {
        assert.equal(expression.text, structure.text);
    });
}
exports.runExpressionTests = runExpressionTests;

//# sourceMappingURL=run-expression-tests.js.map
