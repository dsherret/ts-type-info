import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runFileDefinitionTests} from "./../../test-helpers";

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

    const def = getStringInfo(code);

    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            properties: [{
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
