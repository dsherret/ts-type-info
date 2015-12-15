import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("interface name tests", () => {
    const code = `
interface MyInterface {
}`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.interfaces[0], "MyInterface");
});
