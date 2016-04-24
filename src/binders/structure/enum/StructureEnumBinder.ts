import {StructureFactory} from "./../../../factories";
import {EnumStructure} from "./../../../structures";
import {EnumBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder} from "./../base";

export class StructureEnumBinder extends EnumBinder {
    constructor(private factory: StructureFactory, private structure: EnumStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure)
        );
    }

    getMembers() {
        return (this.structure.members || []).map(member => this.factory.getEnumMember(member));
    }
}
