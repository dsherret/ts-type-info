import {TypeExpressionDefinition} from "./../expressions";
import {TypeParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {TypeParameterDefinition} from "./../general";
import {BaseParameterDefinition} from "./BaseParameterDefinition";
import {NamedDefinition} from "./NamedDefinition";
import {TypeParameteredDefinition} from "./TypeParameteredDefinition";
import {BaseDefinition} from "./BaseDefinition";
import {DefinitionType} from "./DefinitionType";
import {ParameteredDefinition} from "./ParameteredDefinition";
import {ReturnTypedDefinition} from "./ReturnTypedDefinition";

export abstract class BaseFunctionDefinition<ParameterType extends BaseParameterDefinition, ParameterStructureType>
        extends BaseDefinition
        implements NamedDefinition, TypeParameteredDefinition, ParameteredDefinition<ParameterType, ParameterStructureType>, ReturnTypedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // NamedDefinition
    name: string;
    // ParameteredDefinition
    parameters: ParameterType[];
    abstract addParameters(...parameters: ParameterStructureType[]): this;
    getParameter: (nameOrSearchFunction: string | ((parameter: ParameterType) => boolean)) => ParameterType;
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
}

applyMixins(BaseFunctionDefinition, BaseDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
