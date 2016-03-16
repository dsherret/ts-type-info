import {MainFactory} from "./../../../factories";
import {ClassDefinition, ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
    ClassConstructorDefinition} from "./../../../definitions";
import {TsNode} from "./../../../wrappers";
import {tryGet, Logger} from "./../../../utils";
import {ClassBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsAbstractableBinder, TsTypeParameteredBinderByNode, TsDecoratableBinder} from "./../base";
import {TsClassMethodBinder} from "./TsClassMethodBinder";
import {TsClassPropertyBinder} from "./TsClassPropertyBinder";
import {TsClassStaticMethodBinder} from "./TsClassStaticMethodBinder";
import {TsClassStaticPropertyBinder} from "./TsClassStaticPropertyBinder";
import {TsClassConstructorBinder} from "./TsClassConstructorBinder";

export type ClassMemberTypes = ClassMethodDefinition | ClassPropertyDefinition | ClassStaticMethodDefinition | ClassStaticPropertyDefinition | ClassConstructorDefinition;

export class TsClassBinder extends ClassBinder {
    constructor(private mainFactory: MainFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(mainFactory, node),
            new TsAbstractableBinder(node),
            new TsDecoratableBinder(node)
        );
    }

    getExtendsTypeExpressions() {
        return this.node.getSymbol().getExtendsTypeExpressions().map(typeExpression => this.mainFactory.getTypeExpression(typeExpression));
    }

    getImplementsTypeExpressions() {
        return this.node.getImplementsTypeExpressions().map(typeExpression => this.mainFactory.getTypeExpression(typeExpression));
    }

    getMembers() {
        return this.node.getChildren()
            .map(node => tryGet(node, () => this.getMemberDefinition(node)))
            .filter(n => n == null);
    }

    private getMemberDefinition(childNode: TsNode): ClassMemberTypes {
        if (childNode.isMethodDeclaration()) {
            if (childNode.hasStaticKeyword()) {
                const staticMethodDef = new ClassStaticMethodDefinition();
                const staticMethodBinder = new TsClassStaticMethodBinder(this.mainFactory, childNode);

                staticMethodBinder.bind(staticMethodDef);

                return staticMethodDef;
            }
            else {
                const methodDef = new ClassMethodDefinition();
                const methodBinder = new TsClassMethodBinder(this.mainFactory, childNode);

                methodBinder.bind(methodDef);

                return methodDef;
            }
        }
        else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor()) {
            if (childNode.hasStaticKeyword()) {
                const staticPropertyDef = new ClassStaticPropertyDefinition();
                const staticPropertyBinder = new TsClassStaticPropertyBinder(this.mainFactory, childNode);

                staticPropertyBinder.bind(staticPropertyDef);

                return staticPropertyDef;
            }
            else {
                const propertyDef = new ClassPropertyDefinition();
                const propertyBinder = new TsClassPropertyBinder(this.mainFactory, childNode);

                propertyBinder.bind(propertyDef);

                return propertyDef;
            }
        }
        else if (childNode.isConstructor()) {
            const constructorDef = new ClassConstructorDefinition();
            const constructorBinder = new TsClassConstructorBinder(this.mainFactory, childNode);

            constructorBinder.bind(constructorDef);

            return constructorDef;
        }
        else if (childNode.isSetAccessor()) {
            // ignore, GetAccessor is the one that will be handled
        }
        else if (childNode.isIdentifier()) {
            // ignore, it's the class identifier
        }
        else if (childNode.isTypeParameter()) {
            // ignore, handled elsewhere
        }
        else if (childNode.isExportKeyword()) {
            // ignore, handled elsewhere
        }
        else if (childNode.isDefaultKeyword()) {
            // ignore, handled elsewhere
        }
        else {
            Logger.warn(`Unknown class child kind: ${childNode.nodeKindToString()}`);
        }
    }
}
