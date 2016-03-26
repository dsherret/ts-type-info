import {EnumMemberStructure} from "./../../../structures";
import {EnumMemberBinder} from "./../../base";
import {StructureNamedBinder} from "./../base";

export class StructureEnumMemberBinder extends EnumMemberBinder {
    constructor(private structure: EnumMemberStructure) {
        super(new StructureNamedBinder(structure));
    }

    getValue() {
        return this.structure.value;
    }
}
