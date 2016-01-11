var base_1 = require("./base");
function runClassMethodDefinitionTests(definition, method) {
    if (definition == null) {
        throw "Class method definition should not be null.";
    }
    describe("method " + method.name, function () {
        base_1.runBaseClassMethodDefinitionTests(definition, method);
    });
}
exports.runClassMethodDefinitionTests = runClassMethodDefinitionTests;

//# sourceMappingURL=run-class-method-definition-tests.js.map
