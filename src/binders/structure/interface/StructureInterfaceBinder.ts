import {StructureFactory} from "./../../../factories";
import {InterfaceStructure} from "./../../../structures";
import {objectAssign} from "./../../../utils";
import {InterfaceBinder, InterfaceMemberContainer} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureTypeParameteredBinder,
    StructureNodedBinder} from "./../base";

export class StructureInterfaceBinder extends InterfaceBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: InterfaceStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(objectAssign(structure, { isAmbient: true })),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureNodedBinder()
        );
    }

    getExtendsTypes() {
        return (this.structure.extendsTypes || []).map(s => this.factory.getTypeFromText(s));
    }

    getMembers() {
        const container = new InterfaceMemberContainer();
        container.methods.push(...(this.structure.methods || []).map(m => this.factory.getInterfaceMethod(m)));
        container.properties.push(...(this.structure.properties || []).map(p => this.factory.getInterfaceProperty(p)));
        container.newSignatures.push(...(this.structure.newSignatures || []).map(s => this.factory.getCallSignature(s)));
        container.callSignatures.push(...(this.structure.callSignatures || []).map(s => this.factory.getCallSignature(s)));
        return container;
    }
}
