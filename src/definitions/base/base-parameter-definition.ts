import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {Expression, TypeExpression} from "./../../expressions";
import {INamedDefinition, NamedDefinition} from "./named-definition";
import {IParentedDefinition} from "./parented-definition";
import {ITypeExpressionedDefinition, TypeExpressionedDefinition} from "./type-expressioned-definition";
import {IDefaultExpressionedDefinition, DefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BaseDefinition} from "./base-definition";
import {DefinitionType} from "./definition-type";

export interface BaseParameterDefinitionConstructor<ParentType, ParameterType> {
    new(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ParentType): ParameterType;
}

export class BaseParameterDefinition<ParentType> extends BaseDefinition
                                                 implements INamedDefinition, IParentedDefinition<ParentType>, ITypeExpressionedDefinition, IDefaultExpressionedDefinition {
    isOptional: boolean;
    isRestParameter: boolean;

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(definitionType);

        this.fillName(symbolNode);
        this.fillTypeExpression(mainFactory, symbolNode);
        this.fillDefaultExpression(symbolNode);

        this.isOptional = symbolNode.isParameterOptional();
        this.isRestParameter = symbolNode.isRestParameter();
        this.parent = parent;
    }

    // NamedDefinition
    name: string;
    fillName: (symbolNode: ISymbolNode) => void;
    // IParentedDefinition
    parent: ParentType;
    // TypeExpressionedDefinition
    typeExpression: TypeExpression;
    fillTypeExpression: (mainFactory: MainFactory, symbolNode: ISymbolNode) => void;
    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNode: ISymbolNode) => void;
}

applyMixins(BaseParameterDefinition, [NamedDefinition, TypeExpressionedDefinition, DefaultExpressionedDefinition]);
