var assert = require("assert");
var expressions_1 = require("./../../expressions");
function runTypeExpressionedDefinitionTests(definition, structure) {
    describe("typeExpression", function () {
        if (structure.typeExpression == null) {
            it("should not have a type expression", function () {
                assert.equal(definition.typeExpression, null);
            });
        }
        else {
            expressions_1.runTypeExpressionTests(definition.typeExpression, structure.typeExpression);
        }
    });
}
exports.runTypeExpressionedDefinitionTests = runTypeExpressionedDefinitionTests;

//# sourceMappingURL=run-type-expressioned-definition-tests.js.map
