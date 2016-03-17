import {MainFactory} from "./../../../factories";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler"
import {ClassMethodBinder} from "./../../base";
import {TsAbstractableBinder} from "./../base";
import {TsClassMethodParameterBinder} from "./TsClassMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassMethodBinder extends ClassMethodBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(
            new TsBaseClassMethodBinder(
                mainFactory,
                node,
                ClassMethodParameterDefinition,
                TsClassMethodParameterBinder
            ),
            new TsAbstractableBinder(node)
        );
    }
}
