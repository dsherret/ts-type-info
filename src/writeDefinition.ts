import CodeBlockWriter from "code-block-writer";
import * as definitions from "./definitions";
import {WriteFlags} from "./WriteFlags";
import {MainFactory} from "./factories";
import {Logger} from "./utils";

export function writeDefinition(definition: definitions.WriteableDefinitions, writer: CodeBlockWriter, writeFlags = WriteFlags.Default) {
    const writerFactory = MainFactory.createWriteFactory(writer);
    if (definition instanceof definitions.ClassDefinition)
        writerFactory.getClassWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.InterfaceDefinition)
        writerFactory.getInterfaceWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.FunctionDefinition)
        writerFactory.getFunctionWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.FileDefinition)
        writerFactory.getFileWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.NamespaceDefinition)
        writerFactory.getNamespaceWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.EnumDefinition)
        writerFactory.getEnumWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.TypeAliasDefinition)
        writerFactory.getTypeAliasWriter().write(definition, writeFlags);
    else if (definition instanceof definitions.VariableDefinition)
        writerFactory.getVariableWriter().write(definition, writeFlags);
    else
        Logger.warn(`Not implemented writer for definition: ${(definition as definitions.NamedDefinition).name}`);
}
