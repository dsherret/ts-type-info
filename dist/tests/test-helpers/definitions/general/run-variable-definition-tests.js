var assert = require("assert");
var base_1 = require("./../base");
function runVariableDefinitionTests(definition, structure) {
    describe("variable " + structure.name, function () {
        base_1.ensureDefinitionNotNull(definition, function () {
            base_1.runNamedDefinitionTests(definition, structure);
            base_1.runExportableDefinitionTests(definition, structure);
            base_1.runTypeExpressionedDefinitionTests(definition, structure);
            base_1.runDefaultExpressionedDefinitionTests(definition, structure);
            runDeclarationTypeTests(definition, structure);
        });
    });
}
exports.runVariableDefinitionTests = runVariableDefinitionTests;
function runDeclarationTypeTests(definition, structure) {
    it("should have a declaration type " + structure.declarationType, function () {
        assert.equal(definition.declarationType, structure.declarationType);
    });
}

//# sourceMappingURL=run-variable-definition-tests.js.map
