var base_1 = require("./../base");
function runNamespaceDefinitionTests(definition, expected) {
    base_1.runNamedDefinitionTests(definition, expected.name);
    base_1.runModuledDefinitionTests(definition, expected);
}
exports.runNamespaceDefinitionTests = runNamespaceDefinitionTests;

//# sourceMappingURL=run-namespace-definition-tests.js.map
