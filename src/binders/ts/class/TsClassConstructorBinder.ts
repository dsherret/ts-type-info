import {TsFactory} from "./../../../factories";
import {ClassConstructorParameterDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
import {ClassConstructorBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsParameteredBinderByNode, TsFunctionBodyWriteableBinder, TsNodedBinder, TsOverloadSignaturedBinder, TsDocumentationedBinder} from "./../base";
import {TsScopedBinder} from "./base";
import {TsClassConstructorParameterBinder} from "./TsClassConstructorParameterBinder";

export class TsClassConstructorBinder extends ClassConstructorBinder {
    constructor(factory: TsFactory, nodes: TsNode[]) {
        super(
            new TsBaseDefinitionBinder(),
            new TsParameteredBinderByNode(
                factory,
                nodes[nodes.length - 1],
                ClassConstructorParameterDefinition,
                TsClassConstructorParameterBinder
            ),
            new TsFunctionBodyWriteableBinder(),
            new TsScopedBinder(nodes[nodes.length - 1]),
            new TsNodedBinder(factory, nodes[nodes.length - 1]),
            new TsOverloadSignaturedBinder(factory, nodes),
            new TsDocumentationedBinder(nodes[nodes.length - 1])
        );
    }
}
