import {MainFactory} from "./../../../factories";
import {ClassStaticMethodParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler"
import {ClassStaticMethodBinder} from "./../../base";
import {TsClassStaticMethodParameterBinder} from "./TsClassStaticMethodParameterBinder";
import {TsBaseClassMethodBinder} from "./base";

export class TsClassStaticMethodBinder extends ClassStaticMethodBinder {
    constructor(mainFactory: MainFactory, node: TsNode) {
        super(
            new TsBaseClassMethodBinder(
                mainFactory,
                node,
                ClassStaticMethodParameterDefinition,
                TsClassStaticMethodParameterBinder
            )
        );
    }
}
