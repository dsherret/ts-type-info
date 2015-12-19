import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base interface tests", () => {
    const code = `
class MyBaseClass {
    name: string;
}

interface MyChildInterface extends MyBaseClass {
    name2: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    runNamedDefinitionTests(def.interfaces[0], "MyChildInterface");
    runNamedDefinitionTests(def.interfaces[0].extends[0], "MyBaseClass");
});
