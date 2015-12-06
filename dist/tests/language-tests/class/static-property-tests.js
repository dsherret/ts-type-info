var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class static property tests", function () {
    var code = "\nclass MyClass {\n    static myString: string;\n    static myImplicit = 4;\n    static myAny;\n\n    public static myExplicitPublic;\n    protected static myProtected;\n    private static myPrivate;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[0], {
        name: "myString",
        type: "string",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[1], {
        name: "myImplicit",
        type: "number",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[2], {
        name: "myAny",
        type: "any",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[3], {
        name: "myExplicitPublic",
        type: "any",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[4], {
        name: "myProtected",
        type: "any",
        scope: scope_1.Scope.protected
    });
    test_helpers_1.runStaticPropertyDefinitionTests(def.classes[0].staticProperties[5], {
        name: "myPrivate",
        type: "any",
        scope: scope_1.Scope.private
    });
});

//# sourceMappingURL=static-property-tests.js.map
