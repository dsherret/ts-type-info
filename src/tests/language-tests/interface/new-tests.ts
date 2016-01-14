import {getStringInfo} from "./../../../main";
import {runFileDefinitionTests} from "./../../test-helpers";

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

    const def = getStringInfo(code);

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
