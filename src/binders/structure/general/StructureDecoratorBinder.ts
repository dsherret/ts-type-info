import {StructureFactory} from "./../../../factories";
import {DecoratorStructure} from "./../../../structures";
import {DecoratorBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder} from "./../base";

export class StructureDecoratorBinder extends DecoratorBinder {
    constructor(private factory: StructureFactory, private structure: DecoratorStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure)
        );
    }

    getArguments() {
        return (this.structure.arguments || []).map(a => this.factory.getExpressionFromText(a)!).filter(a => a != null);
    }
}
