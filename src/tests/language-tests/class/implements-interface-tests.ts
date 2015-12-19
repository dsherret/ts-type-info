/*
import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base class tests", () => {
    const code = `
interface MyInterface {
    name: string;
}

class MyClassImplementsInterface implements MyInterface {
    name: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyClassImplementsInterface");
    runNamedDefinitionTests(def.classes[0].implements[0], "MyInterface");
});
*/
