import {ModuleMemberDefinitions} from "./../../definitions";
import {CallSignatureDefinition, TypePropertyDefinition} from "./../general";

export class TypeDefinition {
    callSignatures: CallSignatureDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeDefinition[] = [];
    text: string;
}
