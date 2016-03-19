import {TsFactory} from "./../../../factories";
import {ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassStaticMethodBinder} from "./../../base";
import {TsClassStaticMethodParameterBinder} from "./TsClassStaticMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassStaticMethodBinder extends ClassStaticMethodBinder {
    constructor(tsFactory: TsFactory, node: TsNode) {
        super(
            new TsBaseClassMethodBinder(
                tsFactory,
                node,
                ClassStaticMethodParameterDefinition,
                TsClassStaticMethodParameterBinder
            )
        );
    }
}
