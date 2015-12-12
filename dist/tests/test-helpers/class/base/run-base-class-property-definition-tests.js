var run_base_property_definition_tests_1 = require("./../../base/run-base-property-definition-tests");
var run_scoped_definition_tests_1 = require("./../../base/run-scoped-definition-tests");
function runBaseClassPropertyDefinitionTests(definition, property) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    run_base_property_definition_tests_1.runBasePropertyDefinitionTests(definition, property);
    run_scoped_definition_tests_1.runScopedDefinitionTests(definition, property.scope);
}
exports.runBaseClassPropertyDefinitionTests = runBaseClassPropertyDefinitionTests;

//# sourceMappingURL=run-base-class-property-definition-tests.js.map
