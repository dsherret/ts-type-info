import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface method", () => {
    const code = `
interface MyInterface {
    // parameters
    myParameterMethod(myParameter: string, myOptionalParameter?: number): number;
    myImplicitAnyReturnTypeMethod();
    myExplicitReturnTypeMethod(): string;
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            methods: [{
                name: "myParameterMethod",
                returnTypeExpression: { text: "number" },
                parameters: [{
                    name: "myParameter",
                    typeExpression: { text: "string" }
                }, {
                    name: "myOptionalParameter",
                    typeExpression: { text: "number" },
                    isOptional: true
                }]
            }, {
                name: "myImplicitAnyReturnTypeMethod",
                returnTypeExpression: { text: "any" }
            }, {
                name: "myExplicitReturnTypeMethod",
                returnTypeExpression: { text: "string" }
            }]
        }]
    });
});
