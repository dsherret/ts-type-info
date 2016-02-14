import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(symbolNode, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(symbolNode);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: WrappedSymbolNode) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
