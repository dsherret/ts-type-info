var base_1 = require("./base");
function runParameterDefinitionTests(definition, param) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("parameter " + param.name, function () {
        base_1.runBaseParameterDefinitionTests(definition, param);
    });
}
exports.runParameterDefinitionTests = runParameterDefinitionTests;

//# sourceMappingURL=run-parameter-definition-tests.js.map
