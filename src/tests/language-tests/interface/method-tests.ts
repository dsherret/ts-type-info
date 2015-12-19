import {getStringInfo} from "./../../../main";
import {runInterfaceMethodDefinitionTests} from "./../../test-helpers";

describe("interface method", () => {
    const code = `
interface MyInterface {
    // parameters
    myParameterMethod(myParameter: string, myOptionalParameter?: number): number[];
    myImplicitAnyReturnTypeMethod();
    myExplicitReturnTypeMethod(): string;
}`;

    const def = getStringInfo(code);

    runInterfaceMethodDefinitionTests(def.interfaces[0].methods[0], {
        name: "myParameterMethod",
        returnType: "number[]",
        parameters: [{
            name: "myParameter",
            type: "string"
        }, {
            name: "myOptionalParameter",
            type: "number",
            isOptional: true
        }]
    });

    runInterfaceMethodDefinitionTests(def.interfaces[0].methods[1], {
        name: "myImplicitAnyReturnTypeMethod",
        returnType: "any",
        parameters: []
    });

    runInterfaceMethodDefinitionTests(def.interfaces[0].methods[2], {
        name: "myExplicitReturnTypeMethod",
        returnType: "string",
        parameters: []
    });
});
