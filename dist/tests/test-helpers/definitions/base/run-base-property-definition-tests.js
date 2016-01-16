var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_typed_definition_tests_1 = require("./run-typed-definition-tests");
function runBasePropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, structure);
        run_typed_definition_tests_1.runTypeExpressionedDefinitionTests(definition, structure);
        it("should be " + (structure.isOptional ? "optional" : "not optional"), function () {
            assert.equal(definition.isOptional, typeof structure.isOptional === "boolean" ? structure.isOptional : false);
        });
    });
}
exports.runBasePropertyDefinitionTests = runBasePropertyDefinitionTests;

//# sourceMappingURL=run-base-property-definition-tests.js.map
