import {ClassConstructorParameterScope} from "./../../../definitions";
import {ClassConstructorParameterStructure} from "./../../../structures";
import {ClassConstructorParameterBinder} from "./../../base";
import {StructureBaseParameterBinder, StructureDecoratableBinder} from "./../base";

export class StructureClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(private structure: ClassConstructorParameterStructure) {
        super(
            new StructureBaseParameterBinder(structure),
            new StructureDecoratableBinder(structure)
        );
    }

    getClassConstructorParameterScope() {
        return this.structure.scope || ClassConstructorParameterScope.None;
    }
}
