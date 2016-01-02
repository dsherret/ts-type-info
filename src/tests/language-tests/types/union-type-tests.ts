import {getStringInfo} from "./../../../main";
import * as assert from "assert";
import {runTypeExpressionTests} from "./../../test-helpers";

describe("union type tests", () => {
    const code = `
class MyClass {
    prop: MyClass | MyOtherClass<string>;
}

class MyOtherClass<T> {
}
`;

    const def = getStringInfo(code);
    const prop = def.classes[0].properties[0];

    describe("union type", () => {
        runTypeExpressionTests(prop.typeExpression, "MyClass | MyOtherClass<string>");

        describe("MyClass", () => {
            it("should have a type for MyClass", () => {
                assert.equal(prop.typeExpression.types[0].text, "MyClass");
            });

            it("should have a definition for MyClass in that type", () => {
                assert.equal(prop.typeExpression.types[0].definition, def.classes[0]);
            });
        });

        describe("MyOtherClass<string>", () => {
            it("should have a type for MyOtherClass<string>", () => {
                assert.equal(prop.typeExpression.types[1].text, "MyOtherClass<string>");
            });

            it("should have a parameter string", () => {
                assert.equal(prop.typeExpression.types[1].typeArguments[0].text, "string");
            });

            it("should have a definition for MyOtherClass in that type", () => {
                assert.equal(prop.typeExpression.types[1].definition, def.classes[1]);
            });
        });
    });
});
