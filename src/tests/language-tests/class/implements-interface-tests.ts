import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests} from "./../../test-helpers";

describe("base class tests", () => {
    const code = `
interface MyInterface {
    name: string;
}

interface MyTest {
    name2: string;
}

class MyClassImplementsInterface implements MyInterface, MyTest {
    name: string;
    name2: string;
}
`;

    const def = getStringInfo(code);

    runNamedDefinitionTests(def.classes[0], "MyClassImplementsInterface");
    runNamedDefinitionTests(def.classes[0].implements[0], "MyInterface");
});
