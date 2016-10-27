import * as definitions from "./../../../definitions";
import {BaseDefinitionBinder, NamedBinder, ExportableBinder, AmbientableBinder, TypeParameteredBinder, NodedBinder, DocumentationedBinder} from "./../base";
import {IBaseBinder} from "./../IBaseBinder";

export class InterfaceMemberContainer {
    callSignatures: definitions.CallSignatureDefinition[] = [];
    indexSignatures: definitions.IndexSignatureDefinition[] = [];
    methods: definitions.InterfaceMethodDefinition[] = [];
    newSignatures: definitions.CallSignatureDefinition[] = [];
    properties: definitions.InterfacePropertyDefinition[] = [];
}

export abstract class InterfaceBinder implements IBaseBinder {
    constructor(
        private readonly baseDefinitionBinder: BaseDefinitionBinder,
        private readonly namedBinder: NamedBinder,
        private readonly exportableBinder: ExportableBinder,
        private readonly ambientableBinder: AmbientableBinder,
        private readonly typeParameteredBinder: TypeParameteredBinder,
        private readonly nodedBinder: NodedBinder,
        private readonly documentationedBinder: DocumentationedBinder
    ) {
    }

    abstract getMembers(): InterfaceMemberContainer;
    abstract getExtendsTypes(): definitions.TypeDefinition[];

    bind(def: definitions.InterfaceDefinition) {
        this.baseDefinitionBinder.bind(def);
        this.namedBinder.bind(def);
        this.exportableBinder.bind(def);
        this.ambientableBinder.bind(def);
        this.typeParameteredBinder.bind(def);
        this.documentationedBinder.bind(def);
        this.bindMembers(def);
        this.nodedBinder.bind(def);
        def.extendsTypes.push(...this.getExtendsTypes());
    }

    private bindMembers(def: definitions.InterfaceDefinition) {
        const memberContainer = this.getMembers();
        def.properties.push(...memberContainer.properties);
        def.methods.push(...memberContainer.methods);
        def.newSignatures.push(...memberContainer.newSignatures);
        def.callSignatures.push(...memberContainer.callSignatures);
        def.indexSignatures.push(...memberContainer.indexSignatures);
    }
}
