import {ClassDefinition, Scope, ScopedDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ExtendsImplementsClauseWriter} from "./ExtendsImplementsClauseWriter";
import {ClassConstructorWriter} from "./ClassConstructorWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {PropertyWriter} from "./PropertyWriter";
import {MethodWriter} from "./MethodWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class ClassWriter extends BaseDefinitionWriter<ClassDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private propertyWriter = new PropertyWriter(this.writer);
    private methodWriter = new MethodWriter(this.writer);
    private classConstructorWriter = new ClassConstructorWriter(this.writer);

    protected writeDefault(def: ClassDefinition, flags: WriteFlags) {
        this.writeHeader(def, flags);
        this.writer.block(() => {
            this.writeConstructor(def, flags);
            this.writeProperties(def, flags);
            this.writer.newLine();
            this.writeMethods(def, flags);
        });
    }

    private writeHeader(def: ClassDefinition, flags: WriteFlags) {
        this.writeExportClause(def, flags);
        this.writeDeclareClause(def);
        this.writeAbstract(def);
        this.writer.write("class ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer);
        extendsImplementsWriter.writeExtends(def).writeImplements(def);
    }

    private writeAbstract(def: ClassDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }

    private writeConstructor(def: ClassDefinition, flags: WriteFlags) {
        if (def.constructorDef != null) {
            this.classConstructorWriter.write(def.constructorDef, flags);
            this.writer.newLine();
        }
    }

    private writeProperties(def: ClassDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            if (this.shouldInclude(p, flags) && !p.isConstructorParameter) {
                this.propertyWriter.write(p, flags);
            }
        });
    }

    private writeMethods(def: ClassDefinition, flags: WriteFlags) {
        let lastHadBlankLine = true;

        if (def.isAmbient) {
            flags = flags | WriteFlags.HideFunctionBodies;
        }

        def.methods.forEach(m => {
            const thisHasBlankLine = FunctionBodyWriter.willWriteFunctionBody(m, flags);

            if (!lastHadBlankLine && thisHasBlankLine) {
                this.writer.newLine();
            }

            if (this.shouldInclude(m, flags)) {
                this.methodWriter.write(m, flags);
            }

            if (thisHasBlankLine) {
                this.writer.newLine();
            }

            lastHadBlankLine = thisHasBlankLine;
        });
    }

    private shouldInclude(def: ScopedDefinition, flags: WriteFlags) {
        if (def.scope === Scope.Private && (flags & WriteFlags.HidePrivateMembers)) {
            return false;
        }
        else if (def.scope === Scope.Protected && (flags & WriteFlags.HideProtectedMembers)) {
            return false;
        }
        else {
            return true;
        }
    }
}
