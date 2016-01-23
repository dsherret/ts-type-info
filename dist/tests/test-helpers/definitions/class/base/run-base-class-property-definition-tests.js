var general_1 = require("./../../general");
var run_scoped_definition_tests_1 = require("./run-scoped-definition-tests");
function runBaseClassPropertyDefinitionTests(definition, structure) {
    general_1.runObjectPropertyDefinitionTests(definition, structure);
    run_scoped_definition_tests_1.runScopedDefinitionTests(definition, structure);
}
exports.runBaseClassPropertyDefinitionTests = runBaseClassPropertyDefinitionTests;

//# sourceMappingURL=run-base-class-property-definition-tests.js.map
