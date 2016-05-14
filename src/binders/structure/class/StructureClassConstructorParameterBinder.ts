import {ClassConstructorParameterScope} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ClassConstructorParameterStructure} from "./../../../structures";
import {ClassConstructorParameterBinder} from "./../../base";
import {StructureBaseParameterBinder, StructureDecoratableBinder} from "./../base";

export class StructureClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(factory: StructureFactory, private structure: ClassConstructorParameterStructure) {
        super(
            new StructureBaseParameterBinder(structure),
            new StructureDecoratableBinder(factory, structure)
        );
    }

    getClassConstructorParameterScope() {
        return this.structure.scope || ClassConstructorParameterScope.None;
    }
}
