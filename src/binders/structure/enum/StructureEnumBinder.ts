import {StructureFactory} from "./../../../factories";
import {EnumStructure} from "./../../../structures";
import {EnumBinder} from "./../../base";
import {StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder} from "./../base";

export class StructureEnumBinder extends EnumBinder {
    constructor(private factory: StructureFactory, private structure: EnumStructure) {
        super(new StructureNamedBinder(structure), new StructureExportableBinder(structure), new StructureAmbientableBinder(structure));
    }

    getMembers() {
        return (this.structure.members || []).map(member => this.factory.getEnumMember(member));
    }
}
