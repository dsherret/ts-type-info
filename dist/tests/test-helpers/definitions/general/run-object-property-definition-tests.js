var assert = require("assert");
var base_1 = require("./../base");
var expressions_1 = require("./../../expressions");
function runObjectPropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        base_1.runBasePropertyDefinitionTests(definition, structure);
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
exports.runObjectPropertyDefinitionTests = runObjectPropertyDefinitionTests;

//# sourceMappingURL=run-object-property-definition-tests.js.map
