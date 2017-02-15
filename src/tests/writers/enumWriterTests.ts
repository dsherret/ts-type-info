import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {EnumDefinition} from "./../../definitions";
import {EnumWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(EnumWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const def = new EnumDefinition();
        const defWriter = new EnumWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def]),
            mocks.getExportableWriter(writer, def),
            mocks.getAmbientableWriter(writer, def),
            mocks.getEnumMemberWriter(writer));
        return {writer, defWriter, def};
    }

    describe(nameof<EnumWriter>(w => w.write), () => {
        const prefix = "{start}{doc-comment}{export-keyword:0}{declare-keyword}";
        const suffix = "\n{end}";

        it("should write out the enum with no members", () => {
            const {writer, defWriter, def} = createObjects();
            def.name = "Name";
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}enum Name {\n}${suffix}`);
        });

        it("should write out the enum that's const", () => {
            const {writer, defWriter, def} = createObjects();
            def.name = "Name";
            def.isConst = true;
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}const enum Name {\n}${suffix}`);
        });

        it("should write out an enum member", () => {
            const {writer, defWriter, def} = createObjects();
            def.name = "Name";
            def.addMember({ name: "member", value: 1 });
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}enum Name {\n    {enum-member:member}\n}${suffix}`);
        });

        it("should write out enum members", () => {
            const {writer, defWriter, def} = createObjects();
            def.name = "Name";
            def.addMember({ name: "member1", value: 1 });
            def.addMember({ name: "member2", value: 5 });
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}enum Name {\n    {enum-member:member1},\n    {enum-member:member2}\n}${suffix}`);
        });
    });
});
