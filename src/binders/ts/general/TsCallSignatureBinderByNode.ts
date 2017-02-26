import {TsFactory} from "./../../../factories";
import {CallSignatureParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {CallSignatureBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsTypeParameteredBinderByNode, TsParameteredBinderByNode, TsReturnTypedBinderByNode, TsNodedBinder, TsDocumentationedBinder,
    TsUserDefinedTypeGuardedBinderByNode} from "./../base";
import {TsCallSignatureParameterBinder} from "./TsCallSignatureParameterBinder";

export class TsCallSignatureBinderByNode extends CallSignatureBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsParameteredBinderByNode(factory, node, CallSignatureParameterDefinition, TsCallSignatureParameterBinder),
            new TsReturnTypedBinderByNode(factory, node),
            new TsNodedBinder(factory, node),
            new TsDocumentationedBinder(node),
            new TsUserDefinedTypeGuardedBinderByNode(factory, node)
        );
    }
}
