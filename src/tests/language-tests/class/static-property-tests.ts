import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runStaticPropertyDefinitionTests} from "./../../test-helpers";

describe("class static property tests", () => {
    const code = `
class MyClass {
    static myString: string;
    static myImplicit = 4;
    static myAny;

    public static myExplicitPublic;
    protected static myProtected;
    private static myPrivate;
}`;

    const def = getStringInfo(code);

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[0], {
        name: "myString",
        type: "string",
        scope: Scope.public
    });

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[1], {
        name: "myImplicit",
        type: "number",
        scope: Scope.public
    });

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[2], {
        name: "myAny",
        type: "any",
        scope: Scope.public
    });

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[3], {
        name: "myExplicitPublic",
        type: "any",
        scope: Scope.public
    });

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[4], {
        name: "myProtected",
        type: "any",
        scope: Scope.protected
    });

    runStaticPropertyDefinitionTests(def.classes[0].staticProperties[5], {
        name: "myPrivate",
        type: "any",
        scope: Scope.private
    });
});
