import {getInfoFromString} from "./../../../main";
import {Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class property tests", () => {
    const code = `
class MyClass {
    myString: string;
    myImplicit = 4;
    myAny;
    myOptional?: string;

    public myExplicitPublic;
    protected myProtected;
    private myPrivate;

    get myGetAccessor() {
        return "";
    }

    get myGetAndSetAccessor() {
        return "";
    }
    set myGetAndSetAccessor(val: string) {
    }
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
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
                scope: Scope.Public
            }, {
                name: "myProtected",
                typeExpression: { text: "any" },
                scope: Scope.Protected
            }, {
                name: "myPrivate",
                typeExpression: { text: "any" },
                scope: Scope.Private
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
