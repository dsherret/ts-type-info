var assert = require("assert");
var definitions_1 = require("./../definitions");
var run_type_expression_tests_1 = require("./run-type-expression-tests");
function runTypeTests(type, structure) {
    describe("type", function () {
        structure.callSignatures = structure.callSignatures || [];
        structure.typeArguments = structure.typeArguments || [];
        structure.properties = structure.properties || [];
        it("should have the text of " + structure.text, function () {
            assert.equal(type.text, structure.text);
        });
        it("should have the same number of call signatures", function () {
            assert.equal(type.callSignatures.length, structure.callSignatures.length);
        });
        structure.callSignatures.forEach(function (callSignatureStructure, i) {
            definitions_1.runCallSignatureDefinitionTests(type.callSignatures[i], callSignatureStructure);
        });
        it("should have the same number of type arguments", function () {
            assert.equal(type.typeArguments.length, structure.typeArguments.length);
        });
        structure.typeArguments.forEach(function (typeExpressionStructure, i) {
            run_type_expression_tests_1.runTypeExpressionTests(type.typeArguments[i], typeExpressionStructure);
        });
        it("should have the same number of properties", function () {
            assert.equal(type.properties.length, structure.properties.length);
        });
        structure.properties.forEach(function (propertyStructure, i) {
            definitions_1.runBasePropertyDefinitionTests(type.properties[i], propertyStructure);
        });
        if (structure.definition == null) {
            it("should not have a definition", function () {
                assert.equal(type.definition, null);
            });
        }
        else {
            it("should have a definition", function () {
                definitions_1.runNamedDefinitionTests(type.definition, structure.definition);
            });
        }
    });
}
exports.runTypeTests = runTypeTests;

//# sourceMappingURL=run-type-tests.js.map
