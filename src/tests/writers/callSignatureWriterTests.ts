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
            mocks.getParametersWriter(writer, [def]),
            mocks.getUserDefinedTypeGuardWriter(writer, [def.userDefinedTypeGuard]));
        return {writer, defWriter};
    }

    describe(nameof<CallSignatureWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        describe("#write()", () => {
            it("should write out the call signature", () => {
                const def = new CallSignatureDefinition();
                def.addTypeParameter({ name: "T" });
                def.addParameter({ name: "param" });
                def.setReturnType("string");
                const { writer, defWriter } = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}{type-parameters}({parameters:0}): {type:string:any}${suffix}`);
            });

            it("should write out the user defined type guard", () => {
                const def = new CallSignatureDefinition();
                def.setUserDefinedTypeGuard({
                    parameterName: "p",
                    type: "string"
                });
                const { writer, defWriter } = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}{type-parameters}({parameters:0}): {userDefinedTypeGuard:p:string}${suffix}`);
            });
        });

        describe("#writeAsType()", () => {
            it("should write out the call signature", () => {
                const def = new CallSignatureDefinition();
                def.setReturnType("string");
                const {writer, defWriter} = createObjects(def);
                defWriter.writeAsType(def, WriteFlags.None);
                expect(writer.toString()).to.equal(`${prefix}{type-parameters}({parameters:0}) => {type:string:any}${suffix}`);
            });
        });
    });
});
