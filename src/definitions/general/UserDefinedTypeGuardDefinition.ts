import {BaseDefinition} from "./../base/BaseDefinition";
import {DefinitionType} from "./../base/DefinitionType";
import {TypeExpressionDefinition} from "./../expression/TypeExpressionDefinition";

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    constructor() {
        super(DefinitionType.UserDefinedTypeGuard);
    }

    parameterName: string;
    type: TypeExpressionDefinition;
}
