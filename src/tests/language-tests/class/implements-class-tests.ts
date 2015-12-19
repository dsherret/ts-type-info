/*
import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base class tests", () => {
    const code = `
class MyBaseClass {
    name: string;
}

class MyClassImplementsClass implements MyBaseClass {
    name: string;
    name2: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    runNamedDefinitionTests(def.classes[1], "MyClassImplementsClass");
    runNamedDefinitionTests(def.classes[1].implements[0], "MyBaseClass");
});
*/
