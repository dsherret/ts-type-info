var assert = require("assert");
var expressions_1 = require("./../../expressions");
function runDefaultExpressionedDefinitionTests(definition, structure) {
    describe("defaultExpression", function () {
        if (structure.defaultExpression != null) {
            it("should have the default expression", function () {
                expressions_1.runExpressionTests(definition.defaultExpression, structure.defaultExpression);
            });
        }
        else {
            it("should not have a default expression.", function () {
                assert.equal(definition.defaultExpression, null);
            });
        }
    });
}
exports.runDefaultExpressionedDefinitionTests = runDefaultExpressionedDefinitionTests;

//# sourceMappingURL=run-default-expressioned-definition-tests.js.map
