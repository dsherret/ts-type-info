import CodeBlockWriter from "code-block-writer";
import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISignature, ISymbolNode} from "./../../wrappers";
import {ClassConstructorParameterDefinition} from "./class-constructor-parameter-definition";
import {ClassDefinition} from "./class-definition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(mainFactory: MainFactory, symbolNode: ISymbolNode, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(mainFactory, symbolNode, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        symbolNode: ISymbolNode,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
