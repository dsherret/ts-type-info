var assert = require("assert");
var definitions_1 = require("./../../../../definitions");
var base_1 = require("./../base");
function runVariableDefinitionTests(definition, structure) {
    describe("variable " + structure.name, function () {
        base_1.ensureDefinitionNotNull(definition, function () {
            base_1.runNamedDefinitionTests(definition, structure);
            base_1.runExportableDefinitionTests(definition, structure);
            base_1.runTypeExpressionedDefinitionTests(definition, structure);
            base_1.runDefaultExpressionedDefinitionTests(definition, structure);
            it("should have declaration type " + definitions_1.VariableDeclarationType[structure.declarationType], function () {
                assert.equal(definition.declarationType, structure.declarationType);
            });
        });
    });
}
exports.runVariableDefinitionTests = runVariableDefinitionTests;

//# sourceMappingURL=run-variable-definition-tests.js.map
