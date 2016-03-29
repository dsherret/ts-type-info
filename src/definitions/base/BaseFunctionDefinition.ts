import {TypeExpressionDefinition} from "./../expressions";
import {TypeParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {TypeParameterDefinition} from "./../general";
import {NamedDefinition} from "./NamedDefinition";
import {ParentedDefinition} from "./ParentedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";
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
    parameters: ParameterType[];
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
