import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {ParameteredDefinitions, ClassMethodDefinition, FunctionDefinition} from "./../../definitions";
import {ParametersWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(ParametersWriter), () => {
    function createObjects(def: ParameteredDefinitions) {
        const writer = new CodeBlockWriter();
        const defWriter = new ParametersWriter(
            writer,
            mocks.getParameterWriter(writer, def.parameters),
            mocks.getParameterWithDestructuringWriter(writer, def.parameters),
            mocks.getTypeWriter(writer, (def as ClassMethodDefinition).parameters.map(p => p.type)));
        return {writer, defWriter};
    }

    describe(nameof<ParametersWriter>(w => w.write), () => {
        it("should write out the parameter", () => {
            const def = new ClassMethodDefinition();
            def.addParameter({
                name: "myParam",
                type: "string"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`({parameter:0})`);
        });

        it("should write out the parameters", () => {
            const def = new ClassMethodDefinition();
            def.addParameter({
                name: "myParam",
                type: "string"
            });
            def.addParameter({
                name: "myParam2",
                type: "string"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`({parameter:0}, {parameter:0})`);
        });

        it("should write out the this type", () => {
            const def = new FunctionDefinition();
            def.setThisType("string");
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`(this: {type:string:any})`);
        });

        it("should write out the this type and parameter", () => {
            const def = new FunctionDefinition();
            def.setThisType("string");
            def.addParameter({
                name: "myParam",
                type: "string"
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`(this: {type:string:any}, {parameter:0})`);
        });

        it("should write out a destructuring parameter", () => {
            const def = new ClassMethodDefinition();
            def.addParameter({
                name: "myParam",
                type: "string"
            });
            def.addParameter({
                destructuringProperties: [{
                    name: "myProp",
                    type: "string"
                }]
            });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`({parameter:0}, {destructuring-param:0})`);
        });
    });
});
