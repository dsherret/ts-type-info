import CodeBlockWriter from "code-block-writer";
import {PropertyDefinitions, ClassPropertyDefinition, ClassPropertyKind, ClassStaticPropertyDefinition, InterfacePropertyDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {ScopeWriter} from "./ScopeWriter";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DecoratorsWriter} from "./DecoratorsWriter";
import {DocumentationedWriter} from "./DocumentationedWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";
import {TypeWriter} from "./TypeWriter";

export class PropertyWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseDefinitionWriter: BaseDefinitionWriter,
        private readonly documentationedWriter: DocumentationedWriter,
        private readonly decoratorsWriter: DecoratorsWriter,
        private readonly typeWriter: TypeWriter,
        private readonly scopeWriter: ScopeWriter,
        private readonly typeWithDefaultExpressionWriter: TypeWithDefaultExpressionWriter
    ) {
    }

    willWriteAccessorBody(def: PropertyDefinitions): def is ClassPropertyDefinition {
        if (!(def instanceof ClassPropertyDefinition))
            return false;

        const isWriteableGetAccessor = (def.kind & ClassPropertyKind.GetAccessor) !== 0 && def.onWriteGetBody != null;
        const isWriteableSetAccessor = (def.kind & ClassPropertyKind.SetAccessor) !== 0 && def.onWriteSetBody != null;

        return this.isAccessor(def) && (isWriteableGetAccessor || isWriteableSetAccessor);
    }

    private isAbstractAccessor(def: ClassPropertyDefinition): boolean {
        return this.isAccessor(def) && def.isAbstract;
    }

    private isAccessor(def: ClassPropertyDefinition): boolean {
        return (def.kind & ClassPropertyKind.GetSetAccessor) !== 0;
    }

    write(def: PropertyDefinitions, flags: WriteFlags) {
        this.baseDefinitionWriter.writeWrap(def, () => {
            this.writeSingleCommonHeader(def, flags);

            if (def instanceof ClassPropertyDefinition && (this.willWriteAccessorBody(def) || this.isAbstractAccessor(def)))
                this.writeAccessor(def, flags);
            else
                this.writeNormalProperty(def, flags);
        });
    }

    private writeNormalProperty(def: PropertyDefinitions, flags: WriteFlags) {
        this.writeCommonHeader(def, flags);
        this.writer.write(def.name);
        this.writer.conditionalWrite(def.isOptional, "?");

        if (def instanceof InterfacePropertyDefinition)
            this.typeWriter.writeWithColon(def.type, "any");
        else
            this.typeWithDefaultExpressionWriter.writeWithOptionalCheck(def, flags, "any");

        this.writer.write(";");
    }

    private writeAccessor(def: ClassPropertyDefinition, flags: WriteFlags) {
        if (def.kind & ClassPropertyKind.GetAccessor)
            this.writeGetAccessor(def, flags);

        if (def.kind & ClassPropertyKind.SetAccessor) {
            this.writer.conditionalNewLine(def.kind === ClassPropertyKind.GetSetAccessor);
            this.writeSetAccessor(def, flags);
        }
    }

    private writeGetAccessor(def: ClassPropertyDefinition, flags: WriteFlags) {
        this.writeCommonHeader(def, flags);
        this.writer.write("get ");
        this.writer.write(def.name);
        this.writer.write("()");
        this.typeWriter.writeWithColon(def.type, "any");

        if (def.isAbstract)
            this.writer.write(";");
        else {
            this.writer.block(() => {
                if (typeof def.onWriteGetBody === "function")
                    def.onWriteGetBody(this.writer);
            });
        }
    }

    private writeSetAccessor(def: ClassPropertyDefinition, flags: WriteFlags) {
        this.writeCommonHeader(def, flags);
        this.writer.write("set ");
        this.writer.write(def.name);
        this.writer.write("(value"); // default to value for now
        this.typeWriter.writeWithColon(def.type, "any");
        this.writer.write(")");

        if (def.isAbstract)
            this.writer.write(";");
        else {
            this.writer.block(() => {
                if (typeof def.onWriteSetBody === "function")
                    def.onWriteSetBody(this.writer);
            });
        }
    }

    private writeSingleCommonHeader(def: PropertyDefinitions, flags: WriteFlags) {
        this.documentationedWriter.write(def as ClassPropertyDefinition);
        this.decoratorsWriter.write(def as ClassPropertyDefinition, flags);
    }

    private writeCommonHeader(def: PropertyDefinitions, flags: WriteFlags) {
        if (def instanceof ClassPropertyDefinition || def instanceof ClassStaticPropertyDefinition) {
            this.scopeWriter.writeScope(def.scope);
            if (def instanceof ClassPropertyDefinition)
                this.writer.conditionalWrite(def.isAbstract, "abstract ");
            this.writer.conditionalWrite(def instanceof ClassStaticPropertyDefinition, "static ");
        }

        this.writer.conditionalWrite(!this.willWriteAccessorBody(def) && def.isReadonly, "readonly ");
    }
}
