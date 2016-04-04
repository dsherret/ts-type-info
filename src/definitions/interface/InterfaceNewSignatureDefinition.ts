import {StructureFactory} from "./../../factories";
import {InterfaceNewSignatureParameterStructure} from "./../../structures";
import {applyMixins} from "./../../utils";
import {BaseDefinition, DefinitionType, ParameteredDefinition, ReturnTypedDefinition} from "./../base";
import {TypeExpressionDefinition} from "./../expressions";
import {InterfaceNewSignatureParameterDefinition} from "./InterfaceNewSignatureParameterDefinition";

export class InterfaceNewSignatureDefinition
        extends BaseDefinition
        implements ParameteredDefinition<InterfaceNewSignatureParameterDefinition, InterfaceNewSignatureParameterStructure>, ReturnTypedDefinition {
    constructor() {
        super(DefinitionType.InterfaceNewSignature);
    }

    addParameters(...parameters: InterfaceNewSignatureParameterStructure[]) {
        const factory = new StructureFactory();
        this.parameters.push(...parameters.map(p => factory.getInterfaceNewSignatureParameter(p)));
        return this;
    }

    // ParameteredDefinition
    parameters: InterfaceNewSignatureParameterDefinition[];
    // ReturnTyped
    returnTypeExpression: TypeExpressionDefinition;
}

applyMixins(InterfaceNewSignatureDefinition, BaseDefinition, [ParameteredDefinition, ReturnTypedDefinition]);
