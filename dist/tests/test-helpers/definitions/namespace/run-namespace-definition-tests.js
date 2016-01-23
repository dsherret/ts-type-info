var assert = require("assert");
var definitions_1 = require("./../../../../definitions");
var base_1 = require("./../base");
var ensure_not_null_1 = require("./../../ensure-not-null");
function runNamespaceDefinitionTests(definition, structure) {
    describe("namespace " + structure.name, function () {
        ensure_not_null_1.ensureNotNull(definition, function () {
            base_1.runNamedDefinitionTests(definition, structure);
            base_1.runExportableDefinitionTests(definition, structure);
            base_1.runAmbientableDefinitionTests(definition, structure);
            base_1.runModuledDefinitionTests(definition, structure);
            it("should have declaration type " + definitions_1.NamespaceDeclarationType[structure.declarationType], function () {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
exports.runNamespaceDefinitionTests = runNamespaceDefinitionTests;

//# sourceMappingURL=run-namespace-definition-tests.js.map
