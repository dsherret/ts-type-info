import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {EnumMemberDefinition} from "./../../definitions";
import {EnumMemberWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(EnumMemberWriter), () => {
    function createObjects() {
        const writer = new CodeBlockWriter();
        const def = new EnumMemberDefinition();
        const defWriter = new EnumMemberWriter(writer, mocks.getBaseDefinitionWriter(writer, def), mocks.getDocumentationedWriter(writer, [def]));
        return {writer, defWriter, def};
    }

    describe(nameof<EnumMemberWriter>(w => w.write), () => {
        it("should write out the enum member", () => {
            const {writer, defWriter, def} = createObjects();
            def.name = "Name";
            def.value = 1;
            defWriter.write(def);
            expect(writer.toString()).to.equal("{start}{doc-comment}Name = 1{end}");
        });
    });
});
