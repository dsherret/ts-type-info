// todo: these tests
/*
import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

describe("value module", () => {
    const code = `
// declaration merging
declare class MyClass {
    myMethod(): void;
}

declare module MyClass {
    function myFunction(str: string): string;
}`;

    const def = getStringInfo(code);
    const func = {
        name: "myFunction",
        parameters: [{
            name: "str",
            typeExpression: { text: "string" }
        }],
        returnTypeExpression: { text: "string" }
    };

    // todo: hmmm... maybe this should work differently?
    runFileDefinitionTests(def, {
        classes: [{
            name: "MyClass",
            methods: [{
                name: "myMethod",
            }],
            staticMethods: [func]
        }],
        namespaces: [{
            name: "MyClass",
            functions: [func]
        }]
    });
});
*/
