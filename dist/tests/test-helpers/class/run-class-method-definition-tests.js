var base_1 = require("./base");
function runClassMethodDefinitionTests(definition, structure) {
    describe("method " + structure.name, function () {
        base_1.runBaseClassMethodDefinitionTests(definition, structure);
    });
}
exports.runClassMethodDefinitionTests = runClassMethodDefinitionTests;

//# sourceMappingURL=run-class-method-definition-tests.js.map
