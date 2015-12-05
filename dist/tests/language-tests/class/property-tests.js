var assert = require("assert");
var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class property tests", function () {
    var code = "\nclass MyClass {\n    myString: string;\n    myImplicit = 4;\n    myAny;\n\n    public myExplicitPublic;\n    protected myProtected;\n    private myPrivate;\n}";
    var def = main_1.getStringInfo(code);
    function typeTest(prop, type) {
        it("should have type " + type, function () {
            assert.equal(prop.type.name, type);
        });
    }
    describe("property myString", function () {
        var prop = def.classes[0].properties[0];
        test_helpers_1.runNamedDefinitionTests(prop, "myString");
        typeTest(prop, "string");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.public);
    });
    describe("property myImplicit", function () {
        var prop = def.classes[0].properties[1];
        test_helpers_1.runNamedDefinitionTests(prop, "myImplicit");
        typeTest(prop, "number");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.public);
    });
    describe("property myAny", function () {
        var prop = def.classes[0].properties[2];
        test_helpers_1.runNamedDefinitionTests(prop, "myAny");
        typeTest(prop, "any");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.public);
    });
    describe("property myExplicitPublic", function () {
        var prop = def.classes[0].properties[3];
        test_helpers_1.runNamedDefinitionTests(prop, "myExplicitPublic");
        typeTest(prop, "any");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.public);
    });
    describe("property myProtected", function () {
        var prop = def.classes[0].properties[4];
        test_helpers_1.runNamedDefinitionTests(prop, "myProtected");
        typeTest(prop, "any");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.protected);
    });
    describe("property myPrivate", function () {
        var prop = def.classes[0].properties[5];
        test_helpers_1.runNamedDefinitionTests(prop, "myPrivate");
        typeTest(prop, "any");
        test_helpers_1.runScopedDefinitionTests(prop, scope_1.Scope.private);
    });
});

//# sourceMappingURL=property-tests.js.map
