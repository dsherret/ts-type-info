import {StructureClassPropertyBinder, StructureExpressionBinder} from "./../binders";
import {ClassPropertyDefinition, TypeExpressionDefinition} from "./../definitions";
import {ClassPropertyStructure} from "./../structures";

export class StructureFactory {
    getClassProperty(prop: ClassPropertyStructure) {
        const def = new ClassPropertyDefinition();
        const binder = new StructureClassPropertyBinder(prop);
        binder.bind(def);
        return def;
    }

    getTypeExpressionFromText(text: string) {
        const def = new TypeExpressionDefinition();
        const binder = new StructureExpressionBinder(text);
        binder.bind(def);
        return def;
    }
}
