import {TypeExpressionedStructure} from "./../../../structures";
import {TypeExpression} from "./../../../definitions";
import {MainFactory} from "./../../../factories";
import {TypeExpressionedBinder} from "./../../base";
import {StructureExpressionBinder} from "./../expressions";

export class StructureTypeExpressionedBinder extends TypeExpressionedBinder {
    constructor(private structure: TypeExpressionedStructure) {
        super();
    }

    getTypeExpression() {
        const def = new TypeExpression();
        const binder = new StructureExpressionBinder(this.structure.type);
        binder.bind(def);
        return def;
    }
}
