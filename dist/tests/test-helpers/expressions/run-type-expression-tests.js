var assert = require("assert");
var run_type_tests_1 = require("./run-type-tests");
function runTypeExpressionTests(typeExpression, structure) {
    describe("type expression", function () {
        it("should have a type text of " + structure.text, function () {
            assert.equal(typeExpression.text, structure.text);
        });
        // only bother checking these types if they are explictly asked to be checked for
        if (structure.types != null) {
            it("should have the same number of types", function () {
                assert.equal(typeExpression.types.length, structure.types.length);
            });
            structure.types.forEach(function (typeStructure, i) {
                run_type_tests_1.runTypeTests(typeExpression.types[i], typeStructure);
            });
        }
    });
}
exports.runTypeExpressionTests = runTypeExpressionTests;

//# sourceMappingURL=run-type-expression-tests.js.map
