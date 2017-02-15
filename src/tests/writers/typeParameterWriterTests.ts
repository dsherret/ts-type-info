import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {TypeParameterDefinition} from "./../../definitions";
import {TypeParameterWriter} from "./../../writers";
import * as mocks from "./mocks";

describe(nameof(TypeParameterWriter), () => {
    function createObjects(def: TypeParameterDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new TypeParameterWriter(writer, mocks.getBaseDefinitionWriter(writer, def), mocks.getTypeWriter(writer, [def.constraintType]));
        return {writer, defWriter};
    }

    describe(nameof<TypeParameterWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write out the type parameter", () => {
            const def = new TypeParameterDefinition();
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}Name${suffix}`);
        });

        it("should write out the type parameter with an extends type", () => {
            const def = new TypeParameterDefinition();
            def.setConstraintType("string");
            def.name = "Name";
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def);
            expect(writer.toString()).to.equal(`${prefix}Name extends {type:string:any}${suffix}`);
        });
    });
});
