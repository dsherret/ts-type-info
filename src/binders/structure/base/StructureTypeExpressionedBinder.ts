import {TypeExpressionedStructure} from "./../../../structures";
import {TypeExpressionDefinition} from "./../../../definitions";
import {TypeExpressionedBinder} from "./../../base";
import {StructureExpressionBinder} from "./../expression";

export class StructureTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private structure: TypeExpressionedStructure) {
        super();
    }

    getTypeExpression() {
        const def = new TypeExpressionDefinition();
        const binder = new StructureExpressionBinder(this.structure.type || "any");
        binder.bind(def);
        return def;
    }
}
