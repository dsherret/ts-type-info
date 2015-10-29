import {getStringInfo} from "./../../main";
import * as assert from "assert";

describe("type parameter", () => {
    const code = `
class MyClass<T> {
    str: T;
}`;

    const def = getStringInfo(code);

    it("should have a type parameter name of T", () => {
        assert.equal(def.classes[0].typeParameter.name, "T");
    });
});
