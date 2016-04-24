import {TsFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassConstructorBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsParameteredBinderByNode, TsFunctionBodyWriteableBinder} from "./../base";
import {TsClassConstructorParameterBinder} from "./TsClassConstructorParameterBinder";

export class TsClassConstructorBinder extends ClassConstructorBinder {
    constructor(factory: TsFactory, private node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsParameteredBinderByNode(
                factory,
                node,
                ClassConstructorParameterDefinition,
                TsClassConstructorParameterBinder
            ),
            new TsFunctionBodyWriteableBinder()
        );
    }
}
