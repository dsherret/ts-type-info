import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeAliasBinder} from "./../../base";
import {TsBaseDefinitionBinder} from "./../base/TsBaseDefinitionBinder";
import {TsNamedBinder} from "./../base/TsNamedBinder";
import {TsExportableBinder} from "./../base/TsExportableBinder";
import {TsTypedBinder} from "./../base/TsTypedBinder";
import {TsTypeParameteredBinderByNode} from "./../base/TsTypeParameteredBinderByNode";
import {TsAmbientableBinder} from "./../base/TsAmbientableBinder";
import {TsNodedBinder} from "./../base/TsNodedBinder";

export class TsTypeAliasBinder extends TypeAliasBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsTypedBinder(factory, node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAmbientableBinder(node),
            new TsNodedBinder(factory, node)
        );
    }
}
