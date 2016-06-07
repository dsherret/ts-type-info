import {TypeExpressionDefinition} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {TypeExpressionedStructure} from "./../../../structures";
import {TypeExpressionedBinder} from "./../../base";
import {StructureTypeExpressionBinder} from "./../expression";

export class StructureTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private factory: StructureFactory, private structure: TypeExpressionedStructure) {
        super();
    }

    getTypeExpression() {
        const def = new TypeExpressionDefinition();
        const binder = new StructureTypeExpressionBinder(this.factory, this.structure.type || "any");
        binder.bind(def);
        return def;
    }
}
