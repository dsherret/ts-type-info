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
    private namespaceWriter = new NamespaceWriter(this.writer, this);
    private interfaceWriter = new InterfaceWriter(this.writer);
    private classWriter = new ClassWriter(this.writer);
    private enumWriter = new EnumWriter(this.writer);
    private functionWriter = new FunctionWriter(this.writer);
    private variableWriter = new VariableWriter(this.writer);
    private typeAliasWriter = new TypeAliasWriter(this.writer);

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
        def.typeAliases.forEach(t => this.typeAliasWriter.write(t, flags));
        this.writer.newLine();
        def.namespaces.forEach(n => this.addBlankLines(() => this.namespaceWriter.write(n, flags)));
        def.interfaces.forEach(i => this.addBlankLines(() => this.interfaceWriter.write(i, flags)));
        def.classes.forEach(c => this.addBlankLines(() => this.classWriter.write(c, flags)));
        def.enums.forEach(e => this.addBlankLines(() => this.enumWriter.write(e, flags)));
        def.functions.forEach(f => this.addBlankLines(() => this.functionWriter.write(f, flags)));
        def.variables.forEach(v => this.variableWriter.write(v, flags));
    }

    private addBlankLines(func: () => void) {
        func();
        this.writer.newLine();
    }
}
