var base_1 = require("./../../base");
function runReturnTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    base_1.runTypeTests(definition.returnType, name);
}
exports.runReturnTypedDefinitionTests = runReturnTypedDefinitionTests;

//# sourceMappingURL=run-return-typed-definition-tests.js.map
