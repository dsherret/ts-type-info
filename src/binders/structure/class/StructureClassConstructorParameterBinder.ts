import {ClassConstructorParameterScope} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ClassConstructorParameterStructure} from "./../../../structures";
import {ClassConstructorParameterBinder} from "./../../base";
import {StructureBaseParameterBinder, StructureDecoratableBinder, StructureReadonlyableBinder, StructureNodedBinder} from "./../base";

export class StructureClassConstructorParameterBinder extends ClassConstructorParameterBinder {
    constructor(factory: StructureFactory, private readonly structure: ClassConstructorParameterStructure) {
        super(
            new StructureBaseParameterBinder(factory, structure),
            new StructureDecoratableBinder(factory, structure),
            new StructureReadonlyableBinder(structure),
            new StructureNodedBinder()
        );
    }

    getClassConstructorParameterScope() {
        return this.structure.scope || ClassConstructorParameterScope.None;
    }
}
