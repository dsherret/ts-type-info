import {applyMixins, MainCache} from "./../../utils";
import {ISymbolNode} from "./../../wrappers";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainCache, symbolNode, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(symbolNode);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: ISymbolNode) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
