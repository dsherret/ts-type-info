import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ImportDefinition} from "./../../definitions";
import {ImportWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(ImportWriter), () => {
    function createObjects(def: ImportDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new ImportWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def));
        return {writer, defWriter};
    }

    describe(nameof<ImportWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out an import with no named, star, or default imports", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            // should ignore the named import
            expect(writer.toString()).to.equal(`${prefix}import "moduleSpecifier";${suffix}`);
        });

        it("should write out a default import", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.setDefaultImport("defaultImport");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import defaultImport from "moduleSpecifier";${suffix}`);
        });

        it("should write out a default import with a star import", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.setDefaultImport("defaultImport");
            def.starImportName = "starImport";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import defaultImport, * as starImport from "moduleSpecifier";${suffix}`);
        });

        it("should write out a default import with a named import", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.setDefaultImport("defaultImport");
            def.addNamedImport({ name: "namedImport" });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import defaultImport, {namedImport} from "moduleSpecifier";${suffix}`);
        });

        it("should write out a default import with a star import when also specifying a named import", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.setDefaultImport("defaultImport");
            def.starImportName = "starImport";
            def.addNamedImport({ name: "namedImport" });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            // should ignore the named import
            expect(writer.toString()).to.equal(`${prefix}import defaultImport, * as starImport from "moduleSpecifier";${suffix}`);
        });

        it("should write out a star import", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.starImportName = "starImport";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import * as starImport from "moduleSpecifier";${suffix}`);
        });

        it("should write out a named import without alias when the alias equals the name", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.addNamedImport({
                name: "namedImport",
                alias: "namedImport"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import {namedImport} from "moduleSpecifier";${suffix}`);
        });

        it("should write out a named import with alias when the alias does not equal the name", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.addNamedImport({
                name: "namedImport",
                alias: "alias"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import {namedImport as alias} from "moduleSpecifier";${suffix}`);
        });

        it("should write out multiple named imports", () => {
            const def = new ImportDefinition();
            def.moduleSpecifier = "moduleSpecifier";
            def.addNamedImport({
                name: "namedImport"
            });
            def.addNamedImport({
                name: "namedImport2"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}import {namedImport, namedImport2} from "moduleSpecifier";${suffix}`);
        });
    });
});
