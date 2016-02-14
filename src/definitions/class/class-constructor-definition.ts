import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {ClassConstructorParameterDefinition} from "./class-constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassConstructorDefinition extends BaseDefinition implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(symbolNode, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
    fillParametersBySymbol: (
        symbolNode: WrappedSymbolNode,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        signature: WrappedSignature,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
