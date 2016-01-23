var main_1 = require("./../../../main");
var definitions_1 = require("./../../../definitions");
var test_helpers_1 = require("./../../test-helpers");
describe("class property tests", function () {
    var code = "\nclass MyClass {\n    myString: string;\n    myImplicit = 4;\n    myAny;\n    myOptional?: string;\n\n    public myExplicitPublic;\n    protected myProtected;\n    private myPrivate;\n\n    get myGetAccessor() {\n        return \"\";\n    }\n\n    get myGetAndSetAccessor() {\n        return \"\";\n    }\n    set myGetAndSetAccessor(val: string) {\n    }\n}";
    var def = main_1.getStringInfo(code);
    test_helpers_1.runFileDefinitionTests(def, {
        classes: [{
                name: "MyClass",
                properties: [{
                        name: "myString",
                        typeExpression: { text: "string" }
                    }, {
                        name: "myImplicit",
                        typeExpression: { text: "number" },
                        defaultExpression: { text: "4" }
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
                        scope: definitions_1.Scope.public
                    }, {
                        name: "myProtected",
                        typeExpression: { text: "any" },
                        scope: definitions_1.Scope.protected
                    }, {
                        name: "myPrivate",
                        typeExpression: { text: "any" },
                        scope: definitions_1.Scope.private
                    }, {
                        name: "myGetAccessor",
                        typeExpression: { text: "string" },
                        isAccessor: true,
                        isReadonly: true
                    }, {
                        name: "myGetAndSetAccessor",
                        typeExpression: { text: "string" },
                        isAccessor: true
                    }]
            }]
    });
});

//# sourceMappingURL=property-tests.js.map
