import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runClassPropertyDefinitionTests} from "./../../test-helpers";

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

    runClassPropertyDefinitionTests(def.classes[0].properties[0], {
        name: "myString",
        type: "string"
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[1], {
        name: "myImplicit",
        type: "number"
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[2], {
        name: "myAny",
        type: "any"
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[3], {
        name: "myOptional",
        type: "string",
        isOptional: true
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[4], {
        name: "myExplicitPublic",
        type: "any"
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[5], {
        name: "myProtected",
        type: "any",
        scope: Scope.protected
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[6], {
        name: "myPrivate",
        type: "any",
        scope: Scope.private
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[7], {
        name: "myGetAccessor",
        type: "string",
        scope: Scope.public,
        isAccessor: true,
        isReadonly: true
    });

    runClassPropertyDefinitionTests(def.classes[0].properties[8], {
        name: "myGetAndSetAccessor",
        type: "string",
        scope: Scope.public,
        isAccessor: true,
        isReadonly: false
    });
});
