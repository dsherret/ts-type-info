import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface new tests", () => {
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
                returnType: { text: "MyInterface" }
            }]
        }, {
            name: "MyInterfaceWithMultipleNew",
            newSignatures: [{
                returnType: { text: "MyInterface" }
            }, {
                typeParameters: [{
                    name: "T"
                }],
                parameters: [{
                    name: "str",
                    type: { text: "string" }
                }, {
                    name: "t",
                    type: { text: "T" }
                }],
                returnType: { text: "MyInterface" },
                minArgumentCount: 2
            }]
        }]
    });
});
