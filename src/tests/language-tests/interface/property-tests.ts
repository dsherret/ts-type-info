import {getStringInfo} from "./../../../main";
import {runPropertyDefinitionTests} from "./../../test-helpers";

describe("interface property tests", () => {
    const code = `
interface MyInterface {
    myString: string;
    myAny;
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
});
