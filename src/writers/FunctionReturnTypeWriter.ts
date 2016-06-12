import {InterfaceMethodDefinition, FunctionBodyWriteableDefinitions, FunctionDefinition, ClassMethodDefinition, ClassStaticMethodDefinition, ClassConstructorDefinition} from "./../definitions";
import {WriteFlags} from "./../WriteFlags";
import {BaseWriter} from "./BaseWriter";
import {FunctionBodyWriter} from "./FunctionBodyWriter";
import {TypeWriter} from "./TypeWriter";

type SupportedTypes = FunctionDefinition | ClassMethodDefinition | ClassStaticMethodDefinition | InterfaceMethodDefinition;

export class FunctionReturnTypeWriter extends BaseWriter {
    private typeWriter = new TypeWriter(this.writer);

    write(def: SupportedTypes, flags: WriteFlags) {
        if (def.userDefinedTypeGuard != null) {
            this.writer.write(`: ${def.userDefinedTypeGuard.parameterName || "this"} is ${def.userDefinedTypeGuard.type.text}`);
        }
        else if (!FunctionBodyWriter.willWriteFunctionBody(def, flags) || def.overloadSignatures.length > 0) {
            this.typeWriter.writeWithColon(def.returnType);
        }
    }
}
