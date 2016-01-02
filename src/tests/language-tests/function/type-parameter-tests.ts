import {getStringInfo} from "./../../../main";
import * as assert from "assert";

describe("function type parameters", () => {
    const code = `
function myTypeParameterFunction<T, U extends string>(param1: T, param2: U) {
    console.log(param1);
    console.log(param2);
}`;

    const def = getStringInfo(code);

    it("should have a type parameter name of T", () => {
        assert.equal(def.functions[0].typeParameters[0].name, "T");
    });

    it("should have a second type parameter name of U", () => {
        assert.equal(def.functions[0].typeParameters[1].name, "U");
    });

    it("it should extend a type string", () => {
        assert.equal(def.functions[0].typeParameters[1].constraint.text, "string");
    });
});
