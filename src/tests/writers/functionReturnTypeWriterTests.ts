import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {FunctionDefinition} from "./../../definitions";
import {FunctionReturnTypeWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(FunctionReturnTypeWriter), () => {
    function createObjects(def: FunctionDefinition, willWrites: boolean[]) {
        const writer = new CodeBlockWriter();
        const defWriter = new FunctionReturnTypeWriter(
            writer,
            mocks.getFunctionBodyWriter(writer, [def], willWrites),
            mocks.getTypeWriter(writer, [def.returnType]));

        return {writer, defWriter};
    }

    describe(nameof<FunctionReturnTypeWriter>(w => w.write), () => {
        it("should write out the type when function body writer's will write is false", () => {
            const def = new FunctionDefinition();
            def.setReturnType("string");
            const {writer, defWriter} = createObjects(def, [false]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`: {type:string:any}`);
        });

        it("should not write out the type when function body writer's will write is true", () => {
            const def = new FunctionDefinition();
            def.setReturnType("string");
            const {writer, defWriter} = createObjects(def, [true]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(``);
        });

        it("should write out the type when function body writer's will write is true, but it has an overload signature", () => {
            const def = new FunctionDefinition();
            def.setReturnType("string");
            def.addOverloadSignature({});
            const {writer, defWriter} = createObjects(def, [true]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`: {type:string:any}`);
        });

        it("should write out the user defined type guard when set and has a parameter", () => {
            const def = new FunctionDefinition();
            def.setUserDefinedTypeGuard({
                parameterName: "name",
                type: "BaseDefinition"
            });
            const {writer, defWriter} = createObjects(def, [true]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`: name is BaseDefinition`);
        });

        it("should write out the user defined type guard when set and has a parameter and will write is false", () => {
            const def = new FunctionDefinition();
            def.setUserDefinedTypeGuard({
                parameterName: "name",
                type: "BaseDefinition"
            });
            const {writer, defWriter} = createObjects(def, [false]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`: name is BaseDefinition`);
        });

        it("should write out the user defined type guard with this when no parameter name is specified", () => {
            const def = new FunctionDefinition();
            def.setUserDefinedTypeGuard({
                parameterName: "",
                type: "BaseDefinition"
            });
            def.userDefinedTypeGuard!.parameterName = null as any;
            const {writer, defWriter} = createObjects(def, [true]);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`: this is BaseDefinition`);
        });
    });
});
