import {getStringInfo} from "./../../../main";
import {runPropertyDefinitionTests} from "./../../test-helpers";

describe("interface property tests", () => {
    const code = `
interface MyPropertyInterface {
    myString: string;
    myAny;
    myOptional?: string;
}`;

    const def = getStringInfo(code);

    runPropertyDefinitionTests(def.interfaces[0].properties[0], {
        name: "myString",
        type: "string"
    });

    runPropertyDefinitionTests(def.interfaces[0].properties[1], {
        name: "myAny",
        type: "any"
    });

    runPropertyDefinitionTests(def.interfaces[0].properties[2], {
        name: "myOptional",
        type: "string",
        isOptional: true
    });
});
