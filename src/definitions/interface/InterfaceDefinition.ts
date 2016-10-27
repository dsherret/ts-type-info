import * as typeConstants from "./../../typeConstants";
import {MainFactory, StructureFactory} from "./../../factories";
import {CallSignatureStructure, IndexSignatureStructure, InterfaceMethodStructure, InterfacePropertyStructure, TypeParameterStructure} from "./../../structures";
import {applyMixins, DefinitionUtils} from "./../../utils";
import {InterfaceWriter} from "./../../writers";
import {WriteFlags} from "./../../WriteFlags";
import {WriteOptions} from "./../../WriteOptions";
import {NamedDefinition, ExportableDefinition, AmbientableDefinition, OrderableDefinition, TypeParameteredDefinition, NodedDefinition, BaseDefinition,
    DocumentationedDefinition} from "./../base";
import {CallSignatureDefinition, IndexSignatureDefinition, TypeParameterDefinition} from "./../general";
import {ClassDefinition} from "./../class";
import {TypeDefinition} from "./../expression";
import {InterfaceMethodDefinition} from "./InterfaceMethodDefinition";
import {InterfacePropertyDefinition} from "./InterfacePropertyDefinition";

export class InterfaceDefinition extends BaseDefinition
        implements NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition, DocumentationedDefinition {
    methods: InterfaceMethodDefinition[] = [];
    callSignatures: CallSignatureDefinition[] = [];
    indexSignatures: IndexSignatureDefinition[] = [];
    newSignatures: CallSignatureDefinition[] = [];
    properties: InterfacePropertyDefinition[] = [];
    extendsTypes: TypeDefinition[] = [];

    addCallSignature(structure: CallSignatureStructure) {
        const def = new StructureFactory().getCallSignature(structure);
        this.callSignatures.push(def);
        return def;
    }

    addExtends(definition: ClassDefinition | InterfaceDefinition, typeArguments?: string[]): TypeDefinition;
    addExtends(text: string): TypeDefinition;
    addExtends(textOrDefinition: string | ClassDefinition | InterfaceDefinition, typeArguments: string[] = []) {
        const def = DefinitionUtils.getTypeDefinitionFromTextOrDefinition(textOrDefinition, typeArguments);
        this.extendsTypes.push(def);
        return def;
    }

    addIndexSignature(structure: IndexSignatureStructure) {
        const def = new StructureFactory().getIndexSignature(structure);
        this.indexSignatures.push(def);
        return def;
    }

    addMethod(structure: InterfaceMethodStructure) {
        const def = new StructureFactory().getInterfaceMethod(structure);
        this.methods.push(def);
        return def;
    }

    addNewSignature(structure: CallSignatureStructure) {
        const def = new StructureFactory().getCallSignature(structure);
        this.newSignatures.push(def);
        return def;
    }

    addProperty(structure: InterfacePropertyStructure) {
        const def = new StructureFactory().getInterfaceProperty(structure);
        this.properties.push(def);
        return def;
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
    // AmbientableDefinition
    isAmbient: boolean;
    hasDeclareKeyword: boolean;
    // ExportableDefinition
    isExported: boolean;
    isNamedExportOfFile: boolean;
    isDefaultExportOfFile: boolean;
    // OrderableDefinition
    order: number;
    // TypeParameteredDefinition
    typeParameters: TypeParameterDefinition[];
    addTypeParameter: (structure: TypeParameterStructure) => TypeParameterDefinition;
    getTypeParameter: (nameOrSearchFunction: string | ((typeParameter: TypeParameterDefinition) => boolean)) => (TypeParameterDefinition | null);
    // NodedDefinition
    tsNode?: typeConstants.TypeScriptNode;
    // DocumentationedDefinition
    documentationComment: string;
}

applyMixins(InterfaceDefinition, BaseDefinition, [NamedDefinition, ExportableDefinition, TypeParameteredDefinition, AmbientableDefinition, OrderableDefinition, NodedDefinition,
    DocumentationedDefinition]);
