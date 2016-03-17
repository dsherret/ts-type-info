import {MainFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassConstructorBinder} from "./../../base";
import {TsParameteredBinderByNode} from "./../base";
import {TsClassConstructorParameterBinder} from "./TsClassConstructorParameterBinder";

export class TsClassConstructorBinder extends ClassConstructorBinder {
    constructor(mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsParameteredBinderByNode(
                mainFactory,
                node,
                ClassConstructorParameterDefinition,
                TsClassConstructorParameterBinder
            )
        );
    }
}
