import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {DecoratorDefinition} from "./../../definitions";
import {createDecorator} from "./../../createFunctions";
import {DecoratorWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(DecoratorWriter), () => {
    function getObjects(def: DecoratorDefinition) {
        const writer = new CodeBlockWriter();
        const defWriter = new DecoratorWriter(writer, mocks.getBaseDefinitionWriter(writer, def));
        return {writer, defWriter};
    }

    describe(nameof<DecoratorWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        it("should write the decorator", () => {
            const def = createDecorator({ name: "decorator" });
            const {writer, defWriter} = getObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}@decorator${suffix}`);
        });

        it("should write the decorator with one argument", () => {
            const def = createDecorator({
                name: "decorator",
                arguments: ["5"]
            });
            const {writer, defWriter} = getObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}@decorator(5)${suffix}`);
        });

        it("should write the decorator with multiple arguments", () => {
            const def = createDecorator({
                name: "decorator",
                arguments: ["5", "6"]
            });
            const {writer, defWriter} = getObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}@decorator(5, 6)${suffix}`);
        });

        it(`should not write the decorator if the ${nameof(WriteFlags.HideFunctionImplementations)} flag is set`, () => {
            const def = createDecorator({ name: "decorator" });
            const {writer, defWriter} = getObjects(def);
            defWriter.write(def, WriteFlags.HideFunctionImplementations);
            expect(writer.toString()).to.equal("");
        });
    });
});
