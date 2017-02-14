import {BaseDefinition} from "./../base/BaseDefinition";
import {TypeDefinition} from "./../expression/TypeDefinition";

export class UserDefinedTypeGuardDefinition extends BaseDefinition {
    parameterName: string | null;
    type: TypeDefinition;
}
