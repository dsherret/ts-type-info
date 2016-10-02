﻿import {StructureFactory} from "./../../../factories";
import {ClassStructure} from "./../../../structures";
import {ClassBinder, ClassMemberContainer} from "./../../base";
import {StructureBaseDefinitionBinder, StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureAbstractableBinder,
    StructureTypeParameteredBinder, StructureDecoratableBinder, StructureNodedBinder} from "./../base";

export class StructureClassBinder extends ClassBinder {
    constructor(private readonly factory: StructureFactory, private readonly structure: ClassStructure) {
        super(
            new StructureBaseDefinitionBinder(structure),
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureAbstractableBinder(structure),
            new StructureDecoratableBinder(factory, structure),
            new StructureNodedBinder()
        );
    }

    getExtendsTypes() {
        return (this.structure.extendsTypes || []).map(t => this.factory.getTypeFromText(t));
    }

    getImplementsTypes() {
        return (this.structure.implementsTypes || []).map(t => this.factory.getTypeFromText(t));
    }

    getMembers() {
        const container = new ClassMemberContainer();
        container.methods.push(...(this.structure.methods || []).map(m => this.factory.getClassMethod(m)));
        container.staticMethods.push(...(this.structure.staticMethods || []).map(m => this.factory.getClassStaticMethod(m)));
        container.properties.push(...(this.structure.properties || []).map(p => this.factory.getClassProperty(p)));
        container.staticProperties.push(...(this.structure.staticProperties || []).map(p => this.factory.getClassStaticProperty(p)));
        if (this.structure.constructorDef != null) {
            container.constructorDef = this.factory.getClassConstructor(this.structure.constructorDef);
        }
        return container;
    }
}
