import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {IndexSignatureDefinition} from "./../../definitions";
import {IndexSignatureWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(IndexSignatureWriter), () => {
    function createObjects(def: IndexSignatureDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new IndexSignatureWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getTypeWriter(writer, [def.keyType, def.returnType]));
        return {writer, defWriter};
    }

    describe(nameof<IndexSignatureWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the index signature", () => {
            const def = new IndexSignatureDefinition();
            def.keyName = "keyName";
            def.setKeyType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}[keyName: {type:string:any}]: {type:any}${suffix}`);
        });

        it("should write out the index signature with readonly keyword", () => {
            const def = new IndexSignatureDefinition();
            def.isReadonly = true;
            def.keyName = "keyName";
            def.setKeyType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}readonly [keyName: {type:string:any}]: {type:any}${suffix}`);
        });
    });
});
