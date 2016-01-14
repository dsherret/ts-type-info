var function_1 = require("./../function");
function runClassMethodParameterDefinitionTests(definition, structure) {
    describe("parameter " + structure.name, function () {
        function_1.runBaseParameterDefinitionTests(definition, structure);
    });
}
exports.runClassMethodParameterDefinitionTests = runClassMethodParameterDefinitionTests;

//# sourceMappingURL=run-class-method-parameter-definition-tests.js.map
