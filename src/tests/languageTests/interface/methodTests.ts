import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface method", () => {
    const code = `
interface MyInterface {
    // parameters
    myParameterMethod(myParameter: string, myOptionalParameter?: number): number;
    myImplicitAnyReturnTypeMethod();
    myExplicitReturnTypeMethod(): string;
    myThisTypeMethod(this: string, num: number): void;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            methods: [{
                name: "myParameterMethod",
                returnType: { text: "number" },
                parameters: [{
                    name: "myParameter",
                    type: { text: "string" }
                }, {
                    name: "myOptionalParameter",
                    type: { text: "number" },
                    isOptional: true
                }]
            }, {
                name: "myImplicitAnyReturnTypeMethod",
                returnType: { text: "any" }
            }, {
                name: "myExplicitReturnTypeMethod",
                returnType: { text: "string" }
            }, {
                name: "myThisTypeMethod",
                thisType: { text: "string" },
                parameters: [{
                    name: "num",
                    type: { text: "number" }
                }]
            }]
        }]
    });
});
