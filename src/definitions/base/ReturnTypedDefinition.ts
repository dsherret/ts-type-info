import {StructureFactory} from "./../../factories";
import {TypeDefinition} from "./../expression";

export abstract class ReturnTypedDefinition {
    returnType: TypeDefinition;

    setReturnType(text: string) {
        this.returnType = new StructureFactory().getTypeFromText(text);
        return this as any;
    }
}
