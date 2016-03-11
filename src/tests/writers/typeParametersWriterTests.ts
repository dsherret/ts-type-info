import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {TypeParametersWriter} from "./../../writers";
import {TypeParameterDefinition} from "./../../definitions";
import {getInfoFromString} from "./../../main";

function getTypeParametersAsString(typeParameters: TypeParameterDefinition<any>[]) {
    const codeBlockWriter = new CodeBlockWriter();
    const writer = new TypeParametersWriter(codeBlockWriter);

    writer.write(typeParameters);

    return codeBlockWriter.toString();
}

describe("TypeParametersWriter", () => {
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
    const file = getInfoFromString(code);

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
