import {StructureClassConstructorBinder, StructureClassPropertyBinder, StructureExpressionBinder} from "./../binders";
import {ClassConstructorDefinition, ClassPropertyDefinition, TypeExpressionDefinition} from "./../definitions";
import {ClassConstructorStructure, ClassPropertyStructure} from "./../structures";

export class StructureFactory {
    getClassConstructor(structure: ClassConstructorStructure) {
        const def = new ClassConstructorDefinition();
        const binder = new StructureClassConstructorBinder(this, structure);
        binder.bind(def);
        return def;
    }

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
