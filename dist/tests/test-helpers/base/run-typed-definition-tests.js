var types_1 = require("./../types");
function runTypedDefinitionTests(definition, name) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    types_1.runTypeExpressionTests(definition.typeExpression, name);
}
exports.runTypedDefinitionTests = runTypedDefinitionTests;

//# sourceMappingURL=run-typed-definition-tests.js.map
