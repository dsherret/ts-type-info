import {EnumMemberStructure} from "./../../../structures";
import {EnumMemberBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder} from "./../base";

export class StructureEnumMemberBinder extends EnumMemberBinder {
    constructor(private readonly structure: EnumMemberStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure)
        );
    }

    getValue() {
        return this.structure.value;
    }
}
