import {applyMixins, ArrayExt, MainCache} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassConstructorParameterScope} from "./class-constructor-parameter-scope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassConstructorDefinition) {
        super(mainCache, symbolNode, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(symbolNode);
        this.scope = symbolNode.getClassConstructorParameterScope();
    }

    // DecoratableDefinition
    fillDecorators: (symbolNode: ISymbolNode) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
