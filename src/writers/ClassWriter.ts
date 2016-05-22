import * as definitions from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {ExtendsImplementsClauseWriter} from "./ExtendsImplementsClauseWriter";
import {ClassConstructorWriter} from "./ClassConstructorWriter";
import {TypeParametersWriter} from "./TypeParametersWriter";
import {PropertyWriter} from "./PropertyWriter";
import {MethodWriter} from "./MethodWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";

export class ClassWriter extends BaseDefinitionWriter<definitions.ClassDefinition> {
    private typeParametersWriter = new TypeParametersWriter(this.writer);
    private propertyWriter = new PropertyWriter(this.writer);
    private methodWriter = new MethodWriter(this.writer);
    private classConstructorWriter = new ClassConstructorWriter(this.writer);

    protected writeDefault(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.writeHeader(def, flags);
        this.writer.block(() => {
            this.writeStaticProperties(def, flags);
            this.writer.newLine();
            this.writeStaticMethods(def, flags);
            this.writer.newLine();
            this.writeProperties(def, flags);
            this.writer.newLine();
            this.writeConstructor(def.constructorDef, flags);
            this.writer.newLine();
            this.writeMethods(def, flags);
        });
    }

    private writeHeader(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.writeExportKeyword(def, flags);
        this.writeDeclareKeyword(def);
        this.writeAbstract(def);
        this.writer.write("class ").write(def.name);
        this.typeParametersWriter.write(def.typeParameters, flags);

        const extendsImplementsWriter = new ExtendsImplementsClauseWriter(this.writer);
        extendsImplementsWriter.writeExtends(def).writeImplements(def);
    }

    private writeAbstract(def: definitions.ClassDefinition) {
        if (def.isAbstract) {
            this.writer.write("abstract ");
        }
    }

    private writeConstructor(constructorDef: definitions.ClassConstructorDefinition, flags: WriteFlags) {
        if (constructorDef != null && ClassConstructorWriter.shouldWriteConstructor(constructorDef, flags)) {
            const willWriteFunctionBody = FunctionBodyWriter.willWriteFunctionBody(constructorDef, flags);

            if (!willWriteFunctionBody) {
                flags |= WriteFlags.HideScopeOnParameters;
            }

            this.classConstructorWriter.write(constructorDef, flags);
            this.writer.newLine();

            // if the function body won't be written, the scoped constructor parameters need to be written out as properties
            if (!willWriteFunctionBody) {
                (constructorDef.parameters || []).filter(p => p.scope !== definitions.ClassConstructorParameterScope.None).forEach(p => {
                    this.propertyWriter.write(p.toClassProperty(), flags);
                });
            }
        }
    }

    private writeStaticProperties(def: definitions.ClassDefinition, flags: WriteFlags) {
        def.staticProperties.forEach(p => {
            if (this.shouldInclude(p, flags)) {
                this.propertyWriter.write(p, flags);
            }
        });
    }

    private writeProperties(def: definitions.ClassDefinition, flags: WriteFlags) {
        def.properties.forEach(p => {
            if (this.shouldInclude(p, flags) && !p.isConstructorParameter) {
                // todo: improve this by moving writing blank lines into code-block-writer (See #69)
                const willWriteAccessorBody = PropertyWriter.willWriteAccessorBody(p);
                if (willWriteAccessorBody) {
                    this.writer.newLine();
                }

                this.propertyWriter.write(p, flags);

                if (willWriteAccessorBody) {
                    this.writer.newLine();
                }
            }
        });
    }

    private lastHadBlankLine = true;

    private writeStaticMethods(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.lastHadBlankLine = true;

        if (def.isAmbient) {
            flags = flags | WriteFlags.HideFunctionBodies;
        }

        def.staticMethods.forEach(m => this.writeMethod(m, flags));
    }

    private writeMethods(def: definitions.ClassDefinition, flags: WriteFlags) {
        this.lastHadBlankLine = true;

        if (def.isAmbient) {
            flags = flags | WriteFlags.HideFunctionBodies;
        }

        def.methods.forEach(m => this.writeMethod(m, flags));
    }

    private writeMethod(def: definitions.ClassMethodDefinition | definitions.ClassStaticMethodDefinition, flags: WriteFlags) {
        // todo: improve this by moving writing blank lines into code-block-writer (See #69)
        const thisHasBlankLine = FunctionBodyWriter.willWriteFunctionBody(def, flags);

        if (!this.lastHadBlankLine && thisHasBlankLine) {
            this.writer.newLine();
        }

        if (this.shouldInclude(def, flags)) {
            this.methodWriter.write(def, flags);
        }

        if (thisHasBlankLine) {
            this.writer.newLine();
        }

        this.lastHadBlankLine = thisHasBlankLine;
    }

    private shouldInclude(def: definitions.ScopedDefinition, flags: WriteFlags) {
        if (def.scope === definitions.Scope.Private && (flags & WriteFlags.HidePrivateMembers)) {
            return false;
        }
        else if (def.scope === definitions.Scope.Protected && (flags & WriteFlags.HideProtectedMembers)) {
            return false;
        }
        else {
            return true;
        }
    }
}
