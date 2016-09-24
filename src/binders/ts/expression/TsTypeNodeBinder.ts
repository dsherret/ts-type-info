import {TsTypeNode} from "./../../../compiler";
import {TypeFunctionParameterDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TypeNodeBinder} from "./../../base";
import {TsParameteredBinderByTypeNode, TsTypeParameteredBinderByTypeNode} from "./../base";
import {TsTypeFunctionParameterBinder} from "./TsTypeFunctionParameterBinder";
import {TsBaseTypeBinderByTypeNode} from "./base";

export class TsTypeNodeBinder extends TypeNodeBinder {
    constructor(private readonly factory: TsFactory, private readonly tsTypeNode: TsTypeNode) {
        super(
            new TsBaseTypeBinderByTypeNode(factory, tsTypeNode),
            new TsParameteredBinderByTypeNode(factory, tsTypeNode, TypeFunctionParameterDefinition, TsTypeFunctionParameterBinder),
            new TsTypeParameteredBinderByTypeNode(factory, tsTypeNode)
        );
    }
}
