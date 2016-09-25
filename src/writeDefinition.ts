import CodeBlockWriter from "code-block-writer";
import * as definitions from "./definitions";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, EnumWriter, ModuledWriter, TypeAliasWriter, VariableWriter} from "./writers";
import {WriteFlags} from "./WriteFlags";
import {Logger} from "./utils";

export function writeDefinition(definition: definitions.WriteableDefinitions, writer: CodeBlockWriter, writeFlags = WriteFlags.Default) {
    if (definition instanceof definitions.ClassDefinition) {
        new ClassWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.InterfaceDefinition) {
        new InterfaceWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.FunctionDefinition) {
        new FunctionWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.FileDefinition) {
        new FileWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.NamespaceDefinition) {
        new NamespaceWriter(writer, new ModuledWriter(writer)).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.EnumDefinition) {
        new EnumWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.TypeAliasDefinition) {
        new TypeAliasWriter(writer).write(definition, writeFlags);
    }
    else if (definition instanceof definitions.VariableDefinition) {
        new VariableWriter(writer).write(definition, writeFlags);
    }
    else {
        Logger.warn(`Not implemented writer for definition: ${(definition as definitions.NamedDefinition).name}`);
    }
}
