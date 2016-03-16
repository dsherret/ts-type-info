import {TypeParameterDefinition} from "./../../../definitions";
import {TypeExpression} from "./../../../expressions";
import {TsNode} from "./../../../wrappers";
import {MainFactory} from "./../../../factories";
import {TypeAliasBinder} from "./../../base";
import {TsNamedBinder} from "./../base/TsNamedBinder";
import {TsExportableBinder} from "./../base/TsExportableBinder";
import {TsTypeExpressionedBinder} from "./../base/TsTypeExpressionedBinder";
import {TsTypeParameteredBinderByNode} from "./../base/TsTypeParameteredBinderByNode";
import {TsAmbientableBinder} from "./../base/TsAmbientableBinder";

export class TsTypeAliasBinder extends TypeAliasBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsTypeExpressionedBinder(mainFactory, node),
            new TsTypeParameteredBinderByNode(mainFactory, node),
            new TsAmbientableBinder(node)
        );
    }
}
