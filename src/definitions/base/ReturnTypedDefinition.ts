import {StructureFactory} from "./../../factories";
import {TypeNodeDefinition} from "./../expression";

export abstract class ReturnTypedDefinition {
    returnType: TypeNodeDefinition;

    setReturnType(text: string) {
        this.returnType = new StructureFactory().getTypeFromText(text);
        return this;
    }
}
