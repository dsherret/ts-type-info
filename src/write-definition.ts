import CodeBlockWriter from "code-block-writer";
import {WriteableDefinitions} from "./definitions";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, EnumWriter, ModuledWriter, TypeAliasWriter, VariableWriter} from "./writers";
import {WriteFlags} from "./write-flags";
import {Logger} from "./utils";

export function writeDefinition(definition: WriteableDefinitions, writeFlags: WriteFlags, writer: CodeBlockWriter) {
    if (definition.isClassDefinition()) {
        new ClassWriter(writer).write(definition, writeFlags);
    }
    else if (definition.isInterfaceDefinition()) {
        new InterfaceWriter(writer).write(definition, writeFlags);
    }
    else if (definition.isFunctionDefinition()) {
        new FunctionWriter(writer).write(definition, writeFlags);
    }
    else if (definition.isFileDefinition()) {
        new FileWriter(writer).write(definition, writeFlags);
    }
    else if (definition.isNamespaceDefinition()) {
        new NamespaceWriter(writer, new ModuledWriter(writer)).write(definition, writeFlags);
    }
    else if (definition.isEnumDefinition()) {
        new EnumWriter(writer).write(definition);
    }
    else if (definition.isTypeAliasDefinition()) {
        new TypeAliasWriter(writer).write(definition);
    }
    else if (definition.isVariableDefinition) {
        new VariableWriter(writer).write(definition, writeFlags);
    }
    else {
        Logger.warn(`Not implemented writer for definition: ${definition.name}`);
    }
}
