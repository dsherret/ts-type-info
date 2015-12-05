import {getStringInfo} from "./../../../main";
import * as assert from "assert";

describe("class name tests", () => {
    const code = `
class MyClass {
}`;

    const def = getStringInfo(code);

    it("should have a name of MyClass", () => {
        assert.equal(def.classes[0].name, "MyClass");
    });
});
