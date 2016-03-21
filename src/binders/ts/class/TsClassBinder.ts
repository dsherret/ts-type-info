import {TsFactory} from "./../../../factories";
import {ClassMethodDefinition, ClassPropertyDefinition, ClassStaticMethodDefinition, ClassStaticPropertyDefinition,
    ClassConstructorDefinition} from "./../../../definitions";
import {TsNode} from "./../../../compiler";
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
    constructor(private tsFactory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(tsFactory, node),
            new TsAbstractableBinder(node),
            new TsDecoratableBinder(node)
        );
    }

    getExtendsTypeExpressions() {
        // todo: not the most efficient thing to loop through all the children each time
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.tsFactory.getTypeExpressionFromNode(node));
    }

    getImplementsTypeExpressions() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasImplementsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.tsFactory.getTypeExpressionFromNode(node));
    }

    getMembers() {
        return this.node.getChildren()
            .map(node => tryGet(node, () => this.getMemberDefinition(node)))
            .filter(n => n != null);
    }

    private getMemberDefinition(childNode: TsNode): ClassMemberTypes {
        if (childNode.isMethodDeclaration()) {
            if (childNode.hasStaticKeyword()) {
                const staticMethodDef = new ClassStaticMethodDefinition();
                const staticMethodBinder = new TsClassStaticMethodBinder(this.tsFactory, childNode);

                staticMethodBinder.bind(staticMethodDef);

                return staticMethodDef;
            }
            else {
                const methodDef = new ClassMethodDefinition();
                const methodBinder = new TsClassMethodBinder(this.tsFactory, childNode);

                methodBinder.bind(methodDef);

                return methodDef;
            }
        }
        else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor()) {
            if (childNode.hasStaticKeyword()) {
                const staticPropertyDef = new ClassStaticPropertyDefinition();
                const staticPropertyBinder = new TsClassStaticPropertyBinder(this.tsFactory, childNode);

                staticPropertyBinder.bind(staticPropertyDef);

                return staticPropertyDef;
            }
            else {
                const propertyDef = new ClassPropertyDefinition();
                const propertyBinder = new TsClassPropertyBinder(this.tsFactory, childNode);

                propertyBinder.bind(propertyDef);

                return propertyDef;
            }
        }
        else if (childNode.isConstructor()) {
            const constructorDef = new ClassConstructorDefinition();
            const constructorBinder = new TsClassConstructorBinder(this.tsFactory, childNode);

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
        else if (childNode.isHeritageClause()) {
            // ignore, handled elsewhere
        }
        else {
            Logger.warn(`Unknown class child kind: ${childNode.nodeKindToString()}`);
        }
    }
}
