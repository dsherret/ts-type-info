import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("interface name tests", () => {
    const code = `
interface MyInterface {
    name: string;
}`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.interfaces[0], "MyInterface");
});
