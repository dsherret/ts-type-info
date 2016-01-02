import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests, runTypeExpressionTests} from "./../../test-helpers";

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

    describe("MyBaseInterface", () => {
        runNamedDefinitionTests(def.interfaces[0], "MyBaseInterface");
    });

    describe("MyChildInterface", () => {
        runNamedDefinitionTests(def.interfaces[1], "MyChildInterface");

        describe("extends clause", () => {
            runTypeExpressionTests(def.interfaces[1].extends[0], "MyBaseInterface");
        });
    });
});
