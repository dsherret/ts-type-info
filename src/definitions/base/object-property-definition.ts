import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {Expression} from "./../../expressions";
import {DefinitionType} from "./definition-type";
import {DefaultExpressionedDefinition, IDefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BasePropertyDefinition} from "./base-property-definition";

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ParentType, definitionType: DefinitionType) {
        super(mainFactory, symbolNode, parent, definitionType);

        this.fillDefaultExpression(symbolNode);
    }

    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNode: ISymbolNode) => void;
}

applyMixins(ObjectPropertyDefinition, [DefaultExpressionedDefinition]);
