import {ExpressionDefinition} from "./../../../definitions";
import {DecoratorStructure} from "./../../../structures";
import {DecoratorBinder} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder} from "./../base";
import {StructureExpressionBinder} from "./../expressions";

export class StructureDecoratorBinder extends DecoratorBinder {
    constructor(private structure: DecoratorStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure)
        );
    }

    getArguments() {
        return (this.structure.arguments || []).map(a => {
            const expression = new ExpressionDefinition();
            const binder = new StructureExpressionBinder(a);

            binder.bind(expression);

            return expression;
        });
    }
}
