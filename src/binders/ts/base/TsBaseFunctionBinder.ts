import {BaseParameterDefinition, BaseParameterDefinitionConstructor, UserDefinedTypeGuardDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
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
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsParameteredBinderByNode(factory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(factory, node)
        );
    }

    protected getIsGenerator() {
        return this.node.isGeneratorFunction();
    }

    protected getOverloadSignatures() {
        const callSignatures = this.node.getType().getCallSignatures().filter(c => !c.getDeclaration().hasFunctionBody());

        // we need to ignore the implementation signature in these cases
        if (this.node.isMethodSignature() || this.node.isAmbient() || this.node.hasAbstractKeyword()) {
            callSignatures.pop();
        }

        return callSignatures.map(s => this.factory.getCallSignatureFromSignature(s));
    }

    protected getUserDefinedTypeGuard() {
        let userDefinedTypeGuard: UserDefinedTypeGuardDefinition | null = null;

        for (let node of this.node.getChildren()) {
            if (node.isUserDefinedTypeGuard()) {
                userDefinedTypeGuard = this.factory.getUserDefinedTypeGuardFromNode(node);
                break;
            }
        }

        return userDefinedTypeGuard;
    }
}
