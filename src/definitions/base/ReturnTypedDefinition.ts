import {MainFactory} from "./../../factories";
import {TypeDefinition} from "./../expression";

export abstract class ReturnTypedDefinition {
    returnType: TypeDefinition;

    setReturnType(text: string) {
        this.returnType = new MainFactory().createStructureFactory().getTypeFromText(text);
        return this;
    }
}
