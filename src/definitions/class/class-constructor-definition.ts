import CodeBlockWriter from "code-block-writer";
import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {applyMixins, ArrayExt} from "./../../utils";
import {WrappedSignature, WrappedSymbolNode} from "./../../wrappers";
import {ClassConstructorParameterStructure} from "./../../structures";
import {ClassConstructorParameterDefinition} from "./class-constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition, ClassConstructorParameterStructure> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(symbolNode: WrappedSymbolNode, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(symbolNode, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
    fillParametersBySymbol: (
        symbolNodeOrStructure: WrappedSymbolNode | ClassConstructorParameterStructure,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        signatureOrStructure: WrappedSignature | ClassConstructorParameterStructure,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
