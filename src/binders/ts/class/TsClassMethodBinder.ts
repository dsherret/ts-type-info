import {TsFactory} from "./../../../factories";
import {ClassMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassMethodBinder} from "./../../base";
import {TsAbstractableBinder} from "./../base";
import {TsClassMethodParameterBinder} from "./TsClassMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassMethodBinder extends ClassMethodBinder {
    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(
            new TsBaseClassMethodBinder(
                factory,
                nodes,
                ClassMethodParameterDefinition,
                TsClassMethodParameterBinder
            ),
            new TsAbstractableBinder(nodes[nodes.length - 1])
        );
    }
}
