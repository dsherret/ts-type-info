var base_1 = require("./../base");
var base_2 = require("./base");
function runFunctionDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("method " + func.name, function () {
        base_1.runNamedDefinitionTests(definition, func.name);
        base_1.runExportableDefinitionTests(definition, func.isExported);
        base_2.runReturnTypedDefinitionTests(definition, func.returnType);
        base_2.runParameteredDefinitionTests(definition, func.parameters);
    });
}
exports.runFunctionDefinitionTests = runFunctionDefinitionTests;

//# sourceMappingURL=run-function-definition-tests.js.map
