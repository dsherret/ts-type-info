var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class property tests", function () {
    var code = "\nclass MyClass {\n    myString: string;\n    myImplicit = 4;\n    myAny;\n\n    public myExplicitPublic;\n    protected myProtected;\n    private myPrivate;\n\n    get myGetAccessor() {\n        return \"\";\n    }\n\n    get myGetAndSetAccessor() {\n        return \"\";\n    }\n    set myGetAndSetAccessor(val: string) {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[0], {
        name: "myString",
        type: "string",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[1], {
        name: "myImplicit",
        type: "number",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[2], {
        name: "myAny",
        type: "any",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[3], {
        name: "myExplicitPublic",
        type: "any",
        scope: scope_1.Scope.public
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[4], {
        name: "myProtected",
        type: "any",
        scope: scope_1.Scope.protected
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[5], {
        name: "myPrivate",
        type: "any",
        scope: scope_1.Scope.private
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[6], {
        name: "myGetAccessor",
        type: "string",
        scope: scope_1.Scope.public,
        isAccessor: true,
        isReadonly: true
    });
    test_helpers_1.runClassPropertyDefinitionTests(def.classes[0].properties[7], {
        name: "myGetAndSetAccessor",
        type: "string",
        scope: scope_1.Scope.public,
        isAccessor: true,
        isReadonly: false
    });
});

//# sourceMappingURL=property-tests.js.map
