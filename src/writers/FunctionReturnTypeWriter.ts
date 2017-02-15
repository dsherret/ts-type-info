import CodeBlockWriter from "code-block-writer";
import {InterfaceMethodDefinition, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {TypeWriter} from "./TypeWriter";

type SupportedTypes = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export class FunctionReturnTypeWriter {
    constructor(
        private readonly writer: CodeBlockWriter,
        private readonly functionBodyWriter: FunctionBodyWriter,
        private readonly typeWriter: TypeWriter
    ) {
    }

    write(def: SupportedTypes, flags: WriteFlags) {
        if (def.userDefinedTypeGuard != null)
            this.writer.write(`: ${def.userDefinedTypeGuard.parameterName || "this"} is ${def.userDefinedTypeGuard.type.text}`);
        else if (!this.functionBodyWriter.willWriteFunctionBody(def, flags) || def.overloadSignatures.length > 0)
            this.typeWriter.writeWithColon(def.returnType, "any");
    }
}
