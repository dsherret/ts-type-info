import {EnumMemberStructure} from "./../../../structures";
import {EnumMemberBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureNodedBinder, StructureDocumentationedBinder} from "./../base";

export class StructureEnumMemberBinder extends EnumMemberBinder {
    constructor(private readonly structure: EnumMemberStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureNodedBinder(),
            new StructureDocumentationedBinder(structure)
        );
    }

    getValue() {
        return this.structure.value;
    }
}
