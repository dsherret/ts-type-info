import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {FunctionDefinition, MethodDefinitions, ClassMethodDefinition, ClassStaticMethodDefinition} from "./../../definitions";
import {createFunction, createClassMethod, createClassStaticMethod} from "./../../createFunctions";
import {FunctionWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import * as mocks from "./mocks";

describe(nameof(FunctionWriter), () => {
    function createObjects(def: FunctionDefinition | MethodDefinitions) {
        const writer = new CodeBlockWriter();
        const defWriter = new FunctionWriter(
            writer,
            mocks.getBaseDefinitionWriter(writer, def),
            mocks.getDocumentationedWriter(writer, [...def.overloadSignatures, def]),
            mocks.getDecoratorsWriter(writer, [def as ClassMethodDefinition]),
            mocks.getExportableWriter(writer, def as FunctionDefinition),
            mocks.getAmbientableWriter(writer, def as FunctionDefinition),
            mocks.getAsyncableWriter(writer, def as FunctionDefinition),
            mocks.getScopeWriter(writer, [(def as ClassMethodDefinition).scope]),
            mocks.getCallSignatureWriter(writer, def.overloadSignatures),
            mocks.getTypeParametersWriter(writer, def.typeParameters),
            mocks.getParametersWriter(writer, [def]),
            mocks.getFunctionBodyWriter(writer, [def as FunctionDefinition], [false]),
            mocks.getFunctionReturnTypeWriter(writer, [def]));
        return {writer, defWriter};
    }

    describe(nameof<FunctionWriter>(w => w.write), () => {
        const prefix = "{start}";
        const suffix = "{end}";

        describe(nameof(FunctionDefinition), () => {
            const callSignatureStart = (writeFlags: number) => `{doc-comment}{export-keyword:${writeFlags}}{declare-keyword}{async-keyword}`;
            const functionStart = (writeFlags: number) => `{doc-comment}{decorators:${writeFlags}:newline}{export-keyword:${writeFlags}}{declare-keyword}{async-keyword}`;
            const functionEnd = (writeFlags: number) => `{type-parameters}({parameters:${writeFlags}}){function-return-type}{function-body};`;

            it("should write out the function", () => {
                const def = createFunction({
                    name: "Name"
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${functionStart(0)}function Name${functionEnd(0)}${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out the function with * when generator", () => {
                const def = createFunction({
                    name: "Name",
                    isGenerator: true
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}${functionStart(0)}function* Name${functionEnd(0)}${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out the function with overload signatures", () => {
                const def = createFunction({
                    name: "Name",
                    overloadSignatures: [{}, {}]
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = prefix +
                    `${callSignatureStart(0)}function Name{call-signature:0};\n` +
                    `${callSignatureStart(0)}function Name{call-signature:0};\n` +
                    `${functionStart(0)}function Name${functionEnd(0)}${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it(`should write out the function without the implementation when there are more than one overload signatures and ${WriteFlags.HideFunctionImplementations} is set`, () => {
                const def = createFunction({
                    name: "Name",
                    overloadSignatures: [{}]
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.HideFunctionImplementations);
                const expected = `${prefix}${callSignatureStart(64)}function Name{call-signature:64};\n${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it(`should write out the function with the implementation when there are zero overload signatures and ${WriteFlags.HideFunctionImplementations} is set`, () => {
                const def = createFunction({
                    name: "Name"
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.HideFunctionImplementations);
                const expected = `${prefix}${functionStart(64)}function Name${functionEnd(64)}${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });
        });

        describe(nameof(ClassMethodDefinition), () => {
            it("should write out the method", () => {
                const def = createClassMethod({
                    name: "Name"
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}{doc-comment}{decorators:0:newline}{scope}{async-keyword}Name{type-parameters}({parameters:0})` +
                    `{function-return-type}{function-body};${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });

            it("should write out the abstract method with abstract keyword", () => {
                const def = createClassMethod({
                    name: "Name",
                    isAbstract: true
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}{doc-comment}{decorators:0:newline}{scope}abstract {async-keyword}Name{type-parameters}({parameters:0})` +
                    `{function-return-type}{function-body};${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });
        });

        describe(nameof(ClassStaticMethodDefinition), () => {
            it("should write out the static method with static keyword", () => {
                const def = createClassStaticMethod({
                    name: "Name"
                });
                const {writer, defWriter} = createObjects(def);
                defWriter.write(def, WriteFlags.None);
                const expected = `${prefix}{doc-comment}{decorators:0:newline}{scope}static {async-keyword}Name{type-parameters}({parameters:0})` +
                    `{function-return-type}{function-body};${suffix}`;
                expect(writer.toString()).to.equal(expected);
            });
        });
    });
});
