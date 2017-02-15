import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {VariableDefinition} from "./../../definitions";
import {VariableWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(VariableWriter), () => {
    function createObjects(def: VariableDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new VariableWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def]),
            mocks.getExportableWriter(writer, def),
            mocks.getAmbientableWriter(writer, def),
            mocks.getTypeWithDefaultExpressionWriter(writer, [def]),
            mocks.getVariableDeclarationWriter(writer, def.declarationType));
        return {writer, defWriter};
    }

    describe(nameof<VariableWriter>(w => w.write), () => {
        const prefix = "{start}{doc-comment}{export-keyword:0}{declare-keyword}{var-declaration-type}";
        const suffix = ";{end}";

        it("should write out the variable", () => {
            const def = new VariableDefinition();
            def.name = "Name";
            def.setType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix} Name{type-with-default:0:any}${suffix}`);
        });
    });
});
