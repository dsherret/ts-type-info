import {applyMixins} from "./../../utils";
import {WrappedSymbolNode} from "./../../wrappers";
import {AbstractableStructure, ClassMethodStructure, ClassMethodParameterStructure} from "./../../structures";
import {DefinitionType, IAbstractableDefinition, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./class-method-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition, ClassMethodParameterStructure> implements IAbstractableDefinition {
    constructor(symbolNodeOrStructure: WrappedSymbolNode | ClassMethodStructure, parent: ClassDefinition) {
        super(symbolNodeOrStructure, ClassMethodParameterDefinition, parent, DefinitionType.ClassMethod);
        this.fillAbstractable(symbolNodeOrStructure);
    }

    // AbstractableDefinition
    isAbstract: boolean;
    fillAbstractable: (symbolNodeOrStructure: WrappedSymbolNode | AbstractableStructure) => void;
}

applyMixins(ClassMethodDefinition, [AbstractableDefinition]);
