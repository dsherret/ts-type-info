import {StructureFactory} from "./../../factories";
import {TypeDefinition} from "./../expression";

export abstract class TypedDefinition {
    type: TypeDefinition;

    setType(text: string) {
        this.type = new StructureFactory().getTypeFromText(text);
        return this as any;
    }
}
