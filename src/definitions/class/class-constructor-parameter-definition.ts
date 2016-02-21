import {applyMixins, ArrayExt} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {DecoratorDefinition} from "./../general";
import {IDecoratableDefinition, DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../base";
import {ClassConstructorDefinition} from "./class-constructor-definition";
import {ClassConstructorParameterScope} from "./class-constructor-parameter-scope";

export class ClassConstructorParameterDefinition extends BaseParameterDefinition<ClassConstructorDefinition> implements IDecoratableDefinition {
    scope: ClassConstructorParameterScope;

    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ClassConstructorDefinition) {
        super(definitionFactory, symbolNode, parent, DefinitionType.ClassConstructorParameter);
        this.fillDecorators(symbolNode);
        this.scope = symbolNode.getClassConstructorParameterScope();
    }

    // DecoratableDefinition
    fillDecorators: (symbolNode: ISymbolNode) => void;
    decorators: ArrayExt<DecoratorDefinition<this>>;
}

applyMixins(ClassConstructorParameterDefinition, [DecoratableDefinition]);
