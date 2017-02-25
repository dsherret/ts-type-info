import {TsFactory} from "./../../../factories";
import {ClassMethodParameterDefinition, ClassMethodDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassMethodBinder} from "./../../base";
import {TsAbstractableBinder} from "./../base";
import {overloadsToImplementationSignature} from "./../helpers";
import {TsClassMethodParameterBinder} from "./TsClassMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassMethodBinder extends ClassMethodBinder {
    constructor(factory: TsFactory, private nodes: TsNode[]) {
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

    bind(def: ClassMethodDefinition) {
        super.bind(def);

        const isAmbient = this.nodes.length > 0 && this.nodes[0].isAmbient();

        if (isAmbient)
            overloadsToImplementationSignature(def);
    }
}
