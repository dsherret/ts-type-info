import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {TypeParameterDefinition} from "./../general";
import {NamedDefinition} from "./NamedDefinition";
import {ParentedDefinition} from "./ParentedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";
import {BaseParameterDefinitionConstructor} from "./BaseParameterDefinition";
import {ParameteredDefinition} from "./ParameteredDefinition";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";

export class BaseFunctionDefinition<ParentType, ParameterType>
        extends BaseDefinition
        implements NamedDefinition, ParentedDefinition<ParentType>, TypeParameteredDefinition, ParameteredDefinition<ParameterType>, ReturnTypedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
