import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeParameterWriter} from "./../../writers";
import {TypeParameterDefinition} from "./../../definitions";
import {getStringInfo} from "./../../main";

function getTypeParametersAsString(typeParameters: TypeParameterDefinition[]) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeParameterWriter(codeBlockWriter);

    writer.write(typeParameters);

    return codeBlockWriter.toString();
}

describe("TypeExpressionWriter", () => {
    const code = `
class MyClassOne<T> {
    name: T;
    prop: S;
}

class MyClassTwo<T, S extends string> {
    name: T;
    prop: S;
}
`;
    const file = getStringInfo(code);

    describe("write()", () => {
        describe("MyClass1", () => {
            const myClass = file.classes[0];

            it("should contain the type parameters written out", () => {
                assert.equal(getTypeParametersAsString(myClass.typeParameters), "<T>");
            });
        });

        describe("MyClass2", () => {
            const myClass = file.classes[1];

            it("should contain the type parameters written out", () => {
                assert.equal(getTypeParametersAsString(myClass.typeParameters), "<T, S extends string>");
            });
        });
    });
});
