var types_1 = require("./../../types");
function runReturnTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    types_1.runTypeExpressionTests(definition.returnTypeExpression, name);
}
exports.runReturnTypedDefinitionTests = runReturnTypedDefinitionTests;

//# sourceMappingURL=run-return-typed-definition-tests.js.map
