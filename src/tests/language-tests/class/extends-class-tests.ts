import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base class tests", () => {
    const code = `
class MyBaseClass {
    name1: string;
}

class MyChildClass extends MyBaseClass {
    name2: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    runNamedDefinitionTests(def.classes[1], "MyChildClass");
    runNamedDefinitionTests(def.classes[1].extends[0], "MyBaseClass");
});
