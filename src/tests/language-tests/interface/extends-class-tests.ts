import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests, runTypeExpressionTests} from "./../../test-helpers";

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

    describe("MyBaseClass", () => {
        runNamedDefinitionTests(def.classes[0], "MyBaseClass");
    });

    describe("MyChildInterface", () => {
        runNamedDefinitionTests(def.interfaces[0], "MyChildInterface");

        describe("extends clause", () => {
            runTypeExpressionTests(def.interfaces[0].extends[0], "MyBaseClass");
        });
    });
});
