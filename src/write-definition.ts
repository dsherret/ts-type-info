import CodeBlockWriter from "code-block-writer";
import {WriteableDefinitions} from "./definitions";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, EnumWriter, ModuledWriter, TypeAliasWriter, VariableWriter} from "./writers";
import {WriteFlags} from "./write-flags";
import {Logger} from "./utils";

export function writeDefinition(definition: WriteableDefinitions, writeFlags: WriteFlags, writer: CodeBlockWriter) {
    if (definition.isClassDefinition()) {
        new ClassWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isInterfaceDefinition()) {
        new InterfaceWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isFunctionDefinition()) {
        new FunctionWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isFileDefinition()) {
        new FileWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isNamespaceDefinition()) {
        new NamespaceWriter(writer, writeFlags, new ModuledWriter(writer, writeFlags)).write(definition);
    }
    else if (definition.isEnumDefinition()) {
        new EnumWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isTypeAliasDefinition()) {
        new TypeAliasWriter(writer, writeFlags).write(definition);
    }
    else if (definition.isVariableDefinition) {
        new VariableWriter(writer, writeFlags).write(definition);
    }
    else {
        Logger.warn(`Not implemented writer for definition: ${definition.name}`);
    }
}
