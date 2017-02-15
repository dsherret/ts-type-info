import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {createNamedImportPart} from "./../../createFunctions";
import {NamedImportPartDefinition} from "./../../definitions";
import {NamedImportPartsWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(NamedImportPartsWriter), () => {
    function createObjects(defs: NamedImportPartDefinition[]) {
        const writer = new CodeBlockWriter();
        const defWriter = new NamedImportPartsWriter(writer, mocks.getNamedImportPartWriter(writer, ...defs));
        return {writer, defWriter};
    }

    describe(nameof<NamedImportPartsWriter>(w => w.write), () => {
        it("should write nothing if there are no named imports", () => {
            const defs: NamedImportPartDefinition[] = [];
            const {writer, defWriter} = createObjects(defs);
            defWriter.write(defs);
            expect(writer.toString()).to.equal(``);
        });

        it("should write out the one named import part surrounded in braces", () => {
            const defs = [createNamedImportPart({ name: "1" })];
            const {writer, defWriter} = createObjects(defs);
            defWriter.write(defs);
            expect(writer.toString()).to.equal(`{{named-import-part:1}}`);
        });

        it("should write out the multiple named import parts surrounded in braces, separated by commas", () => {
            const defs = [createNamedImportPart({ name: "1" }), createNamedImportPart({ name: "2" })];
            const {writer, defWriter} = createObjects(defs);
            defWriter.write(defs);
            expect(writer.toString()).to.equal(`{{named-import-part:1}, {named-import-part:2}}`);
        });
    });
});
