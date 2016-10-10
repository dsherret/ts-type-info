import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypePropertyBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsBasePropertyBinderByNode} from "../base/TsBasePropertyBinderByNode";

export class TsTypePropertyBinderByNode extends TypePropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsBasePropertyBinderByNode(factory, node)
        );
    }
}
