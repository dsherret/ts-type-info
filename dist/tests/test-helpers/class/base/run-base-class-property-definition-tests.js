var run_property_definition_tests_1 = require("./../../base/run-property-definition-tests");
var run_scoped_definition_tests_1 = require("./../../base/run-scoped-definition-tests");
function runBaseClassPropertyDefinitionTests(definition, structure) {
    run_property_definition_tests_1.runPropertyDefinitionTests(definition, structure);
    run_scoped_definition_tests_1.runScopedDefinitionTests(definition, structure);
}
exports.runBaseClassPropertyDefinitionTests = runBaseClassPropertyDefinitionTests;

//# sourceMappingURL=run-base-class-property-definition-tests.js.map
