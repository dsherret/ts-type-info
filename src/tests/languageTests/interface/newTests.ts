import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface name tests", () => {
    const code = `
interface MyInterface {
    new(): MyInterface;
}

interface MyInterfaceWithMultipleNew {
    new(): MyInterface;
    new(str: string): MyInterface;
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
                parameters: [{
                    name: "str",
                    typeExpression: { text: "string" }
                }],
                returnTypeExpression: { text: "MyInterface" }
            }]
        }]
    });
});
