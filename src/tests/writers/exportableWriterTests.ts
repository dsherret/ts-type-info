import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ExportableDefinition, AmbientableDefinition, InterfaceDefinition, TypeAliasDefinition} from "./../../definitions";
import {ExportableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";

describe(nameof(ExportableWriter), () => {
    class MockExportableDefinition extends ExportableDefinition implements AmbientableDefinition {
        isAmbient: boolean;
        hasDeclareKeyword: boolean;
    }

    function getWriteResult(def: MockExportableDefinition, writeFlags: WriteFlags) {
        const writer = new CodeBlockWriter();
        const defWriter = new ExportableWriter(writer);
        defWriter.writeExportKeyword(def, writeFlags);
        return writer.toString();
    }

    describe(nameof<ExportableWriter>(w => w.writeExportKeyword), () => {
        it("should not write anything for something not exported", () => {
            const def = new MockExportableDefinition();
            expect(getWriteResult(def, WriteFlags.None)).to.equal("");
        });

        it("should not write anything for a default export", () => {
            const def = new MockExportableDefinition();
            def.isDefaultExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("");
        });

        it("should write export for a named export that's also a default export", () => {
            const def = new MockExportableDefinition();
            def.isNamedExportOfFile = true;
            def.isDefaultExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("export ");
        });

        it("should write export for a named export", () => {
            const def = new MockExportableDefinition();
            def.isNamedExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("export ");
        });

        it("should not write for an exported ambient definition", () => {
            const def = new MockExportableDefinition();
            def.isNamedExportOfFile = true;
            def.isAmbient = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("");
        });

        it("should write for an exported type alias", () => {
            const def = new TypeAliasDefinition();
            def.isNamedExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("export ");
        });

        it("should not write for a type alias when is in ambient context", () => {
            const def = new TypeAliasDefinition();
            def.isNamedExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.IsInAmbientContext)).to.equal("");
        });

        it("should write for an exported interface", () => {
            const def = new InterfaceDefinition();
            def.isNamedExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.None)).to.equal("export ");
        });

        it("should not write for a interface when is in ambient context", () => {
            const def = new InterfaceDefinition();
            def.isNamedExportOfFile = true;
            expect(getWriteResult(def, WriteFlags.IsInAmbientContext)).to.equal("");
        });
    });
});
