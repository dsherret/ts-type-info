import CodeBlockWriter from "code-block-writer";
import {WriteableDefinitions, ClassDefinition, InterfaceDefinition, FunctionDefinition, FileDefinition, NamespaceDefinition, EnumDefinition} from "./definitions";
import {ClassWriter, InterfaceWriter, FunctionWriter, FileWriter, NamespaceWriter, EnumWriter, ModuledWriter} from "./writers";
import {WriteFlags} from "./write-flags";
import {Logger} from "./utils";

export function writeDefinition(definition: WriteableDefinitions, writeFlags: WriteFlags, writer: CodeBlockWriter) {
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
    else {
        Logger.warn(`Not implemented writer for definition: ${definition.name}`);
    }
}
