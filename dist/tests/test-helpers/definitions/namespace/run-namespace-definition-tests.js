var base_1 = require("./../base");
function runNamespaceDefinitionTests(definition, structure) {
    describe("namespace " + structure.name, function () {
        base_1.runNamedDefinitionTests(definition, structure);
        base_1.runExportableDefinitionTests(definition, structure);
        base_1.runModuledDefinitionTests(definition, structure);
    });
}
exports.runNamespaceDefinitionTests = runNamespaceDefinitionTests;

//# sourceMappingURL=run-namespace-definition-tests.js.map
