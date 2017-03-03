import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("function type tests", () => {
    const code = `
class MyClass {
}

type MyType = typeof MyClass;
`;

    const def = getInfoFromString(code, { showDebugMessages: true });

    runFileDefinitionTests(def, {
        classes: [{ name: "MyClass" }],
        typeAliases: [{
            name: "MyType",
            type: { text: "typeof MyClass" }
        }]
    });
});
