import {getStringInfo} from "./../../../main";
import * as assert from "assert";

describe("function type tests", () => {
    const code = `
class MyClass {
    myMethod(func: (str: string) => void)) {
    }
}`;

    const def = getStringInfo(code);
    const param = def.classes[0].methods[0].parameters[0];

    it("should have type name of (str: string) => void", () => {
        assert.equal(param.typeExpression.text, "(str: string) => void");
    });

    it("should have one parameter", () => {
        assert.equal(param.typeExpression.types[0].callSignatures[0].parameters.length, 1);
    });

    it("parameter should be of type string", () => {
        assert.equal(param.typeExpression.types[0].callSignatures[0].parameters[0].typeExpression.text, "string");
    });
});
