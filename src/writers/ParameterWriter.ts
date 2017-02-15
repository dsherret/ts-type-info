import CodeBlockWriter from "code-block-writer";
import {ParameterDefinitions, ClassConstructorParameterDefinition, BaseClassMethodParameterDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseDefinitionWriter} from "./BaseDefinitionWriter";
import {DecoratorsWriter} from "./DecoratorsWriter";
import {TypeWithDefaultExpressionWriter} from "./TypeWithDefaultExpressionWriter";
import {ClassConstructorParameterScopeWriter} from "./ClassConstructorParameterScopeWriter";

export class ParameterWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly baseWriter: BaseDefinitionWriter,
        private readonly decoratorsWriter: DecoratorsWriter,
        private readonly typeWithDefaultExpressionWriter: TypeWithDefaultExpressionWriter,
        private readonly classConstructorParameterScopeWriter: ClassConstructorParameterScopeWriter
    ) {
    }

    write(param: ParameterDefinitions, flags: WriteFlags) {
        this.baseWriter.writeWrap(param, () => {
            if (!param.isRestParameter)
                this.writeDecorators(param, flags);

            if (param instanceof ClassConstructorParameterDefinition) {
                if ((flags & WriteFlags.HideScopeOnParameters) === 0)
                    this.classConstructorParameterScopeWriter.writeScope(param.scope);

                this.writer.conditionalWrite(param.isReadonly, "readonly ");
            }

            if (param.isRestParameter)
                this.writeRestParameter(param);
            this.writer.write(param.name!);
            this.writeIsOptional(param, flags);
            this.typeWithDefaultExpressionWriter.write(param, flags, this.getFallbackTypeText(param));
        });
    }

    private writeRestParameter(param: ParameterDefinitions) {
        this.writer.write("...");
    }

    private getFallbackTypeText(param: ParameterDefinitions) {
        return param.isRestParameter ? "any[]" : "any";
    }

    private writeIsOptional(param: ParameterDefinitions, flags: WriteFlags) {
        const isOptionalNotRest = param.isOptional && !param.isRestParameter;
        const willWriteDefaultExpression = param.defaultExpression != null && (flags & WriteFlags.HideExpressions) !== WriteFlags.HideExpressions;

        if (isOptionalNotRest && !willWriteDefaultExpression)
            this.writer.write("?");
    }

    private writeDecorators(param: ParameterDefinitions, flags: WriteFlags) {
        if (!(param instanceof BaseClassMethodParameterDefinition) && !(param instanceof ClassConstructorParameterDefinition))
            return;

        this.decoratorsWriter.write(param, flags, " ");
    }
}
