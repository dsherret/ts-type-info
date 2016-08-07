import {getInfoFromString} from "./../../../main";
import {Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class static property tests", () => {
    const code = `
class MyClass {
    static readonly myString: string;
    static myImplicit = 4;
    static myAny;
    static myOptional?: string;

    public static myExplicitPublic;
    protected static myProtected;
    private static myPrivate;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            staticProperties: [{
                name: "myString",
                isReadonly: true,
                type: { text: "string" }
            }, {
                name: "myImplicit",
                type: { text: "number" },
                defaultExpression: { text: "4" }
            }, {
                name: "myAny",
                type: { text: "any" }
            }, {
                name: "myOptional",
                type: { text: "string" },
                isOptional: true
            }, {
                name: "myExplicitPublic",
                type: { text: "any" },
                scope: Scope.Public
            }, {
                name: "myProtected",
                type: { text: "any" },
                scope: Scope.Protected
            }, {
                name: "myPrivate",
                type: { text: "any" },
                scope: Scope.Private
            }]
        }]
    });
});
