import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {NamedImportPartDefinition} from "./../../definitions";
import {NamedImportPartWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(NamedImportPartWriter), () => {
    function createObjects(def: NamedImportPartDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new NamedImportPartWriter(writer, mocks.getBaseDefinitionWriter(writer, def));
        return {writer, defWriter};
    }

    describe(nameof<NamedImportPartWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the named import part", () => {
            const def = new NamedImportPartDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}Name${suffix}`);
        });

        it("should write out the named import part with the alias", () => {
            const def = new NamedImportPartDefinition();
            def.name = "Name";
            def.alias = "Alias";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}Name as Alias${suffix}`);
        });

        it("should write out the named import part without the alias when they are equal", () => {
            const def = new NamedImportPartDefinition();
            def.name = "Name";
            def.alias = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}Name${suffix}`);
        });
    });
});
