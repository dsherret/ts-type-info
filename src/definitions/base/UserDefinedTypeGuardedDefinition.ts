import {UserDefinedTypeGuardStructure} from "./../../structures";
import {MainFactory} from "./../../factories";
import {UserDefinedTypeGuardDefinition} from "./../general";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";

export abstract class UserDefinedTypeGuardedDefinition {
    userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null;

    setUserDefinedTypeGuard(structure: UserDefinedTypeGuardStructure) {
        this.userDefinedTypeGuard = new MainFactory().createStructureFactory().getUserDefinedTypeGuard(structure);

        const returnTypedDefinition = this as any as ReturnTypedDefinition;
        if (returnTypedDefinition.returnType != null) {
            returnTypedDefinition.returnType = new MainFactory().createStructureFactory().getTypeFromText("any");
            returnTypedDefinition.returnType._text = (this.userDefinedTypeGuard!.parameterName || "this") + " is " + this.userDefinedTypeGuard!.type.text;
        }

        return this;
    }
}
