import {FunctionParameterStructure} from "./../../../structures";
import {FunctionParameterBinder} from "./../../base";
import {StructureBaseParameterBinder} from "./../base";

export class StructureFunctionParameterBinder extends FunctionParameterBinder {
    constructor(structure: FunctionParameterStructure) {
        super(new StructureBaseParameterBinder(structure));
    }
}
