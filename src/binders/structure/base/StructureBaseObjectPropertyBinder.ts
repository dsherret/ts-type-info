import {StructureFactory} from "./../../../factories";
import {BaseObjectPropertyStructure} from "./../../../structures";
import {BaseObjectPropertyBinder} from "./../../base";
import {StructureBasePropertyBinder} from "./StructureBasePropertyBinder";
import {StructureDefaultExpressionedBinder} from "./StructureDefaultExpressionedBinder";

export class StructureBaseObjectPropertyBinder extends BaseObjectPropertyBinder {
    constructor(factory: StructureFactory, structure: BaseObjectPropertyStructure) {
        super(
            new StructureBasePropertyBinder(factory, structure),
            new StructureDefaultExpressionedBinder(structure)
        );
    }
}
