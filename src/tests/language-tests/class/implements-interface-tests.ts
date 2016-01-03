import * as assert from "assert";
import {getStringInfo} from "./../../../main";
import {runNamedDefinitionTests, runTypeExpressionTests} from "./../../test-helpers";

describe("class implements interface tests", () => {
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

    describe("implements clause", () => {
        runTypeExpressionTests(def.classes[0].implements[0], "MyInterface");
        runTypeExpressionTests(def.classes[0].implements[1], "MyTest");
    });

    it("should have nothing in the extends clause", () => {
        assert.equal(def.classes[0].extends.length, 0);
    });
});
