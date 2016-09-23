import {BaseDefinition} from "./../base/BaseDefinition";
import {DefinitionType} from "./../base/DefinitionType";
import {TypeNodeDefinition} from "./../expression/TypeNodeDefinition";

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.UserDefinedTypeGuard);
    }

    parameterName: string;
    type: TypeNodeDefinition;
}
