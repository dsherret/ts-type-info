var assert = require("assert");
var base_1 = require("./../base");
function runDecoratorDefinitionTests(definition, decorator) {
    if (definition == null) {
        throw "Definition should not be null.";
    }
    describe("decorator " + decorator.name, function () {
        base_1.runNamedDefinitionTests(definition, decorator.name);
        definition.arguments.forEach(function (argument, i) {
            it("should have a name of " + decorator.arguments[i].text, function () {
                assert.equal(argument.text, decorator.arguments[i].text);
            });
        });
    });
}
exports.runDecoratorDefinitionTests = runDecoratorDefinitionTests;

//# sourceMappingURL=run-decorator-definition-tests.js.map
