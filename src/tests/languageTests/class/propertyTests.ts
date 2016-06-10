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
            }, {
                name: "myGetAccessor",
                type: { text: "string" },
                isAccessor: true,
                isReadonly: true
            }, {
                name: "myGetAndSetAccessor",
                type: { text: "string" },
                isAccessor: true
            }]
        }]
    });
});
