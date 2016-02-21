import {applyMixins} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISymbolNode} from "./../../wrappers";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements IAbstractableDefinition {
    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(mainFactory, symbolNode, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(symbolNode);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNode: ISymbolNode) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
