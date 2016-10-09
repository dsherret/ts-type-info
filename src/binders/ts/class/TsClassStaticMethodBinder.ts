import {TsFactory} from "./../../../factories";
import {ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassStaticMethodBinder} from "./../../base";
import {TsClassStaticMethodParameterBinder} from "./TsClassStaticMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassStaticMethodBinder extends ClassStaticMethodBinder {
    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(
            new TsBaseClassMethodBinder(
                factory,
                nodes,
                ClassStaticMethodParameterDefinition,
                TsClassStaticMethodParameterBinder
            )
        );
    }
}
