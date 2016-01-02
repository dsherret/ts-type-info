import {getStringInfo} from "./../../../main";
import {runTypeExpressionTests} from "./../../test-helpers";
import * as assert from "assert";

describe("class type parameters", () => {
    const code = `
class MyClass<T, U extends string> {
    tProp: T;
    uProp: U;
}

class MyExtendsClass extends MyClass<number, string> {
}

class MyImplementsClass implements MyClass<number, string> {
    tProp: number;
    uProp: string;
}
`;

    const def = getStringInfo(code);

    describe("MyClass", () => {
        it("should have a type parameter name of T", () => {
            assert.equal(def.classes[0].typeParameters[0].name, "T");
        });

        it("should have a second type parameter name of U", () => {
            assert.equal(def.classes[0].typeParameters[1].name, "U");
        });

        it("should extend a type string", () => {
            assert.equal(def.classes[0].typeParameters[1].constraint.text, "string");
        });
    });

    describe("MyExtendsClass", () => {
        const c = def.classes[1];
        it("should extend a type name of MyClass<number, string>", () => {
            assert.equal(c.extends[0].text, "MyClass<number, string>");
        });

        it("should extend a definition MyClass", () => {
            assert.equal(c.extends[0].types[0].definition, def.classes[0]);
        });

        it("should extend a definition MyClass with a number type param", () => {
            runTypeExpressionTests(c.extends[0].types[0].typeArguments[0], "number");
        });

        it("should extend a definition MyClass with a string type param", () => {
            runTypeExpressionTests(c.extends[0].types[0].typeArguments[1], "string");
        });
    });

    describe("MyImplementsClass", () => {
        const c = def.classes[2];
        it("should implement a type name of MyClass<number, string>", () => {
            assert.equal(c.implements[0].text, "MyClass<number, string>");
        });

        it("should implement a definition MyClass", () => {
            assert.equal(c.implements[0].types[0].definition, def.classes[0]);
        });

        it("should implement a definition MyClass with a number type param", () => {
            runTypeExpressionTests(c.implements[0].types[0].typeArguments[0], "number");
        });

        it("should extend a definition MyClass with a string type param", () => {
            runTypeExpressionTests(c.implements[0].types[0].typeArguments[1], "string");
        });
    });
});
