import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests, runTypeExpressionTests} from "./../../test-helpers";

describe("class extends tests", () => {
    const code = `
class MyBaseClass {
    name1: string;
}

class MyChildClass extends MyBaseClass {
    name2: string;
}
`;

    const def = getStringInfo(code);

    describe("MyBaseClass", () => {
        runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    });

    describe("MyChildClass", () => {
        runNamedDefinitionTests(def.classes[1], "MyChildClass");

        describe("extends clause", () => {
            runTypeExpressionTests(def.classes[1].extends[0], "MyBaseClass");
        });
    });
});
