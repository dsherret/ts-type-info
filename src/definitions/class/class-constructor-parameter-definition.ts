import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassConstructorParameterScope} from "./class-constructor-parameter-scope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassConstructorDefinition) {
        super(mainFactory, symbolNode, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(symbolNode);
        this.scope = symbolNode.getClassConstructorParameterScope();
    }

    // DecoratableDefinition
    fillDecorators: (symbolNode: ISymbolNode) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
