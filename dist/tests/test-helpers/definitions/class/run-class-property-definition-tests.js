var assert = require("assert");
var base_1 = require("./../base");
function runClassPropertyDefinitionTests(definition, structure) {
    describe("property " + structure.name, function () {
        base_1.runPropertyDefinitionTests(definition, structure);
        it("should be " + (structure.isAccessor ? "an accessor" : "not an accessor"), function () {
            assert.equal(definition.isAccessor, structure.isAccessor || false);
        });
        it("should be " + (structure.isReadonly ? "readonly" : "not readonly"), function () {
            assert.equal(definition.isReadonly, structure.isReadonly || false);
        });
    });
}
exports.runClassPropertyDefinitionTests = runClassPropertyDefinitionTests;

//# sourceMappingURL=run-class-property-definition-tests.js.map
