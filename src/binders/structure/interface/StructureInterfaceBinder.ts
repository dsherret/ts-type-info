import {StructureFactory} from "./../../../factories";
import {InterfaceStructure} from "./../../../structures";
import {objectAssign} from "./../../../utils";
import {InterfaceBinder, InterfaceMemberContainer} from "./../../base";
import {StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureTypeParameteredBinder} from "./../base";

export class StructureInterfaceBinder extends InterfaceBinder {
    constructor(private factory: StructureFactory, private structure: InterfaceStructure) {
        super(
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(objectAssign(structure, { isAmbient: true })),
            new StructureTypeParameteredBinder(factory, structure)
        );
    }

    getExtendsTypeExpressions() {
        return (this.structure.extendsTypes || []).map(s => this.factory.getTypeExpressionFromText(s));
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
