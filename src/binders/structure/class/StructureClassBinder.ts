import {ClassMemberDefinitions} from "./../../../definitions";
import {StructureFactory} from "./../../../factories";
import {ClassStructure} from "./../../../structures";
import {ClassBinder} from "./../../base";
import {StructureNamedBinder, StructureExportableBinder, StructureAmbientableBinder, StructureAbstractableBinder, StructureTypeParameteredBinder,
    StructureDecoratableBinder} from "./../base";

export class StructureClassBinder extends ClassBinder {
    constructor(private factory: StructureFactory, private structure: ClassStructure) {
        super(
            new StructureNamedBinder(structure),
            new StructureExportableBinder(structure),
            new StructureAmbientableBinder(structure),
            new StructureTypeParameteredBinder(factory, structure),
            new StructureAbstractableBinder(structure),
            new StructureDecoratableBinder(structure)
        );
    }

    getExtendsTypeExpressions() {
        return (this.structure.extendsTypes || []).map(t => this.factory.getTypeExpressionFromText(t));
    }

    getImplementsTypeExpressions() {
        return (this.structure.implementsTypes || []).map(t => this.factory.getTypeExpressionFromText(t));
    }

    getMembers() {
        const methods = (this.structure.methods || []).map(m => this.factory.getClassMethod(m));
        const staticMethods = (this.structure.staticMethods || []).map(m => this.factory.getClassStaticMethod(m));
        const properties = (this.structure.properties || []).map(p => this.factory.getClassProperty(p));
        const staticProperties = (this.structure.staticProperties || []).map(p => this.factory.getClassStaticProperty(p));
        const members: ClassMemberDefinitions[] = [...methods, ...staticMethods, ...properties, ...staticProperties];

        if (this.structure.constructorDef != null) {
            members.push(this.factory.getClassConstructor(this.structure.constructorDef));
        }

        return members;
    }
}
