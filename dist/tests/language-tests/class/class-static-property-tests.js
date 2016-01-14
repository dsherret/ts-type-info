var main_1 = require("./../../../main");
var scope_1 = require("./../../../scope");
var test_helpers_1 = require("./../../test-helpers");
describe("class static property tests", function () {
    var code = "\nclass MyClass {\n    static myString: string;\n    static myImplicit = 4;\n    static myAny;\n    static myOptional?: string;\n\n    public static myExplicitPublic;\n    protected static myProtected;\n    private static myPrivate;\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                staticProperties: [{
                        name: "myString",
                        typeExpression: { text: "string" }
                    }, {
                        name: "myImplicit",
                        typeExpression: { text: "number" }
                    }, {
                        name: "myAny",
                        typeExpression: { text: "any" }
                    }, {
                        name: "myOptional",
                        typeExpression: { text: "string" },
                        isOptional: true
                    }, {
                        name: "myExplicitPublic",
                        typeExpression: { text: "any" },
                        scope: scope_1.Scope.public
                    }, {
                        name: "myProtected",
                        typeExpression: { text: "any" },
                        scope: scope_1.Scope.protected
                    }, {
                        name: "myPrivate",
                        typeExpression: { text: "any" },
                        scope: scope_1.Scope.private
                    }]
            }]
    });
});

//# sourceMappingURL=class-static-property-tests.js.map
