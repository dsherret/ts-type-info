import {ClassDefinition, Scope, ScopedDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {ExtendsImplementsClauseWriter} from "./extends-implements-clause-writer";
import {TypeParametersWriter} from "./type-parameters-writer";
import {PropertyWriter} from "./property-writer";
import {MethodWriter} from "./method-writer";
import {WriteFlags} from "./../write-flags";

export class ClassWriter extends BaseDefinitionWriter<ClassDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private propertyWriter = new PropertyWriter(this.writer, this.flags);
    private methodWriter = new MethodWriter(this.writer, this.flags);

    protected writeDefault(def: ClassDefinition) {
        this.writeHeader(def);
        this.writer.block(() => {
            this.writeProperties(def);
            this.writer.newLine();
            this.writeMethods(def);
        });
    }

    private writeHeader(def: ClassDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writer.write("class ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer, this.flags);
        extendsImplementsWriter.writeExtends(def).writeImplements(def);
    }

    private writeProperties(def: ClassDefinition) {
        def.properties.forEach(p => {
            if (this.shouldInclude(p)) {
                this.propertyWriter.write(p);
            }
        });
    }

    private writeMethods(def: ClassDefinition) {
        def.methods.forEach(m => {
            if (this.shouldInclude(m)) {
                this.methodWriter.write(m);
            }
        });
    }

    private shouldInclude(def: ScopedDefinition) {
        if (def.scope === Scope.private && (this.flags & WriteFlags.HidePrivateMembers)) {
            return false;
        }
        else if (def.scope === Scope.protected && (this.flags & WriteFlags.HideProtectedMembers)) {
            return false;
        }
        else {
            return true;
        }
    }
}
