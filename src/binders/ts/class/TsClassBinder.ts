import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {tryGet, Logger} from "./../../../utils";
import {ClassBinder, ClassMemberContainer} from "./../../base";
import {TsBaseDefinitionBinder, TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsAbstractableBinder, TsTypeParameteredBinderByNode,
    TsDecoratableBinder} from "./../base";

export class TsClassBinder extends ClassBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsTypeParameteredBinderByNode(factory, node),
            new TsAbstractableBinder(node),
            new TsDecoratableBinder(factory, node)
        );
    }

    getExtendsTypes() {
        // todo: not the most efficient thing to loop through all the children each time
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasExtendsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getType(node.getType()));
    }

    getImplementsTypes() {
        return this.node.getChildren()
            .filter(node => node.isHeritageClause() && node.hasImplementsKeyword())
            .map(node => node.getHeritageNodes())
            .reduce((a, b) => a.concat(b), [])
            .map(node => this.factory.getType(node.getType()));
    }

    getMembers() {
        const container = new ClassMemberContainer();
        // because there can be multiple method signatures, the last one needs to be used
        const methods: { [name: string]: TsNode; } = {};
        const staticMethods: { [name: string]: TsNode; } = {};
        // because there can be set or get accessor nodes
        const properties: { [name: string]: TsNode[]; } = {};

        this.node.getChildren().forEach(childNode => {
            tryGet(childNode, () => {
                if (childNode.isMethodDeclaration()) {
                    if (childNode.hasStaticKeyword()) {
                        staticMethods[childNode.getName()] = childNode;
                    }
                    else {
                        methods[childNode.getName()] = childNode;
                    }
                }
                else if (childNode.isPropertyDeclaration() || childNode.isGetAccessor() || childNode.isSetAccessor()) {
                    if (childNode.hasStaticKeyword()) {
                        container.staticProperties.push(this.factory.getClassStaticProperty(childNode));
                    }
                    else {
                        const name = childNode.getName();
                        properties[name] = properties[name] || [];
                        properties[name].push(childNode);
                    }
                }
                else if (childNode.isConstructor()) {
                    container.constructorDef = this.factory.getClassConstructor(childNode);
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
            });
        });

        Object.keys(methods).forEach(name => {
            const childNode = methods[name];
            tryGet(childNode, () => {
                container.methods.push(this.factory.getClassMethod(childNode));
            });
        });

        Object.keys(staticMethods).forEach(name => {
            const childNode = staticMethods[name];
            tryGet(childNode, () => {
                container.staticMethods.push(this.factory.getClassStaticMethod(childNode));
            });
        });

        Object.keys(properties).forEach(name => {
            const childNodes = properties[name];
            tryGet(name, () => {
                container.properties.push(this.factory.getClassProperty(childNodes));
            });
        });

        return container;
    }
}
