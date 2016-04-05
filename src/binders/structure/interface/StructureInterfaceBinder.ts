import {StructureFactory} from "./../../../factories";
import {InterfaceStructure} from "./../../../structures";
import {objectAssign} from "./../../../utils";
import {InterfaceBinder} from "./../../base";
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
        const methods = (this.structure.methods || []).map(m => this.factory.getInterfaceMethod(m));
        const properties = (this.structure.properties || []).map(p => this.factory.getInterfaceProperty(p));
        const newSignatures = (this.structure.newSignatures || []).map(s => this.factory.getInterfaceNewSignature(s));

        return [...methods, ...properties, ...newSignatures];
    }
}
