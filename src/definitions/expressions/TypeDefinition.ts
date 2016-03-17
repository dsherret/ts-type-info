import {ModuleMemberDefinitions} from "./../../definitions";
import {CallSignatureDefinition} from "./../function";
import {TypePropertyDefinition} from "./../general";
import {TsType} from "./../../wrappers";
import {ArrayExt} from "./../../utils";
import {MainFactory} from "./../../factories";
import {TsCallSignatureBinder, TsTypePropertyBinder} from "./../../binders";

export class TypeDefinition {
    callSignatures = new ArrayExt<CallSignatureDefinition>();
    definitions = new ArrayExt<ModuleMemberDefinitions>();
    properties = new ArrayExt<TypePropertyDefinition>();
    typeArguments = new ArrayExt<TypeDefinition>();
    text: string;

    fillTypeInformation(mainFactory: MainFactory, type: TsType) {
        this.text = type.getText();

        if (type.hasCallSignaturesAndProperties()) {
            this.callSignatures.push(...type.getCallSignatures().map(callSignature => {
                const def = new CallSignatureDefinition();
                const binder = new TsCallSignatureBinder(mainFactory, callSignature);

                binder.bind(def);
                return def;
            }));
            this.properties.push(...type.getProperties().map(prop => {
                const node = prop.getOnlyNode();
                const def = new TypePropertyDefinition();
                const binder = new TsTypePropertyBinder(mainFactory, node);

                binder.bind(def);
                def.parent = this;

                return def;
            }));
        }

        this.typeArguments.push(...type.getTypeArguments().map(arg => mainFactory.getType(arg)));
    }

    addDefinitions(definitions: ModuleMemberDefinitions[]) {
        this.definitions.push(...definitions);
    }
}
