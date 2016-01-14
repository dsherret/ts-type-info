import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("class static property tests", () => {
    const code = `
class MyClass {
    static myString: string;
    static myImplicit = 4;
    static myAny;
    static myOptional?: string;

    public static myExplicitPublic;
    protected static myProtected;
    private static myPrivate;
}`;

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
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
                scope: Scope.public
            }, {
                name: "myProtected",
                typeExpression: { text: "any" },
                scope: Scope.protected
            }, {
                name: "myPrivate",
                typeExpression: { text: "any" },
                scope: Scope.private
            }]
        }]
    });
});
