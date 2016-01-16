var assert = require("assert");
var run_base_property_definition_tests_1 = require("./run-base-property-definition-tests");
var expressions_1 = require("./../../expressions");
function runObjectPropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        run_base_property_definition_tests_1.runBasePropertyDefinitionTests(definition, structure);
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
