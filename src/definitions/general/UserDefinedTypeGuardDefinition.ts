import {BaseDefinition} from "./../base/BaseDefinition";
import {DefinitionType} from "./../base/DefinitionType";
import {TypeDefinition} from "./../expression/TypeDefinition";

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.UserDefinedTypeGuard);
    }

    parameterName: string;
    type: TypeDefinition;
}
