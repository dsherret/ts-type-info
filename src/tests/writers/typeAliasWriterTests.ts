import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {TypeAliasDefinition} from "./../../definitions";
import {TypeAliasWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(TypeAliasWriter), () => {
    function createObjects(def: TypeAliasDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new TypeAliasWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def]),
            mocks.getExportableWriter(writer, def),
            mocks.getAmbientableWriter(writer, def),
            mocks.getTypeWriter(writer, [def.type]),
            mocks.getTypeParametersWriter(writer, def.typeParameters || []));
        return {writer, defWriter, def};
    }

    describe(nameof<TypeAliasWriter>(w => w.write), () => {
        const prefix = "{start}{doc-comment}{export-keyword:0}{declare-keyword}type ";
        const suffix = ";{end}";

        it("should write out the type alias", () => {
            const def = new TypeAliasDefinition();
            def.name = "Name";
            def.setType("string");
            def.addTypeParameter({ name: "T" });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}Name{type-parameters} = {type:string:any}${suffix}`);
        });
    });
});
