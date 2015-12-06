var assert = require("assert");
var run_base_property_definition_tests_1 = require("./run-base-property-definition-tests");
var run_scoped_definition_tests_1 = require("./run-scoped-definition-tests");
function runClassPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("property " + property.name, function () {
        run_base_property_definition_tests_1.runBasePropertyDefinitionTests(definition, property);
        run_scoped_definition_tests_1.runScopedDefinitionTests(definition, property.scope);
        it("should be " + (property.isAccessor ? "an accessor" : "not an accessor"), function () {
            assert.equal(definition.isAccessor, property.isAccessor || false);
        });
        it("should be " + (property.isReadonly ? "readonly" : "not readonly"), function () {
            assert.equal(definition.isReadonly, property.isReadonly || false);
        });
    });
}
exports.runClassPropertyDefinitionTests = runClassPropertyDefinitionTests;

//# sourceMappingURL=run-class-property-definition-tests.js.map
