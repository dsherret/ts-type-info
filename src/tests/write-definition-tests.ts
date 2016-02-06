﻿import * as assert from "assert";
import CodeBlockWriter from "code-block-writer";
import {getStringInfo} from "./../main";
import {WriteableDefinitions} from "./../definitions";
import {WriteFlags} from "./../write-flags";
import {writeDefinition} from "./../write-definition";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, ModuledWriter, EnumWriter, TypeAliasWriter, VariableWriter} from "./../writers";
import * as testCode from "./writers/test-code";

function getCodeBlockWriter() {
    return new CodeBlockWriter();
}

function writeDefinitionWrapper(def: WriteableDefinitions, flags: WriteFlags) {
    const writer = getCodeBlockWriter();
    writeDefinition(def, flags, writer);
    return writer.toString();
}

const flags = WriteFlags.Default;

describe("#writeDefinition()", () => {
    describe("ClassDefinition", () => {
        const file = getStringInfo(testCode.classWriterTestCode);
        file.classes.forEach(def => {
            it(`should write the same thing as a class writer for the class ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const classWriter = new ClassWriter(writer, flags);
                classWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("InterfaceDefinition", () => {
        const file = getStringInfo(testCode.interfaceWriterTestCode);
        file.interfaces.forEach(def => {
            it(`should write the same thing as an interface writer for the interface ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const interfaceWriter = new InterfaceWriter(writer, flags);
                interfaceWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("FunctionDefinition", () => {
        const file = getStringInfo(testCode.functionWriterTestCode);
        file.functions.forEach(def => {
            it(`should write the same thing as a function writer for the function ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const functionWriter = new FunctionWriter(writer, flags);
                functionWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("FileDefinition", () => {
        const def = getStringInfo(testCode.fileWriterTestCode);
        it(`should write the same thing as an file writer for the file`, () => {
            const writer = getCodeBlockWriter();
            const fileWriter = new FileWriter(writer, flags);
            fileWriter.write(def);
            assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
        });
    });

    describe("NamespaceDefinition", () => {
        const file = getStringInfo(testCode.namespaceWriterTestCode);
        file.namespaces.forEach(def => {
            it(`should write the same thing as a namespace writer for the namespace ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const namespaceWriter = new NamespaceWriter(writer, flags, new ModuledWriter(writer, flags));
                namespaceWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("EnumDefinition", () => {
        const file = getStringInfo(testCode.enumWriterTestCode);
        file.enums.forEach(def => {
            it(`should write the same thing as an enum writer for the function ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const enumWriter = new EnumWriter(writer, flags);
                enumWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("TypeAliasDefinition", () => {
        const file = getStringInfo(testCode.typeAliasWriterTestCode);
        file.typeAliases.forEach(def => {
            it(`should write the same thing as a type alias writer for the type alias ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const typeAliasWriter = new TypeAliasWriter(writer, flags);
                typeAliasWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });

    describe("VariableDefinition", () => {
        const file = getStringInfo(testCode.variableWriterTestCode);
        file.variables.forEach(def => {
            it(`should write the same thing as a variable writer for the variable ${def.name}`, () => {
                const writer = getCodeBlockWriter();
                const variableWriter = new VariableWriter(writer, flags);
                variableWriter.write(def);
                assert.equal(writeDefinitionWrapper(def, flags), writer.toString());
            });
        });
    });
});
