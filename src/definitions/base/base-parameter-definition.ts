import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {BaseParameterStructure, NamedStructure, TypeExpressionedStructure, DefaultExpressionedStructure} from "./../../structures";
import {Expression, TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {IDefaultExpressionedDefinition, DefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType, ParameterStructureType extends BaseParameterStructure> {
    new(symbolNodeOrStructure: WrappedSymbolNode | ParameterStructureType, parent: ParentType): ParameterType;
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition
                                                 implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(symbolNodeOrStructure: WrappedSymbolNode | BaseParameterStructure, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);
        this.fillName(symbolNodeOrStructure);
        this.fillTypeExpression(symbolNodeOrStructure);
        this.fillDefaultExpression(symbolNodeOrStructure);

        if (symbolNodeOrStructure instanceof WrappedSymbolNode) {
            this.isOptional = symbolNodeOrStructure.getParameterIsOptional();
            this.isRestParameter = symbolNodeOrStructure.getParameterIsRestParameter();
        }
        else {
            this.isOptional = symbolNodeOrStructure.isOptional;
            this.isRestParameter = symbolNodeOrStructure.isRestParameter;
        }

        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: WrappedSymbolNode | NamedStructure) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (symbolNodeOrStructure: WrappedSymbolNode | TypeExpressionedStructure) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNodeOrStructure: WrappedSymbolNode | DefaultExpressionedStructure) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
