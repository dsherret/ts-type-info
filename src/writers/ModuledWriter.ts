import {ModuledDefinitions} from "./../definitions";
import {DefinitionUtils} from "./../utils";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";
import {NamespaceWriter} from "./NamespaceWriter";
import {ClassWriter} from "./ClassWriter";
import {EnumWriter} from "./EnumWriter";
import {InterfaceWriter} from "./InterfaceWriter";
import {FunctionWriter} from "./FunctionWriter";
import {VariableWriter} from "./VariableWriter";
import {TypeAliasWriter} from "./TypeAliasWriter";

export class ModuledWriter extends BaseWriter {
    private readonly namespaceWriter = new NamespaceWriter(this.writer, this);
    private readonly interfaceWriter = new InterfaceWriter(this.writer);
    private readonly classWriter = new ClassWriter(this.writer);
    private readonly enumWriter = new EnumWriter(this.writer);
    private readonly functionWriter = new FunctionWriter(this.writer);
    private readonly variableWriter = new VariableWriter(this.writer);
    private readonly typeAliasWriter = new TypeAliasWriter(this.writer);

    write(def: ModuledDefinitions, flags: WriteFlags) {
        if (def.isFileDefinition() && DefinitionUtils.isDefinitionFile(def) || def.isNamespaceDefinition() && def.isAmbient) {
            flags = flags | WriteFlags.IsInAmbientContext;
        }
        else {
            flags = flags & ~WriteFlags.IsInAmbientContext;
        }

        this.writeChildren(def, flags);
    }

    private writeChildren(def: ModuledDefinitions, flags: WriteFlags) {
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
            if (i > 0 && !d.isTypeAliasDefinition() && !d.isVariableDefinition()) {
                this.writer.newLine();
            }

            if (d.isClassDefinition()) {
                this.classWriter.write(d, flags);
            }
            else if (d.isInterfaceDefinition()) {
                this.interfaceWriter.write(d, flags);
            }
            else if (d.isFunctionDefinition()) {
                this.functionWriter.write(d, flags);
            }
            else if (d.isNamespaceDefinition()) {
                this.namespaceWriter.write(d, flags);
            }
            else if (d.isVariableDefinition()) {
                if (i > 0 && !allDefinitions[i - 1].isVariableDefinition()) {
                    this.writer.newLine();
                }

                this.variableWriter.write(d, flags);
            }
            else if (d.isEnumDefinition()) {
                this.enumWriter.write(d, flags);
            }
            else if (d.isTypeAliasDefinition()) {
                if (i > 0 && !allDefinitions[i - 1].isTypeAliasDefinition()) {
                    this.writer.newLine();
                }

                this.typeAliasWriter.write(d, flags);
            }
        });
    }
}
