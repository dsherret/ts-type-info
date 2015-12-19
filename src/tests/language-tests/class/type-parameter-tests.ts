import {getStringInfo} from "./../../../main";
import * as assert from "assert";

describe("class type parameters", () => {
    const code = `
class MyClass<T, U extends string> {
    tProp: T;
    uProp: U;
}`;

    const def = getStringInfo(code);

    it("should have a type parameter name of T", () => {
        assert.equal(def.classes[0].typeParameters[0].name, "T");
    });

    it("should have a second type parameter name of U", () => {
        assert.equal(def.classes[0].typeParameters[1].name, "U");
    });

    it("it should extend a type string", () => {
        assert.equal(def.classes[0].typeParameters[1].constraint.name, "string");
    });
});
