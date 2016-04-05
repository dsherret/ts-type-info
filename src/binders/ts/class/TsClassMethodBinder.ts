import {TsFactory} from "./../../../factories";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassMethodBinder} from "./../../base";
import {TsAbstractableBinder} from "./../base";
import {TsClassMethodParameterBinder} from "./TsClassMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassMethodBinder extends ClassMethodBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseClassMethodBinder(
                factory,
                node,
                ClassMethodParameterDefinition,
                TsClassMethodParameterBinder
            ),
            new TsAbstractableBinder(node)
        );
    }
}
