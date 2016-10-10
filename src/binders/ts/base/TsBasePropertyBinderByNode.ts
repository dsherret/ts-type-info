import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BasePropertyBinder} from "./../../base";
import {TsNamedBinderByNode} from "./TsNamedBinderByNode";
import {TsOptionalBinderForPropertyByNode} from "./TsOptionalBinderForPropertyByNode";
import {TsTypedBinderByNode} from "./TsTypedBinderByNode";
import {TsBaseDefinitionBinder} from "./TsBaseDefinitionBinder";
import {TsReadonlyableBinderForPropertyByNode} from "./TsReadonlyableBinderForPropertyByNode";

export class TsBasePropertyBinderByNode extends BasePropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsOptionalBinderForPropertyByNode(node),
            new TsTypedBinderByNode(factory, node),
            new TsReadonlyableBinderForPropertyByNode(node)
        );
    }
}
