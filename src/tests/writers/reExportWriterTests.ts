import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ReExportDefinition} from "./../../definitions";
import {ReExportWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(ReExportWriter), () => {
    function createObjects(def: ReExportDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new ReExportWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getNamedImportPartsWriter(writer, def.namedExports || []));
        return {writer, defWriter};
    }

    describe(nameof<ReExportWriter>(w => w.write), () => {
        const prefix = "{start}export ";
        const suffix = ";{end}";

        it("should write out the re-export without named exports if none exist", () => {
            const def = new ReExportDefinition();
            def.moduleSpecifier = "test";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}* from "test"${suffix}`);
        });

        it("should write out the re-export with named exports if they exist", () => {
            const def = new ReExportDefinition();
            def.moduleSpecifier = "test";
            def.addNamedExport({ name: "export" });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}{named-import-parts} from "test"${suffix}`);
        });
    });
});
