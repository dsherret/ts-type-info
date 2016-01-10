var base_1 = require("./../base");
var base_2 = require("./base");
function runFunctionDefinitionTests(definition, func) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("function " + func.name, function () {
        base_2.runBaseFunctionDefinitionTests(definition, func);
        base_1.runExportableDefinitionTests(definition, func.isExported);
    });
}
exports.runFunctionDefinitionTests = runFunctionDefinitionTests;

//# sourceMappingURL=run-function-definition-tests.js.map
