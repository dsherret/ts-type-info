import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {TypeAliasBinder} from "./../../base";
import {TsNamedBinder} from "./../base/TsNamedBinder";
import {TsExportableBinder} from "./../base/TsExportableBinder";
import {TsTypeExpressionedBinder} from "./../base/TsTypeExpressionedBinder";
import {TsTypeParameteredBinderByNode} from "./../base/TsTypeParameteredBinderByNode";
import {TsAmbientableBinder} from "./../base/TsAmbientableBinder";

export class TsTypeAliasBinder extends TypeAliasBinder {
    constructor(private factory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsTypeExpressionedBinder(factory, node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAmbientableBinder(node)
        );
    }
}
