var assert = require("assert");
var general_1 = require("./../general");
function runTypeParameteredDefinitionTests(definition, structure) {
    describe("type parameters", function () {
        structure.typeParameters = structure.typeParameters || [];
        it("should have " + structure.typeParameters.length + " type parameter(s)", function () {
            assert.equal(definition.typeParameters.length, structure.typeParameters.length);
        });
        structure.typeParameters.forEach(function (param, i) {
            general_1.runTypeParameterDefinitionTests(definition.typeParameters[i], param);
        });
    });
}
exports.runTypeParameteredDefinitionTests = runTypeParameteredDefinitionTests;

//# sourceMappingURL=run-type-parametered-definition-tests.js.map
