import {ClassDefinition, Scope, ScopedDefinition} from "./../definitions";
import {BaseDefinitionWriter} from "./base-definition-writer";
import {ExtendsImplementsClauseWriter} from "./extends-implements-clause-writer";
import {ClassConstructorWriter} from "./class-constructor-writer";
import {TypeParametersWriter} from "./type-parameters-writer";
import {PropertyWriter} from "./property-writer";
import {MethodWriter} from "./method-writer";
import {FunctionBodyWriter} from "./function-body-writer";
import {WriteFlags} from "./../write-flags";

export class ClassWriter extends BaseDefinitionWriter<ClassDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer, this.flags);
    private propertyWriter = new PropertyWriter(this.writer, this.flags);
    private methodWriter = new MethodWriter(this.writer, this.flags);
    private classConstructorWriter = new ClassConstructorWriter(this.writer, this.flags);

    protected writeDefault(def: ClassDefinition) {
        this.writeHeader(def);
        this.writer.block(() => {
            this.writeConstructor(def);
            this.writeProperties(def);
            this.writer.newLine();
            this.writeMethods(def);
        });
    }

    private writeHeader(def: ClassDefinition) {
        this.writeExportClause(def);
        this.writeDeclareClause(def);
        this.writeAbstract(def);
        this.writer.write("class ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer, this.flags);
        extendsImplementsWriter.writeExtends(def).writeImplements(def);
    }

    private writeAbstract(def: ClassDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }

    private writeConstructor(def: ClassDefinition) {
        if (def.constructorDef != null) {
            this.classConstructorWriter.write(def.constructorDef);
            this.writer.newLine();
        }
    }

    private writeProperties(def: ClassDefinition) {
        def.properties.forEach(p => {
            if (this.shouldInclude(p) && !p.isConstructorParameter) {
                this.propertyWriter.write(p);
            }
        });
    }

    private writeMethods(def: ClassDefinition) {
        let lastHadBlankLine = true;

        def.methods.forEach(m => {
            const thisHasBlankLine = FunctionBodyWriter.willWriteFunctionBody(m, this.flags);

            if (!lastHadBlankLine && thisHasBlankLine) {
                this.writer.newLine();
            }

            if (this.shouldInclude(m)) {
                this.methodWriter.write(m);
            }

            if (thisHasBlankLine) {
                this.writer.newLine();
            }

            lastHadBlankLine = thisHasBlankLine;
        });
    }

    private shouldInclude(def: ScopedDefinition) {
        if (def.scope === Scope.Private && (this.flags & WriteFlags.HidePrivateMembers)) {
            return false;
        }
        else if (def.scope === Scope.Protected && (this.flags & WriteFlags.HideProtectedMembers)) {
            return false;
        }
        else {
            return true;
        }
    }
}
