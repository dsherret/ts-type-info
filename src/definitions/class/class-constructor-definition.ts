import CodeBlockWriter from "code-block-writer";
import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {applyMixins, ArrayExt, MainCache} from "./../../utils";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {ClassConstructorParameterDefinition} from "./class-constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(mainCache: MainCache, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(mainCache, symbolNode, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
    fillParametersBySymbol: (
        mainCache: MainCache,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        mainCache: MainCache,
        signature: ISignature,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
