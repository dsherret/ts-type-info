var assert = require("assert");
var run_named_definition_tests_1 = require("./run-named-definition-tests");
var run_typed_definition_tests_1 = require("./run-typed-definition-tests");
function runPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Property definition should not be null.";
    }
    describe("property " + property.name, function () {
        run_named_definition_tests_1.runNamedDefinitionTests(definition, property.name);
        run_typed_definition_tests_1.runTypedDefinitionTests(definition, property.type);
        it("should be " + (property.isOptional ? "optional" : "not optional"), function () {
            assert.equal(definition.isOptional, typeof property.isOptional === "boolean" ? property.isOptional : false);
        });
    });
}
exports.runPropertyDefinitionTests = runPropertyDefinitionTests;

//# sourceMappingURL=run-property-definition-tests.js.map
