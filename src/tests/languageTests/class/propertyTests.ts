import {getInfoFromString} from "./../../../main";
import {ClassPropertyKind, Scope} from "./../../../definitions";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("class property tests", () => {
    const code = `
class MyClass {
    readonly myString: string;
    myImplicit = 4;
    myAny;
    myOptional?: string;

    public myExplicitPublic;
    protected myProtected;
    private myPrivate;

    get myGetAccessor() {
        return "";
    }

    set mySetAccessor(val: string) {
    }

    get myGetAndSetAccessor() {
        return "";
    }
    set myGetAndSetAccessor(val: string) {
    }

    abstract myAbstractProperty: string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
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
            }, {
                name: "myGetAccessor",
                type: { text: "string" },
                kind: ClassPropertyKind.GetAccessor
            }, {
                name: "mySetAccessor",
                type: { text: "string" },
                kind: ClassPropertyKind.SetAccessor
            }, {
                name: "myGetAndSetAccessor",
                type: { text: "string" },
                kind: ClassPropertyKind.GetSetAccessor
            }, {
                name: "myAbstractProperty",
                isAbstract: true,
                type: { text: "string" }
            }]
        }]
    });
});
