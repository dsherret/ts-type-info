import CodeBlockWriter from "code-block-writer";
import {WriteableDefinitions, ClassDefinition, InterfaceDefinition, FunctionDefinition, FileDefinition, NamespaceDefinition,
    EnumDefinition, TypeAliasDefinition, VariableDefinition} from "./definitions";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, EnumWriter, ModuledWriter, TypeAliasWriter, VariableWriter} from "./writers";
import {WriteFlags} from "./write-flags";
import {Logger} from "./utils";

export function writeDefinition(definition: WriteableDefinitions, writeFlags: WriteFlags, writer: CodeBlockWriter) {
    // todo: don't do an instance check so that this works with data that was serialized and loaded
    if (definition instanceof ClassDefinition) {
        new ClassWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof InterfaceDefinition) {
        new InterfaceWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof FunctionDefinition) {
        new FunctionWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof FileDefinition) {
        new FileWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof NamespaceDefinition) {
        new NamespaceWriter(writer, new ModuledWriter(writer)).write(definition, writeFlags);
    }
    else if (definition instanceof EnumDefinition) {
        new EnumWriter(writer).write(definition);
    }
    else if (definition instanceof TypeAliasDefinition) {
        new TypeAliasWriter(writer).write(definition);
    }
    else if (definition instanceof VariableDefinition) {
        new VariableWriter(writer).write(definition, writeFlags);
    }
    else {
        Logger.warn(`Not implemented writer for definition: ${definition.name}`);
    }
}
