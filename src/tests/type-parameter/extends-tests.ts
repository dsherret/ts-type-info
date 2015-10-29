import {getStringInfo} from "./../../main";
import * as assert from "assert";

describe("type parameter with extends", () => {
    const code = `
class MyClass<T extends string> {
    str: T;
}`;

    const def = getStringInfo(code);

    it("it should extend a type string", () => {
        assert.equal(def.classes[0].typeParameter.constraint.name, "string");
    });
});