var base_1 = require("./base");
function runStaticMethodDefinitionTests(definition, method) {
    if (definition == null) {
        throw "Static method definition should not be null.";
    }
    describe("static method " + method.name, function () {
        base_1.runBaseClassMethodDefinitionTests(definition, method);
    });
}
exports.runStaticMethodDefinitionTests = runStaticMethodDefinitionTests;

//# sourceMappingURL=run-static-method-definition-tests.js.map
