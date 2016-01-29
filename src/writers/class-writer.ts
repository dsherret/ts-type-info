import {ClassDefinition} from "./../definitions";
import {BaseWriter} from "./base-writer";
import {ExtendsImplementsClauseWriter} from "./extends-implements-clause-writer";
import {TypeParameterWriter} from "./type-parameter-writer";
import {PropertyWriter} from "./property-writer";
import {MethodWriter} from "./method-writer";
import {WriteFlags} from "./../write-flags";
import {Scope} from "./../definitions";

export class ClassWriter extends BaseWriter {
    private typeParameterWriter = new TypeParameterWriter(this.writer);
    private propertyWriter = new PropertyWriter(this.writer);
    private methodWriter = new MethodWriter(this.writer);

    write(def: ClassDefinition, flags: WriteFlags) {
        this.writeHeader(def);
        this.writer.block(() => {
            this.writeProperties(def, flags);
            this.writer.newLine();
            this.writeMethods(def, flags);
        });
    }

    private writeHeader(def: ClassDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("class ").write(def.name);
        this.typeParameterWriter.write(def.typeParameters);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer);
        extendsImplementsWriter.writeExtends(def).writeImplements(def);
    }

    private writeProperties(def: ClassDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            if (flags & WriteFlags.PrivateMembers || p.scope !== Scope.private) {
                this.propertyWriter.write(p, flags);
            }
        });
    }

    private writeMethods(def: ClassDefinition, flags: WriteFlags) {
        def.methods.forEach(m => {
            if (flags & WriteFlags.PrivateMembers || m.scope !== Scope.private) {
                this.methodWriter.write(m, flags);
            }
        });
    }
}
