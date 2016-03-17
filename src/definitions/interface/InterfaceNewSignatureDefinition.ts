﻿import {applyMixins, ArrayExt} from "./../../utils";
import {ParentedDefinition, BaseDefinition, DefinitionType, ParameteredDefinition, ReturnTypedDefinition} from "./../base";
import {TypeExpression} from "./../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./InterfaceNewSignatureParameterDefinition";
import {InterfaceDefinition} from "./InterfaceDefinition";

export class InterfaceNewSignatureDefinition
        extends BaseDefinition
        implements ParameteredDefinition<InterfaceNewSignatureParameterDefinition>, ReturnTypedDefinition,
                   ParentedDefinition<InterfaceDefinition> {
    constructor() {
        super(DefinitionType.InterfaceNewSignature);
    }

    // ParentedDefinition
    parent: InterfaceDefinition;
    // ParameteredDefinition
    parameters: ArrayExt<InterfaceNewSignatureParameterDefinition>;
    // ReturnTyped
    returnTypeExpression: TypeExpression;
}

applyMixins(InterfaceNewSignatureDefinition, BaseDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
