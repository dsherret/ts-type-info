import {PropertyDefinitions, ClassPropertyDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {TypeWriter} from "./TypeWriter";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";

export class PropertyWriter extends BaseDefinitionWriter<PropertyDefinitions> {
    private typeWriter = new TypeWriter(this.writer);
    private scopeWriter = new ScopeWriter(this.writer);
    private typeWithDefaultExpressionWriter = new TypeWithDefaultExpressionWriter(this.writer);

    static willWriteAccessorBody(def: PropertyDefinitions) {
        return def.isClassPropertyDefinition() && def.isAccessor && (def.onWriteGetBody != null || def.onWriteSetBody != null);
    }

    protected writeDefault(def: PropertyDefinitions, flags: WriteFlags) {
        if (PropertyWriter.willWriteAccessorBody(def)) {
            this.writeAccessor(def as ClassPropertyDefinition);
        }
        else {
            this.writeNormalProperty(def, flags);
        }
    }

    private writeAccessor(def: ClassPropertyDefinition) {
        this.writeGetAccessor(def);

        if (!def.isReadonly) {
            this.writer.newLine();
            this.writeSetAccessor(def);
        }
    }

    private writeGetAccessor(def: ClassPropertyDefinition) {
        this.writer.write("get ");
        this.writeHeader(def);
        this.writer.write("()");
        this.typeWriter.writeWithColon(def.type);

        this.writer.block(() => {
            if (typeof def.onWriteGetBody === "function") {
                def.onWriteGetBody(this.writer);
            }
        });
    }

    private writeSetAccessor(def: ClassPropertyDefinition) {
        this.writer.write("set ");
        this.writeHeader(def);
        this.writer.write("(value"); // default to value for now
        this.typeWriter.writeWithColon(def.type);
        this.writer.write(")");

        this.writer.block(() => {
            if (typeof def.onWriteSetBody === "function") {
                def.onWriteSetBody(this.writer);
            }
        });
    }

    private writeNormalProperty(def: PropertyDefinitions, flags: WriteFlags) {
        this.writeHeader(def);
        this.writeOptionalFlag(def);

        if (def.isInterfacePropertyDefinition()) {
            this.typeWriter.writeWithColon(def.type);
        }
        else {
            this.typeWithDefaultExpressionWriter.writeWithOptionalCheck(def, flags);
        }

        this.writer.write(";").newLine();
    }

    private writeHeader(def: PropertyDefinitions) {
        this.scopeWriter.write((def as ClassPropertyDefinition).scope);
        this.writer.spaceIfLastNotSpace();
        this.writeStatic(def);
        this.writer.write(def.name);
    }

    private writeStatic(def: PropertyDefinitions) {
        if (def.isClassStaticPropertyDefinition()) {
            this.writer.write("static ");
        }
    }

    private writeOptionalFlag(property: PropertyDefinitions) {
        if (property.isOptional) {
            this.writer.write("?");
        }
    }
}
