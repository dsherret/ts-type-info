var run_base_property_definition_tests_1 = require("./../run-base-property-definition-tests");
var run_scoped_definition_tests_1 = require("./../run-scoped-definition-tests");
function runStaticPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("property " + property.name, function () {
        run_base_property_definition_tests_1.runBasePropertyDefinitionTests(definition, property);
        run_scoped_definition_tests_1.runScopedDefinitionTests(definition, property.scope);
    });
}
exports.runStaticPropertyDefinitionTests = runStaticPropertyDefinitionTests;

//# sourceMappingURL=run-static-property-definition-tests.js.map
