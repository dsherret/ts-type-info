var function_1 = require("./../function");
function runClassMethodParameterDefinitionTests(definition, param) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("parameter " + param.name, function () {
        function_1.runBaseParameterDefinitionTests(definition, param);
    });
}
exports.runClassMethodParameterDefinitionTests = runClassMethodParameterDefinitionTests;

//# sourceMappingURL=run-class-method-parameter-definition-tests.js.map
