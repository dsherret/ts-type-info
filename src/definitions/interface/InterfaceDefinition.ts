import {MainFactory, StructureFactory} from "./../../factories";
import {CallSignatureStructure, IndexSignatureStructure, InterfaceMethodStructure, InterfacePropertyStructure, TypeParameterStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {NamedDefinition, ExportableDefinition, AmbientableDefinition, TypeParameteredDefinition, BaseDefinition, DefinitionType} from "./../base";
import {CallSignatureDefinition, IndexSignatureDefinition, TypeParameterDefinition} from "./../general";
import {TypeDefinition} from "./../expression";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";
import {InterfacePropertyDefinition} from "./InterfacePropertyDefinition";

export class InterfaceDefinition extends BaseDefinition
                                 implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition {
    methods: InterfaceMethodDefinition[] = [];
    callSignatures: CallSignatureDefinition[] = [];
    indexSignatures: IndexSignatureDefinition[] = [];
    newSignatures: CallSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
    extendsTypes: TypeDefinition[] = [];

    constructor() {
        super(DefinitionType.Interface);
    }

    addCallSignatures(...callSignatures: CallSignatureStructure[]) {
        const factory = new StructureFactory();
        this.callSignatures.push(...callSignatures.map(n => factory.getCallSignature(n)));
        return this;
    }

    addExtends(...texts: string[]) {
        const factory = new StructureFactory();
        this.extendsTypes.push(...texts.map(t => factory.getTypeFromText(t)));
        return this;
    }

    addIndexSignatures(...indexSignatures: IndexSignatureStructure[]) {
        const factory = new StructureFactory();
        this.indexSignatures.push(...indexSignatures.map(n => factory.getIndexSignature(n)));
        return this;
    }

    addMethods(...methods: InterfaceMethodStructure[]) {
        const factory = new StructureFactory();
        this.methods.push(...methods.map(m => factory.getInterfaceMethod(m)));
        return this;
    }

    addNewSignatures(...newSignatures: CallSignatureStructure[]) {
        const factory = new StructureFactory();
        this.newSignatures.push(...newSignatures.map(n => factory.getCallSignature(n)));
        return this;
    }

    addProperties(...properties: InterfacePropertyStructure[]) {
        const factory = new StructureFactory();
        this.properties.push(...properties.map(p => factory.getInterfaceProperty(p)));
        return this;
    }

    getCallSignature(searchFunction: (callSignature: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.callSignatures, searchFunction);
    }

    getIndexSignature(searchFunction: (indexSignature: IndexSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.indexSignatures, searchFunction);
    }

    getMethod(nameOrSearchFunction: string | ((method: InterfaceMethodDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.methods, nameOrSearchFunction);
    }

    getNewSignature(searchFunction: (newSignature: CallSignatureDefinition) => boolean) {
        return DefinitionUtils.getDefinitionFromListByFunc(this.newSignatures, searchFunction);
    }

    getProperty(nameOrSearchFunction: string | ((property: InterfacePropertyDefinition) => boolean)) {
        return DefinitionUtils.getDefinitionFromListByNameOrFunc(this.properties, nameOrSearchFunction);
    }

    write(writeOptions?: WriteOptions) {
        const writer = MainFactory.createWriter(writeOptions);
        const interfaceWriter = new InterfaceWriter(writer);
        interfaceWriter.write(this, WriteFlags.Default);
        return writer.toString();
    }

    // NamedDefinition
    name: string;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameters: (...typeParameters: TypeParameterStructure[]) => this;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => TypeParameterDefinition;
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
}

applyMixins(InterfaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition]);
