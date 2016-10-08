import {StructureFactory} from "./../../../factories";
import {FunctionParameterStructure} from "./../../../structures";
import {FunctionParameterBinder} from "./../../base";
import {StructureBaseParameterBinder, StructureNodedBinder} from "./../base";

export class StructureFunctionParameterBinder extends FunctionParameterBinder {
    constructor(factory: StructureFactory, structure: FunctionParameterStructure) {
        super(
            new StructureBaseParameterBinder(factory, structure),
            new StructureNodedBinder()
        );
    }
}
