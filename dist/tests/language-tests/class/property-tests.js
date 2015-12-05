var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var assert = require("assert");
describe("class property tests", function () {
    var code = "\nclass MyClass {\n    myString: string;\n    myImplicit = 4;\n    myAny;\n\n    public myExplicitPublic;\n    protected myProtected;\n    private myPrivate;\n}";
    var def = main_1.getStringInfo(code);
    function nameTest(prop, name) {
        it("should have name " + name, function () {
            assert.equal(prop.name, name);
        });
    }
    function typeTest(prop, type) {
        it("should have type " + type, function () {
            assert.equal(prop.type.name, type);
        });
    }
    function scopeTest(prop, scope) {
        it("should have scope " + scope_1.Scope[scope], function () {
            assert.equal(prop.scope, scope);
        });
    }
    describe("property myString", function () {
        var prop = def.classes[0].properties[0];
        nameTest(prop, "myString");
        typeTest(prop, "string");
        scopeTest(prop, scope_1.Scope.public);
    });
    describe("property myImplicit", function () {
        var prop = def.classes[0].properties[1];
        nameTest(prop, "myImplicit");
        typeTest(prop, "number");
        scopeTest(prop, scope_1.Scope.public);
    });
    describe("property myAny", function () {
        var prop = def.classes[0].properties[2];
        nameTest(prop, "myAny");
        typeTest(prop, "any");
        scopeTest(prop, scope_1.Scope.public);
    });
    describe("property myExplicitPublic", function () {
        var prop = def.classes[0].properties[3];
        nameTest(prop, "myExplicitPublic");
        typeTest(prop, "any");
        scopeTest(prop, scope_1.Scope.public);
    });
    describe("property myProtected", function () {
        var prop = def.classes[0].properties[4];
        nameTest(prop, "myProtected");
        typeTest(prop, "any");
        scopeTest(prop, scope_1.Scope.protected);
    });
    describe("property myPrivate", function () {
        var prop = def.classes[0].properties[5];
        nameTest(prop, "myPrivate");
        typeTest(prop, "any");
        scopeTest(prop, scope_1.Scope.private);
    });
});

//# sourceMappingURL=property-tests.js.map
