import {TypeExpression} from "./../../expressions";
import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSymbolNode, WrappedSignature} from "./../../wrappers";
import {BaseFunctionStructure, BaseParameterStructure, NamedStructure, ParameteredStructure, ReturnTypedStructure, TypeParameteredStructure} from "./../../structures";
import {TypeParameterDefinition} from "./../general";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeParameteredDefinition, TypeParameteredDefinition} from "./type-parametered-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";
import {BaseParameterDefinitionConstructor} from "./base-parameter-definition";
import {IParameteredDefinition, ParameteredDefinition} from "./parametered-definition";
import {IReturnTypedDefinition, ReturnTypedDefinition} from "./return-typed-definition";

export class BaseFunctionDefinition<ParentType, ParameterType, ParameterStructureType extends BaseParameterStructure>
        extends BaseDefinition
        implements INamedDefinition, IParentedDefinition<ParentType>, ITypeParameteredDefinition,
                   IParameteredDefinition<ParameterType, ParameterStructureType>, IReturnTypedDefinition {
    constructor(
        symbolNodeOrStructure: WrappedSymbolNode | BaseFunctionStructure<ParameterStructureType>,
        parameterDefinition: BaseParameterDefinitionConstructor<BaseFunctionDefinition<ParentType, ParameterType, ParameterStructureType>, ParameterType, ParameterStructureType>,
        definitionType: DefinitionType
    ) {
        super(definitionType);
        this.fillName(symbolNodeOrStructure);
        this.fillParametersBySymbol(symbolNodeOrStructure, parameterDefinition);
        this.fillReturnTypeExpressionBySymbol(symbolNodeOrStructure);
        this.fillTypeParametersBySymbol(symbolNodeOrStructure);
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode | NamedStructure) => void;
    // IParentedDefinition
    parent: ParentType;
    // ParameteredDefinition
    parameters: ArrayExt<ParameterType>;
    fillParametersBySymbol: (
        symbolNode: WrappedSymbolNode | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ) => void;
    fillParametersBySignature: (
        signature: WrappedSignature | ParameteredStructure<ParameterStructureType>,
        paramDefinition: BaseParameterDefinitionConstructor<this, ParameterType, ParameterStructureType>
    ) => void;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
    fillReturnTypeExpressionBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | ReturnTypedStructure) => void;
    fillReturnTypeExpressionBySignature: (signatureOrStructure: WrappedSignature | ReturnTypedStructure) => void;
    // TypeParameteredDefinition
    typeParameters: ArrayExt<TypeParameterDefinition<this>>;
    fillTypeParametersBySymbol: (symbolNodeOrStructure: WrappedSymbolNode | TypeParameteredStructure) => void;
    fillTypeParametersBySignature: (signatureOrStructure: WrappedSignature | TypeParameteredStructure) => void;
}

applyMixins(BaseFunctionDefinition, [NamedDefinition, TypeParameteredDefinition, ParameteredDefinition, ReturnTypedDefinition]);
