import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {CallSignatureDefinition} from "./../../definitions";
import {CallSignatureWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(CallSignatureWriter), () => {
    function createObjects(def: CallSignatureDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new CallSignatureWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getTypeParametersWriter(writer, def.typeParameters),
            mocks.getTypeWriter(writer, [def.returnType]),
            mocks.getParametersWriter(writer, [def]));
        return {writer, defWriter};
    }

    describe(nameof<CallSignatureWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the call signature", () => {
            const def = new CallSignatureDefinition();
            def.addTypeParameter({ name: "T" });
            def.addParameter({ name: "param" });
            def.setReturnType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}{type-parameters}({parameters:0}): {type:string:any}${suffix}`);
        });
    });
});
