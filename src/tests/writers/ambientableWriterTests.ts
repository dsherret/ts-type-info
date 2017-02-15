import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {AmbientableDefinition} from "./../../definitions";
import {AmbientableWriter} from "./../../writers";

describe(nameof(AmbientableWriter), () => {
    class MockAmbientableDefinition extends AmbientableDefinition {
    }

    function getWriteResult(hasDeclareKeyword: boolean) {
        const writer = new CodeBlockWriter();
        const defWriter = new AmbientableWriter(writer);
        const def = new MockAmbientableDefinition();
        def.hasDeclareKeyword = hasDeclareKeyword;
        defWriter.writeDeclareKeyword(def);
        return writer.toString();
    }

    describe(nameof<AmbientableWriter>(w => w.writeDeclareKeyword), () => {
        it("should write when hasDeclareKeyword", () => {
            expect(getWriteResult(true)).to.equal("declare ");
        });

        it("should not write anything when not hasDeclareKeyword", () => {
            expect(getWriteResult(false)).to.equal("");
        });
    });
});
