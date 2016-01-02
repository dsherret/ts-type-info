import {getStringInfo} from "./../../../main";
// import * as assert from "assert";
import {runTypeExpressionTests} from "./../../test-helpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass;
}

class MyOtherClass {
}
`;

    const def = getStringInfo(code);
    const prop = def.classes[0].properties[0];

    runTypeExpressionTests(prop.typeExpression, "MyClass | MyOtherClass");

    it("should have both classes in definitions", () => {
        // console.log(prop.typeExpression.tsType);
        // assert.equal(prop.type.definitions
    });
});
