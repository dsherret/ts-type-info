import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {createTypeParameter} from "./../../createFunctions";
import {TypeParametersWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(TypeParametersWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const defWriter = new TypeParametersWriter(writer, mocks.getTypeParameterWriter(writer));
        return {writer, defWriter};
    }

    describe(nameof<TypeParametersWriter>(w => w.write), () => {
        it("should write out the one type parameter surrounded in angle brackets", () => {
            const defs = [createTypeParameter({ name: "1" })];
            const {writer, defWriter} = createObjects();
            defWriter.write(defs);
            expect(writer.toString()).to.equal(`<{type-parameter:1}>`);
        });

        it("should write out the multiple type parameters surrounded in angle brackets, separated by commas", () => {
            const defs = [createTypeParameter({ name: "1" }), createTypeParameter({ name: "2" })];
            const {writer, defWriter} = createObjects();
            defWriter.write(defs);
            expect(writer.toString()).to.equal(`<{type-parameter:1}, {type-parameter:2}>`);
        });
    });
});
