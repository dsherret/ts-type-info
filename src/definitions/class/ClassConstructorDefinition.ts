import CodeBlockWriter from "code-block-writer";
import {IParentedDefinition, BaseDefinition, DefinitionType, IParameteredDefinition, ParameteredDefinition} from "./../base";
import {applyMixins, ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {ISignature, INode} from "./../../wrappers";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {ClassDefinition} from "./ClassDefinition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements IParentedDefinition<ClassDefinition>, IParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor(mainFactory: MainFactory, node: INode, parent: ClassDefinition) {
        super(DefinitionType.ClassConstructor);
        this.fillParametersBySymbol(mainFactory, node, ClassConstructorParameterDefinition);
        this.parent = parent;
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<ClassConstructorParameterDefinition>;
    fillParametersBySymbol: (
        mainFactory: MainFactory,
        node: INode,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
    fillParametersBySignature: (
        mainFactory: MainFactory,
        signature: ISignature,
        parameterDefinition: typeof ClassConstructorParameterDefinition) => void;
}

applyMixins(ClassConstructorDefinition, [ParameteredDefinition]);
