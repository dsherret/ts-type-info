import {applyMixins} from "./../../utils";
import {IDefinitionFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(definitionFactory: IDefinitionFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(definitionFactory, symbolNode, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(symbolNode);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: ISymbolNode) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
