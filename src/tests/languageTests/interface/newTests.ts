import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface name tests", () => {
    const code = `
interface MyInterface {
    new(): MyInterface;
}

interface MyInterfaceWithMultipleNew {
    new(): MyInterface;
    new<T>(str: string, t: T): MyInterface;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyInterface",
            newSignatures: [{
                returnTypeExpression: { text: "MyInterface" }
            }]
        }, {
            name: "MyInterfaceWithMultipleNew",
            newSignatures: [{
                returnTypeExpression: { text: "MyInterface" }
            }, {
                typeParameters: [{
                    name: "T"
                }],
                parameters: [{
                    name: "str",
                    typeExpression: { text: "string" }
                }, {
                    name: "t",
                    typeExpression: { text: "T" }
                }],
                returnTypeExpression: { text: "MyInterface" }
            }]
        }]
    });
});
