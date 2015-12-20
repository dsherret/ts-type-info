import {getStringInfo} from "./../../../main";
import {runInterfaceNewSignatureDefinitionTests} from "./../../test-helpers";

describe("interface name tests", () => {
    const code = `
class MyClass {
    name: string;
}

interface MyInterface {
    new(): MyClass;
}

interface MyInterfaceWithMultipleNew {
    new(): MyClass;
    new(str: string): MyClass;
}
`;

    const def = getStringInfo(code);

    runInterfaceNewSignatureDefinitionTests(def.interfaces[0].newSignatures[0], {
        parameters: [],
        returnType: "MyClass"
    });

    runInterfaceNewSignatureDefinitionTests(def.interfaces[1].newSignatures[0], {
        parameters: [],
        returnType: "MyClass"
    });

    runInterfaceNewSignatureDefinitionTests(def.interfaces[1].newSignatures[1], {
        parameters: [{
            name: "str",
            type: "string"
        }],
        returnType: "MyClass"
    });
});
