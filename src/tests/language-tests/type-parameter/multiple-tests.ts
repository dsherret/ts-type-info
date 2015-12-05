import {getStringInfo} from "./../../../main";
import * as assert from "assert";

describe("type parameters - multiple", () => {
    const code = `
class MyClass<T, U> {
    str: T;
}`;

    const def = getStringInfo(code);

    it("should have a type parameter name of T", () => {
        assert.equal(def.classes[0].typeParameters[0].name, "T");
    });

    it("should have a second type parameter name of U", () => {
        assert.equal(def.classes[0].typeParameters[1].name, "U");
    });
});
