var base_1 = require("./base");
function runClassStaticMethodDefinitionTests(definition, structure) {
    describe("static method " + structure.name, function () {
        base_1.runBaseClassMethodDefinitionTests(definition, structure);
    });
}
exports.runClassStaticMethodDefinitionTests = runClassStaticMethodDefinitionTests;

//# sourceMappingURL=run-class-static-method-definition-tests.js.map
