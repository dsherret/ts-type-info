import CodeBlockWriter from "code-block-writer";
import * as definitions from "./../definitions";
import {DefinitionUtils} from "./../utils";
import {WriteFlags} from "./../WriteFlags";
import {NamespaceWriter} from "./NamespaceWriter";
import {EnumWriter} from "./EnumWriter";
import {InterfaceWriter} from "./InterfaceWriter";
import {ClassWriter} from "./ClassWriter";
import {FunctionWriter} from "./FunctionWriter";
import {VariableWriter} from "./VariableWriter";
import {TypeAliasWriter} from "./TypeAliasWriter";

// todo: tests

export class ModuledWriter {
    private namespaceWriter: NamespaceWriter;

    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly interfaceWriter: InterfaceWriter,
        private readonly classWriter: ClassWriter,
        private readonly enumWriter: EnumWriter,
        private readonly functionWriter: FunctionWriter,
        private readonly variableWriter: VariableWriter,
        private readonly typeAliasWriter: TypeAliasWriter
    ) {
    }

    initialize(namespaceWriter: NamespaceWriter) {
        // this was the only way I could think of to handle the circular dependency caused by the
        // circular nature of the problem... maybe there's a better way
        this.namespaceWriter = namespaceWriter;
    }

    write(def: definitions.ModuledDefinitions, flags: WriteFlags) {
        if (def instanceof definitions.FileDefinition && DefinitionUtils.isDefinitionFile(def) || def instanceof definitions.NamespaceDefinition && def.isAmbient) {
            flags = flags | WriteFlags.IsInAmbientContext;
        }
        else {
            flags = flags & ~WriteFlags.IsInAmbientContext;
        }

        this.writeChildren(def, flags);
    }

    private writeChildren(def: definitions.ModuledDefinitions, flags: WriteFlags) {
        // order these by what should be written if order is null
        const allDefinitions = [...def.typeAliases, ...def.interfaces, ...def.enums, ...def.classes, ...def.namespaces, ...def.variables, ...def.functions];

        allDefinitions.sort((a, b) => {
            if (b.order == null) {
                return -1;
            }
            else if (a.order == null) {
                return 1;
            }
            else {
                return a.order - b.order;
            }
        });

        allDefinitions.forEach((d, i) => {
            if (i > 0 && !(d instanceof definitions.TypeAliasDefinition) && !(d instanceof definitions.VariableDefinition)) {
                this.writer.newLine();
            }

            if (d instanceof definitions.ClassDefinition) {
                this.classWriter.write(d, flags);
            }
            else if (d instanceof definitions.InterfaceDefinition) {
                this.interfaceWriter.write(d, flags);
            }
            else if (d instanceof definitions.FunctionDefinition) {
                this.functionWriter.write(d, flags);
                this.writer.newLineIfLastNotNewLine();
            }
            else if (d instanceof definitions.NamespaceDefinition) {
                this.namespaceWriter.write(d, flags);
            }
            else if (d instanceof definitions.VariableDefinition) {
                if (i > 0 && !(allDefinitions[i - 1] instanceof definitions.VariableDefinition)) {
                    this.writer.newLine();
                }

                this.variableWriter.write(d, flags);
                this.writer.newLine();
            }
            else if (d instanceof definitions.EnumDefinition) {
                this.enumWriter.write(d, flags);
                this.writer.newLine();
            }
            else if (d instanceof definitions.TypeAliasDefinition) {
                if (i > 0 && !(allDefinitions[i - 1] instanceof definitions.TypeAliasDefinition)) {
                    this.writer.newLine();
                }

                this.typeAliasWriter.write(d, flags);
                this.writer.newLine();
            }
        });
    }
}
