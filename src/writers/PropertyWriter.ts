import {PropertyDefinitions, ClassPropertyDefinition, ClassPropertyKind} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";

export class PropertyWriter extends BaseDefinitionWriter<PropertyDefinitions> {
    private readonly typeWriter = new TypeWriter(this.writer);
    private readonly scopeWriter = new ScopeWriter(this.writer);
    private readonly typeWithDefaultExpressionWriter = new TypeWithDefaultExpressionWriter(this.writer);

    static willWriteAccessorBody(def: PropertyDefinitions): def is ClassPropertyDefinition {
        return PropertyWriter.isAccessor(def) && (def.onWriteGetBody != null || def.onWriteSetBody != null);
    }

    private static isAbstractAccessor(def: PropertyDefinitions): def is ClassPropertyDefinition {
        return PropertyWriter.isAccessor(def) && def.isAbstract;
    }

    private static isAccessor(def: PropertyDefinitions): def is ClassPropertyDefinition {
        return def.isClassPropertyDefinition() && def.kind !== ClassPropertyKind.Normal;
    }

    protected writeDefault(def: PropertyDefinitions, flags: WriteFlags) {
        if (PropertyWriter.willWriteAccessorBody(def) || PropertyWriter.isAbstractAccessor(def)) {
            this.writeAccessor(def);
        }
        else {
            this.writeNormalProperty(def, flags);
        }
    }

    private writeAccessor(def: ClassPropertyDefinition) {
        if (def.kind & ClassPropertyKind.GetAccessor) {
            this.writeGetAccessor(def);
        }

        if (def.kind & ClassPropertyKind.SetAccessor) {
            this.writer.conditionalNewLine(!def.isAbstract && def.kind === ClassPropertyKind.GetSetAccessor);
            this.writeSetAccessor(def);
        }
    }

    private writeGetAccessor(def: ClassPropertyDefinition) {
        this.writeCommonHeader(def);
        this.writer.write("get ");
        this.writer.write(def.name);
        this.writer.write("()");
        this.typeWriter.writeWithColon(def.type);

        if (def.isAbstract) {
            this.writer.write(";").newLine();
        }
        else {
            this.writer.block(() => {
                if (typeof def.onWriteGetBody === "function") {
                    def.onWriteGetBody(this.writer);
                }
            });
        }
    }

    private writeSetAccessor(def: ClassPropertyDefinition) {
        this.writeCommonHeader(def);
        this.writer.write("set ");
        this.writer.write(def.name);
        this.writer.write("(value"); // default to value for now
        this.typeWriter.writeWithColon(def.type);
        this.writer.write(")");

        if (def.isAbstract) {
            this.writer.write(";").newLine();
        }
        else {
            this.writer.block(() => {
                if (typeof def.onWriteSetBody === "function") {
                    def.onWriteSetBody(this.writer);
                }
            });
        }
    }

    private writeNormalProperty(def: PropertyDefinitions, flags: WriteFlags) {
        this.writeCommonHeader(def);
        this.writer.write(def.name);
        this.writer.conditionalWrite(def.isOptional, "?");

        if (def.isInterfacePropertyDefinition()) {
            this.typeWriter.writeWithColon(def.type);
        }
        else {
            this.typeWithDefaultExpressionWriter.writeWithOptionalCheck(def, flags);
        }

        this.writer.write(";").newLine();
    }

    private writeCommonHeader(def: PropertyDefinitions) {
        this.scopeWriter.write((def as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writer.conditionalWrite((def as ClassPropertyDefinition).isAbstract, "abstract ");
        this.writer.conditionalWrite(def.isClassStaticPropertyDefinition(), "static ");
    }
}
