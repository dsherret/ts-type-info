var assert = require("assert");
var run_type_parameter_definition_tests_1 = require("./run-type-parameter-definition-tests");
function runTypeParameteredDefinitionTests(definition, structure) {
    describe("type parameters", function () {
        structure.typeParameters = structure.typeParameters || [];
        it("should have " + structure.typeParameters.length + " type parameter(s)", function () {
            assert.equal(definition.typeParameters.length, structure.typeParameters.length);
        });
        structure.typeParameters.forEach(function (param, i) {
            run_type_parameter_definition_tests_1.runTypeParameterDefinitionTests(definition.typeParameters[i], param);
        });
    });
}
exports.runTypeParameteredDefinitionTests = runTypeParameteredDefinitionTests;

//# sourceMappingURL=run-type-parametered-definition-tests.js.map
