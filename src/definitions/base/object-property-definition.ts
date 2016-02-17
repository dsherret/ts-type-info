import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {ObjectPropertyStructure, DefaultExpressionedStructure} from "./../../structures";
import {Expression} from "./../../expressions";
import {DefinitionType} from "./definition-type";
import {DefaultExpressionedDefinition, IDefaultExpressionedDefinition} from "./default-expressioned-definition";
import {BasePropertyDefinition} from "./base-property-definition";

export abstract class ObjectPropertyDefinition<ParentType> extends BasePropertyDefinition<ParentType> implements IDefaultExpressionedDefinition {
    constructor(symbolNode: WrappedSymbolNode | ObjectPropertyStructure, parent: ParentType, definitionType: DefinitionType) {
        super(symbolNode, parent, definitionType);

        this.fillDefaultExpression(symbolNode);
    }

    // DefaultExpressionedDefinition
    defaultExpression: Expression;
    fillDefaultExpression: (symbolNodeOrStructure: WrappedSymbolNode | DefaultExpressionedStructure) => void;
}

applyMixins(ObjectPropertyDefinition, [DefaultExpressionedDefinition]);
