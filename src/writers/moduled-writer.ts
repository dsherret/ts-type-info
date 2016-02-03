import {IModuledDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {NamespaceWriter} from "./namespace-writer";
import {ClassWriter} from "./class-writer";
import {EnumWriter} from "./enum-writer";
import {InterfaceWriter} from "./interface-writer";
import {FunctionWriter} from "./function-writer";
import {TypeAliasWriter} from "./type-alias-writer";
import {WriteFlags} from "./../write-flags";

export class ModuledWriter extends BaseWriter {
    private namespaceWriter = new NamespaceWriter(this.writer, this);
    private interfaceWriter = new InterfaceWriter(this.writer);
    private classWriter = new ClassWriter(this.writer);
    private enumWriter = new EnumWriter(this.writer);
    private functionWriter = new FunctionWriter(this.writer);
    private typeAliasWriter = new TypeAliasWriter(this.writer);

    write(def: IModuledDefinition, flags: WriteFlags) {
        def.typeAliases.forEach(t => this.typeAliasWriter.write(t));
        this.writer.newLine();
        def.namespaces.forEach(n => this.addBlankLines(() => this.namespaceWriter.write(n, flags)));
        def.interfaces.forEach(i => this.addBlankLines(() => this.interfaceWriter.write(i, flags)));
        def.classes.forEach(c => this.addBlankLines(() => this.classWriter.write(c, flags)));
        def.enums.forEach(e => this.addBlankLines(() => this.enumWriter.write(e)));
        def.functions.forEach(f => this.addBlankLines(() => this.functionWriter.write(f, flags)));
    }

    private addBlankLines(func: () => void) {
        func();
        this.writer.newLine();
    }
}
