import {StructureFactory} from "./../../../factories";
import {DecoratorStructure} from "./../../../structures";
import {DecoratorBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureNodedBinder} from "./../base";

export class StructureDecoratorBinder extends DecoratorBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: DecoratorStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureNodedBinder()
        );
    }

    getArguments() {
        return (this.structure.arguments || []).map(a => this.factory.getExpressionFromText(a)!).filter(a => a != null);
    }

    getIsDecoratorFactory() {
        return this.structure.isDecoratorFactory || false;
    }
}
