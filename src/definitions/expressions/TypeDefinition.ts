import {ModuleMemberDefinitions} from "./../../definitions";
import {CallSignatureDefinition} from "./../function";
import {TypePropertyDefinition} from "./../general";
import {TsType} from "./../../compiler";
import {TsFactory} from "./../../factories";
import {TsCallSignatureBinder, TsTypePropertyBinder} from "./../../binders";

export class TypeDefinition {
    callSignatures: CallSignatureDefinition[] = [];
    definitions: ModuleMemberDefinitions[] = [];
    properties: TypePropertyDefinition[] = [];
    typeArguments: TypeDefinition[] = [];
    text: string;

    // todo: should be refactored out into a binder
    fillTypeInformation(tsFactory: TsFactory, type: TsType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures.push(...type.getCallSignatures().map(callSignature => {
                const def = new CallSignatureDefinition();
                const binder = new TsCallSignatureBinder(tsFactory, callSignature);

                binder.bind(def);
                return def;
            }));
            this.properties.push(...type.getProperties().map(prop => {
                const node = prop.getOnlyNode();
                const def = new TypePropertyDefinition();
                const binder = new TsTypePropertyBinder(tsFactory, node);

                binder.bind(def);
                def.parent = this;

                return def;
            }));
        }

        this.typeArguments.push(...type.getTypeArguments().map(arg => tsFactory.getType(arg)));
    }

    addDefinitions(definitions: ModuleMemberDefinitions[]) {
        this.definitions.push(...definitions);
    }
}
