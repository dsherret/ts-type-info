import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base interface tests", () => {
    const code = `
interface MyBaseInterface {
    name: string;
}

interface MyChildInterface extends MyBaseInterface {
    name2: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.interfaces[0], "MyBaseInterface");
    runNamedDefinitionTests(def.interfaces[1], "MyChildInterface");
    runNamedDefinitionTests(def.interfaces[1].extends[0], "MyBaseInterface");
});
