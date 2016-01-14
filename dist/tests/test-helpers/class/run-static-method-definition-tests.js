var base_1 = require("./base");
function runStaticMethodDefinitionTests(definition, structure) {
    describe("static method " + structure.name, function () {
        base_1.runBaseClassMethodDefinitionTests(definition, structure);
    });
}
exports.runStaticMethodDefinitionTests = runStaticMethodDefinitionTests;

//# sourceMappingURL=run-static-method-definition-tests.js.map
