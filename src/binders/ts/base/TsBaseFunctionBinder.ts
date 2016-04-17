import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";

export class TsBaseFunctionBinder<ParameterType extends BaseParameterDefinition> extends BaseFunctionBinder<ParameterType> {
    constructor(
        private factory: TsFactory,
        private node: TsNode,
        paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsNamedBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsParameteredBinderByNode(factory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(factory, node)
        );
    }

    protected getOverloadSignatures() {
        const callSignatures = this.node.getTypeAtLocation().getCallSignatures().filter(c => !c.getDeclaration().hasFunctionBody());

        // we need to ignore the implementation signature in these cases
        if (this.node.isMethodSignature() || this.node.isAmbient() || this.node.hasAbstractKeyword()) {
            callSignatures.pop();
        }

        return callSignatures.map(s => this.factory.getCallSignatureFromSignature(s));
    }
}
