var base_1 = require("./base");
function runParameterDefinitionTests(definition, structure) {
    describe("parameter " + structure.name, function () {
        base_1.runBaseParameterDefinitionTests(definition, structure);
    });
}
exports.runParameterDefinitionTests = runParameterDefinitionTests;

//# sourceMappingURL=run-parameter-definition-tests.js.map
