import {ModuledDefinitions} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {NamespaceWriter} from "./namespace-writer";
import {ClassWriter} from "./class-writer";
import {EnumWriter} from "./enum-writer";
import {InterfaceWriter} from "./interface-writer";
import {FunctionWriter} from "./function-writer";
import {TypeAliasWriter} from "./type-alias-writer";

export class ModuledWriter extends BaseDefinitionWriter<ModuledDefinitions> {
    private namespaceWriter = new NamespaceWriter(this.writer, this.flags, this);
    private interfaceWriter = new InterfaceWriter(this.writer, this.flags);
    private classWriter = new ClassWriter(this.writer, this.flags);
    private enumWriter = new EnumWriter(this.writer, this.flags);
    private functionWriter = new FunctionWriter(this.writer, this.flags);
    private typeAliasWriter = new TypeAliasWriter(this.writer, this.flags);

    protected writeDefault(def: ModuledDefinitions) {
        def.typeAliases.forEach(t => this.typeAliasWriter.write(t));
        this.writer.newLine();
        def.namespaces.forEach(n => this.addBlankLines(() => this.namespaceWriter.write(n)));
        def.interfaces.forEach(i => this.addBlankLines(() => this.interfaceWriter.write(i)));
        def.classes.forEach(c => this.addBlankLines(() => this.classWriter.write(c)));
        def.enums.forEach(e => this.addBlankLines(() => this.enumWriter.write(e)));
        def.functions.forEach(f => this.addBlankLines(() => this.functionWriter.write(f)));
    }

    private addBlankLines(func: () => void) {
        func();
        this.writer.newLine();
    }
}
