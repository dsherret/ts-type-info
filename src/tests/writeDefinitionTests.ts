import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {getInfoFromString} from "./../main";
import {WriteableDefinitions} from "./../definitions";
import {writeDefinition} from "./../writeDefinition";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, ModuledWriter, EnumWriter, TypeAliasWriter, VariableWriter} from "./../writers";
import {WriteFlags} from "./../WriteFlags";
import * as testCode from "./writers/testCode";

function getCodeBlockWriter() {
    return new CodeBlockWriter();
}

function writeDefinitionWrapper(def: WriteableDefinitions) {
    const writer = getCodeBlockWriter();
    writeDefinition(def, writer);
    return writer.toString();
}

describe("#writeDefinition()", () => {
    describe("ClassDefinition", () => {
        const file = getInfoFromString(testCode.classWriterTestCode);
        file.classes.forEach(def => {
            it(`should write the same thing as a class writer for the class ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const classWriter = new ClassWriter(writer);
                classWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("InterfaceDefinition", () => {
        const file = getInfoFromString(testCode.interfaceWriterTestCode);
        file.interfaces.forEach(def => {
            it(`should write the same thing as an interface writer for the interface ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const interfaceWriter = new InterfaceWriter(writer);
                interfaceWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("FunctionDefinition", () => {
        const file = getInfoFromString(testCode.functionWriterTestCode);
        file.functions.forEach(def => {
            it(`should write the same thing as a function writer for the function ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const functionWriter = new FunctionWriter(writer);
                functionWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("FileDefinition", () => {
        const def = getInfoFromString(testCode.fileWriterTestCode);
        it(`should write the same thing as an file writer for the file`, () => {
            const writer = getCodeBlockWriter();
            const fileWriter = new FileWriter(writer);
            fileWriter.write(def, WriteFlags.Default);
            assert.equal(writeDefinitionWrapper(def), writer.toString());
        });
    });

    describe("NamespaceDefinition", () => {
        const file = getInfoFromString(testCode.namespaceWriterTestCode);
        file.namespaces.forEach(def => {
            it(`should write the same thing as a namespace writer for the namespace ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const namespaceWriter = new NamespaceWriter(writer, new ModuledWriter(writer));
                namespaceWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("EnumDefinition", () => {
        const file = getInfoFromString(testCode.enumWriterTestCode);
        file.enums.forEach(def => {
            it(`should write the same thing as an enum writer for the function ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const enumWriter = new EnumWriter(writer);
                enumWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("TypeAliasDefinition", () => {
        const file = getInfoFromString(testCode.typeAliasWriterTestCode);
        file.typeAliases.forEach(def => {
            it(`should write the same thing as a type alias writer for the type alias ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const typeAliasWriter = new TypeAliasWriter(writer);
                typeAliasWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });

    describe("VariableDefinition", () => {
        const file = getInfoFromString(testCode.variableWriterTestCode);
        file.variables.forEach(def => {
            it(`should write the same thing as a variable writer for the variable ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const variableWriter = new VariableWriter(writer);
                variableWriter.write(def, WriteFlags.Default);
                assert.equal(writeDefinitionWrapper(def), writer.toString());
            });
        });
    });
});
