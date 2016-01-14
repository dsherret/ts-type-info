var assert = require("assert");
var base_1 = require("./../base");
var expressions_1 = require("./../expressions");
function runTypeParameterDefinitionTests(definition, structure) {
    describe("type parameter " + structure.name, function () {
        base_1.runNamedDefinitionTests(definition, structure);
        describe("constraint", function () {
            if (structure.constraintTypeExpression == null) {
                it("should not have a constraintTypeExpression", function () {
                    assert.equal(definition.constraintTypeExpression, null);
                });
            }
            else {
                expressions_1.runTypeExpressionTests(definition.constraintTypeExpression, structure.constraintTypeExpression);
            }
        });
    });
}
exports.runTypeParameterDefinitionTests = runTypeParameterDefinitionTests;

//# sourceMappingURL=run-type-parameter-definition-tests.js.map
