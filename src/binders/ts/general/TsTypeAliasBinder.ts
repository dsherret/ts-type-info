import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeAliasBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsNamedBinderByNode} from "../base/TsNamedBinderByNode";
import {TsExportableBinder} from "./../base/TsExportableBinder";
import {TsTypedBinderByNode} from "./../base/TsTypedBinderByNode";
import {TsTypeParameteredBinderByNode} from "./../base/TsTypeParameteredBinderByNode";
import {TsAmbientableBinder} from "./../base/TsAmbientableBinder";
import {TsNodedBinder} from "./../base/TsNodedBinder";
import {TsJsDocedBinder} from "./../base/TsJsDocedBinder";

export class TsTypeAliasBinder extends TypeAliasBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinderByNode(node),
            new TsExportableBinder(node),
            new TsTypedBinderByNode(factory, node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAmbientableBinder(node),
            new TsNodedBinder(factory, node),
            new TsJsDocedBinder(node)
        );
    }
}
