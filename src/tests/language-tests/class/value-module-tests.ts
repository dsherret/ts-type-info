import {getStringInfo} from "./../../../main";
import {Scope} from "./../../../scope";
import {runClassMethodDefinitionTests, runStaticMethodDefinitionTests} from "./../../test-helpers";

describe("value module", () => {
    const code = `
// declaration merging
declare class MyClass {
    myMethod(num: number): string;
}

declare module MyClass {
    function myFunction(str: string): string;
}`;

    const def = getStringInfo(code);

    runClassMethodDefinitionTests(def.classes[0].methods[0], {
        name: "myMethod",
        scope: Scope.public,
        returnType: "string",
        parameters: [{
            name: "num",
            type: "number"
        }]
    });

    runStaticMethodDefinitionTests(def.classes[0].staticMethods[0], {
        name: "myFunction",
        scope: Scope.public,
        returnType: "string",
        parameters: [{
            name: "str",
            type: "string"
        }]
    });
});
