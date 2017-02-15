import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {createClassConstructor} from "./../../createFunctions";
import {ClassConstructorDefinition, Scope} from "./../../definitions";
import {ClassConstructorWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(ClassConstructorWriter), () => {
    function createObjects(def: ClassConstructorDefinition, willWritesForFunctionBody = [false]) {
        const writer = new CodeBlockWriter();
        const defWriter = new ClassConstructorWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [def, def, def]),
            mocks.getParametersWriter(writer, [...def.overloadSignatures, def]),
            mocks.getFunctionBodyWriter(writer, [def], willWritesForFunctionBody!),
            mocks.getScopeWriter(writer, [def.scope, def.scope, def.scope]));
        return {writer, defWriter};
    }

    describe(nameof<ClassConstructorWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";
        const constructorStart = `{doc-comment}{scope}constructor`;

        it("should write out the constructor", () => {
            const def = createClassConstructor({ scope: Scope.Private });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            expect(writer.toString()).to.equal(`${prefix}${constructorStart}({parameters:0}){function-body};${suffix}`);
        });

        it("should write out the constructor with overloads", () => {
            const def = createClassConstructor({ overloadSignatures: [{}, {}] });
            const {writer, defWriter} = createObjects(def);
            defWriter.write(def, WriteFlags.None);
            const expected = `${prefix}` +
                `${constructorStart}({parameters:0});\n` +
                `${constructorStart}({parameters:0});\n` +
                `${constructorStart}({parameters:0}){function-body};` +
                `${suffix}`;
            expect(writer.toString()).to.equal(expected);
        });
    });

    describe(nameof<ClassConstructorWriter>(w => w.shouldWriteConstructor), () => {
        it(`should return false if there are no parameters, onWriteFunctionBody is not set, and the scope is public`, () => {
            const def = createClassConstructor();
            const {defWriter} = createObjects(def, [false]);
            expect(defWriter.shouldWriteConstructor(def, WriteFlags.None)).to.equal(false);
        });

        it("should return true if there are more than one parameter", () => {
            const def = createClassConstructor({ parameters: [{ name: "param" }] });
            const {defWriter} = createObjects(def);
            expect(defWriter.shouldWriteConstructor(def, WriteFlags.None)).to.equal(true);
        });

        it("should return true if onWriteFunctionBody is set", () => {
            const def = createClassConstructor({ onWriteFunctionBody: writer => {} });
            const {defWriter} = createObjects(def, [false]);
            expect(defWriter.shouldWriteConstructor(def, WriteFlags.None)).to.equal(true);
        });

        it(`should return true if scope is not public`, () => {
            const def = createClassConstructor({ scope: Scope.Private });
            const {defWriter} = createObjects(def, [false]);
            expect(defWriter.shouldWriteConstructor(def, WriteFlags.None)).to.equal(true);
        });
    });
});
