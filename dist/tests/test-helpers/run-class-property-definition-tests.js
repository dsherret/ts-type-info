var run_property_definition_tests_1 = require("./run-property-definition-tests");
var run_scoped_definition_tests_1 = require("./run-scoped-definition-tests");
function runClassPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("property " + property.name, function () {
        run_property_definition_tests_1.runPropertyDefinitionTests(definition, property);
        run_scoped_definition_tests_1.runScopedDefinitionTests(definition, property.scope);
    });
}
exports.runClassPropertyDefinitionTests = runClassPropertyDefinitionTests;

//# sourceMappingURL=run-class-property-definition-tests.js.map
